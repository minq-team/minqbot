const { sleep } = require("../library")
const messages = require("../messages")

module.exports = function (db, send) {

	async function addTag(recommender, recommendee, tag) {
		const addTag = { recommender, recommendee, tag }

		const existing = await db.Tag.findOne(addTag)
		if(!existing) await db.Tag.create(addTag)
	}

	async function showContact(user, _message) {
		const show = _message.replace("show:", "")

		const tag = await db.Tag.findOne({ recommender: user.name, recommendee: show })
		const tags = await db.Tag.find({ recommendee: show })
		const tagsCloud = tags.map(tag => tag.tag).join(", ")

		if(tag) {
			send(user.id, messages.message(user.mode + "_message_show_your_contact", [show, tagsCloud]), messages.menu_keyboard)
		} else {
			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index
			}

			const recommended = await db.Tag.find({ recommender: user.name })
			const recommendersCloud = tags.filter(tag => tag.recommender !== user.name && recommended.map(r => r.recommendee).includes(tag.recommender)).map(tag => "@" + tag.recommender).filter(onlyUnique).join(", ")

			send(user.id, messages.message(user.mode + "_message_show_not_your_contact", [recommendersCloud, tagsCloud, recommendersCloud]))
			await sleep(1000)
			send(user.id, tagsCloud, messages.menu_keyboard)
		}
	}

	const menu = messages.menu_keyboard.flat()

	var flow = {}

	// 1. Recommend

	flow[menu[0]] = async function(user, _message) {
		user.step++
		await user.save()

		const info = JSON.parse(user.info)

		switch(user.step) {
			case 1:
				user.info = JSON.stringify({ name: _message })
				await user.save()
			break
			case 2:
				if(info && info.name) await addTag(user.name, info.name, _message)
			break
			case 3:
				if(info && info.name) {
					const options = messages[menu[0] + "_keyboard_2"].flat()

					if(_message === options[0]) // Yes
						user.step = 1

					if(_message === options[1]) // No
						user.clear()

					await user.save()

					if(user.mode === null) {
						const recommendeeExisting = await db.User.findOne({ name: info.name })

						if(recommendeeExisting) {
							send(recommendeeExisting.id, messages.message(menu[0] + "_recommendee", [user.name, user.name]))
							send(user.id, messages.message(menu[0] + "_recommender", [info.name, info.name]), messages.menu_keyboard)
						} else {
							send(user.id, messages.message(menu[0] + "_recommender_recommendee_not_existing", [info.name]), messages.menu_keyboard)
							await sleep(1000)
							send(user.id, messages.message(menu[0] + "_recommender_recommendee_not_existing_forward_message", [info.name, user.name]), messages.menu_keyboard)
						}
					}
				}
			break
		}
		
		const message = messages[menu[0] + "_message_" + user.step]
		const keyboard = messages[menu[0] + "_keyboard_" + user.step]

		if(message) send(user.id, message, keyboard ? keyboard : messages.back_keyboard)
	}

	// 2. Discover trusted people

	async function generateInlineButtonFor(recommendee) {
		const tags = await db.Tag.find({ recommendee })

		return [{ text: tags.map(tag => tag.tag).join(", "), callback_data: recommendee }]
	}
	
	flow[menu[1]] = async function(user, _message) {
		var list = []
		var filter = []

		const tags = await db.Tag.find({ recommender: user.name, recommendee: { $ne: user.name } })

		for (var i = 0; i < tags.length; i++) {
			const tag = tags[i]

			const recommendeeTags = await db.Tag.find({ recommender: tag.recommendee, recommendee: { $ne: user.name } })

			if(!filter.includes(tag.recommendee)) {
				list.push(await generateInlineButtonFor(tag.recommendee))
				filter.push(tag.recommendee)
			}

			for (var n = 0; n < recommendeeTags.length; n++) {
				const recommendeeTag = recommendeeTags[n]

				if(!filter.includes(recommendeeTag.recommendee)) {
					list.push(await generateInlineButtonFor(recommendeeTag.recommendee))
					filter.push(recommendeeTag.recommendee)
				}
			}
		}

		if(list.length) {
			send(user.id, messages[menu[1] + "_message"], list, true)
		} else {
			send(user.id, messages[menu[1] + "_message_empty"])
		}

		user.step++
		await user.save()
	}

	// 3. I'm looking for...
	
	// flow[menu[2]] = function(user, _message) {
	// 	console.log("!3")
	// }

	// 4. Explore opportunities
	
	// flow[menu[3]] = function(user, _message) {
	// 	console.log("!4")
	// }

	// 5. Add myself a skill
	
	flow[menu[2/*4*/]] = async function(user, _message) {
		await addTag(user.name, user.name, _message)

		user.clear()
		await user.save()

		send(user.id, messages.message(menu[2/*4*/] + "_tagged", [_message]), messages.menu_keyboard)
	}

	// 6. Find out @... by ID
	
	// flow[menu[5]] = function(user, _message) {
	// 	console.log("!6")
	// }

	const action = async function(_user, _message) {
		const user = await db.User.findOneAndUpdate({ id: _user.id }, { $set: { name: _user.name }})

		if(!user || !user.mode) return

		if(_message.startsWith("show:")) {
			showContact(user, _message)
		} else {
			if(menu.includes(user.mode)) {
				flow[user.mode](user, _message)
			}
		}
	}

	return action

}