const telegram = require("telegram-bot-api")
const config = require("./config")

var telegramCallback, telegramInlineCallback, telegramContactCallback

const telegramBot = new telegram({ token: config.telegramToken })
telegramBot.setMessageProvider(new telegram.GetUpdateMessageProvider())

telegramBot.on("update", message => {console.log(message)
	if(message.message) {
		const name = message.message.from ? message.message.username ? message.message.from.username.toLowerCase() : false : false

		if(message.message.text) telegramCallback({ id: message.message.from.id, name }, message.message.text)
		if(message.message.contact) telegramContactCallback({ id: message.message.from.id, name }, message.message.contact)
	}

	if(message.callback_query) {
		const name = message.callback_query.from ? message.callback_query.from.username ? message.callback_query.from.username.toLowerCase() : false : false

		telegramInlineCallback({ id: message.callback_query.from.id, name }, message.callback_query.data)
	}
})

telegramBot.start().then(() => {
	console.log("Telegram ✅")
})

module.exports = {

	send: function(id, message, keyboard, inline) {
		var message = { chat_id: id, text: message }

		if(keyboard) {
			message.reply_markup = inline ? { inline_keyboard: keyboard } : { keyboard }
		}

		telegramBot.sendMessage(message)
	},

	setCallback: function(callback) {
		telegramCallback = callback
	},

	setInlineCallback: function(callback) {
		telegramInlineCallback = callback
	},

	setContactCallback: function(callback) {
		telegramContactCallback = callback
	}

}