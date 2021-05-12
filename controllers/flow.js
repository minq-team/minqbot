const { sleep } = require("../library")
const messages = require("../messages")

module.exports = function (db, send) {

	const menu = messages.menu_keyboard.flat()

	var flow = {}

	// 1. Recommend

	flow[menu[0]] = async function(user, _message) {
		user.step++
		await user.save()

		// fullfill

		send(user.id, messages[menu[0] + "_message_" + user.step], messages[menu[0] + "_keyboard_" + user.step])

		if(user.step === 3) {
			await sleep(1000)

			// check if registered

			send(user.id, messages.menu, messages.menu_keyboard)
		}
	}

	// 2. Discover trusted people
	
	flow[menu[1]] = function(user, _message) {
		console.log("!2")
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
		const tag = { recommender: user.id, recommendee: user.id, tag: _message }

		const existing = await db.Tag.findOne(tag)
		if(!existing) await db.Tag.create(tag)

		user.clear()
		await user.save()

		send(user.id, messages.menu, messages.menu_keyboard)
	}

	// 6. Find out @... by ID
	
	// flow[menu[5]] = function(user, _message) {
	// 	console.log("!6")
	// }

	const action = async function(_user, _message) {
		const user = await db.User.findOneAndUpdate({ id: _user.id }, { $set: { name: _user.name }})

		if(!user || !user.mode) return

		if(menu.includes(user.mode)) {
			flow[user.mode](user, _message)
		}
	}

	return action

}