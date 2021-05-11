const Telegram = require("./telegram")

Telegram.setCallback((user, message) => {
	console.log(user, message)
})