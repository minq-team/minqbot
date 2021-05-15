const Telegram = require("./telegram")
const Minq = require("./controllers")(require("./models").get(), Telegram.send)

const {
	menu_keyboard,
	back_keyboard
} = require("./messages")

Telegram.setCallback((user, message) => {
	switch(message) {
		case "/start":
			Minq.start(user)
		break
		default:
			if(menu_keyboard.flat().includes(message) || back_keyboard.flat().includes(message)) Minq.start(user, message)
			else Minq.flow(user, message)
		break
	}
})

Telegram.setInlineCallback((user, data) => {
	Minq.flow(user, "show:" + data)
})

Telegram.setContactCallback((user, contact) => {
	if(user.id === contact.user_id) Minq.start(user, contact)
	else Minq.flow(user, "contact:", contact)
})