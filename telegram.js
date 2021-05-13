const telegram = require("telegram-bot-api")
const config = require("./config")

var telegramCallback, telegramInlineCallback

const telegramBot = new telegram({ token: config.telegramToken })
telegramBot.setMessageProvider(new telegram.GetUpdateMessageProvider())

telegramBot.on("update", message => {
    const name = message ? message.message ? message.message.from ? message.message.from.username.toLowerCase() : false : false : false

    if(name) telegramCallback({ id: message.message.chat.id, name }, message.message.text)
	else {
		const nameCallback = message ? message.callback_query ? message.callback_query.from ? message.callback_query.from.username.toLowerCase() : false : false : false

	    if(nameCallback) telegramInlineCallback({ id: message.callback_query.from.id, name: nameCallback }, message.callback_query.data)
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
	}

}