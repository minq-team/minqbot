const config = require("./config")
const { messages } = require("./locales/" + (config.locale ? config.locale : "en"))

function message(message, values) {
	var message = messages[message]

	if(!message) return ""

	for (var i = 0; i < values.length; i++) {
		message = message.replace("%%", values[i])
	}

	return message
}

messages.message = message

module.exports = messages