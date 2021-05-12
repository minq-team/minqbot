const telegram = require("telegram-bot-api")
const config = require("./config")

var telegramCallback

const telegramBot = new telegram({ token: config.telegramToken })
telegramBot.setMessageProvider(new telegram.GetUpdateMessageProvider())

telegramBot.on("update", message => {
    const name = message ? message.message ? message.message.chat ? message.message.chat.username : false : false : false

    if(name) telegramCallback({ id: message.message.chat.id, name }, message.message.text)
})

telegramBot.start().then(() => {
	console.log("Telegram ✅")
})

module.exports = {

	send: function(id, message, keyboard) {
		var message = { chat_id: id, text: message }

		if(keyboard) message.reply_markup = { keyboard }

		telegramBot.sendMessage(message)
	},

	setCallback: function(callback) {
		telegramCallback = callback
	}

}