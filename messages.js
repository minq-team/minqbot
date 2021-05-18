const config = require("./config");
const { messages } = require("./locales/" +
  (config.locale ? config.locale : "en"));

function message(message, values) {
  var curMes = messages[message];

  if (!curMes) return "";

  for (var i = 0; i < values.length; i++) {
    curMes = curMes.replace("%%", values[i]);
  }

  return curMes;
}

messages.message = message;

module.exports = messages;
