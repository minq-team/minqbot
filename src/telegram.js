const telegram = require("telegram-bot-api");
const config = require("./config");

var telegramCallback, telegramInlineCallback, telegramContactCallback;

const telegramBot = new telegram({ token: config.TELEGRAM_TOKEN });
telegramBot.setMessageProvider(new telegram.GetUpdateMessageProvider());

telegramBot.on("update", (message) => {
  if (message.message) {
    const name = message.message.from
      ? message.message.from.username
        ? message.message.from.username.toLowerCase()
        : false
      : false;

    if (message.message.text)
      telegramCallback(
        { id: message.message.from.id, name },
        message.message.text
      );
    if (message.message.contact)
      telegramContactCallback(
        { id: message.message.from.id, name },
        message.message.contact
      );
  }

  if (message.callback_query) {
    const name = message.callback_query.from
      ? message.callback_query.from.username
        ? message.callback_query.from.username.toLowerCase()
        : false
      : false;

    telegramInlineCallback(
      { id: message.callback_query.from.id, name },
      message.callback_query.data
    );
  }
});

telegramBot.start().then(() => {
  console.log("Telegram ✅");
});

module.exports = {
  send: function (id, message, keyboard, inline) {
    var curMes = { chat_id: id, text: message };

    if (keyboard) {
      curMes.reply_markup = inline
        ? { inline_keyboard: keyboard }
        : { keyboard };
    }

    telegramBot.sendMessage(curMes);
  },

  setCallback: function (callback) {
    telegramCallback = callback;
  },

  setInlineCallback: function (callback) {
    telegramInlineCallback = callback;
  },

  setContactCallback: function (callback) {
    telegramContactCallback = callback;
  },
};
