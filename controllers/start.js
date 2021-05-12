const { sleep } = require("../library")
const messages = require("../messages")

module.exports = function (db, send) {

	const menu = messages.menu_keyboard.flat()

	const action = async function(_user, _message) {
		var user = await db.User.findOneAndUpdate({ id: _user.id }, { $set: { name: _user.name }})

		if(!user) {
			user = await db.User.create(_user)

			send(user.id, messages.greeting)
			await sleep(1000)
		}

		switch(_message) {
			default:
				if(menu.includes(_message)) {
					if(_message !== menu[menu.height - 1]) user.set(_message)

					send(user.id, messages[_message + "_message"], _message === menu[menu.length - 1] ? messages.menu_keyboard : messages.back_keyboard)
				} else {
					user.clear()

					send(user.id, messages.menu, messages.menu_keyboard)
				}

				await user.save()
			break
		}
	}

	return action

}