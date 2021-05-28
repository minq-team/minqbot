const nconf = require("nconf");

const isProd = process.env.NODE_ENV === "production";

nconf
  .env({
    separator: "__",
    whitelist: ["DB", "DOCUMENT_DB", "LOCALE", "TELEGRAM_TOKEN"],
  })
  .defaults({
    DB: "mongodb://127.0.0.1:27017/minq",
    DOCUMENT_DB: "false",
    LOCALE: "ru",
    TELEGRAM_TOKEN: "xxxxxx:xxxxxx",
  });

const conf = nconf.get();

if (isProd) {
  const secrets = require("@cloudreach/docker-secrets");
  conf.DB = secrets.DB || conf.DB;
  conf.TELEGRAM_TOKEN = secrets.TELEGRAM_TOKEN || conf.TELEGRAM_TOKEN;
}

conf.IS_PROD = isProd;
conf.DOCUMENT_DB = conf.DOCUMENT_DB === "true";

console.log("Current configuration: ", JSON.stringify(conf));

module.exports = conf;
