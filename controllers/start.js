const { sleep } = require("../library")
const messages = require("../messages")

module.exports = function (db, send) {

	const menu = messages.menu_keyboard.flat()

	const action = async function(_user, _message) {
		var set = null

		if(_user.name) set = { name: _user.name }
		else delete _user.name

		if(_message && _message.phone_number) set = { phone: _message.phone_number }

		var user = await db.User.findOneAndUpdate({ id: _user.id }, { $set: set })

		if(!user) {
			if(!set) {
				send(_user.id, messages.phone_required, messages.phone_required_keyboard)

				return
			}

			const tags = await db.Tag.find({ recommendee: set.name ? set.name : set.phone })

			user = await db.User.create(_message && _message.phone_number ? { ..._user, phone: _message.phone_number, tags: tags.map(tag => tag.tag).filter(unique).join(", ") } : _user)

			send(user.id, messages.greeting, messages.menu_keyboard)
			await sleep(1000)
		}

		if(menu.includes(_message)) {
			if(_message !== menu[menu.height - 1]) {
				user.set(_message)
				await user.save()
			}

			if(messages[_message + "_message_generative"]) {
				require("./flow")(db, send)(_user, "")
			} else {
				send(user.id, messages[_message + "_message"], _message === menu[menu.length - 1] ? messages.menu_keyboard : messages.back_keyboard)
			}
		} else {
			user.clear()
			await user.save()

			send(user.id, messages.menu, messages.menu_keyboard)
		}
	}

	return action

}