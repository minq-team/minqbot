const telegram = require("telegram-bot-api")
const config = require("./config")

var telegramCallback

const telegramBot = new telegram({ token: config.telegramToken })
telegramBot.setMessageProvider(new telegram.GetUpdateMessageProvider())

telegramBot.on("update", message => {
    const username = message ? message.message ? message.message.chat ? message.message.chat.username : false : false : false

    if(username) telegramCallback({ id: message.message.chat.id, username }, message.message.text)
})

telegramBot.start().then(() => {
	console.log("Telegram ✅")
})

module.exports = {

	send: function(message) {
		telegramBot.sendMessage({
			chat_id: config.telegramUserId,
			text: message
		})
	},

	setCallback: function(callback) {
		telegramCallback = callback
	}

}