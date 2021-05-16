const mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment"),
  fs = require("fs");

const config = require("../config");
// const { seed } = require("../seed")

module.exports = {
  get: function () {
    mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    autoIncrement.initialize(mongoose.connection);

    var models = {};

    const files = fs.readdirSync(__dirname);

    for (var i = 0; i < files.length; i++) {
      const file = files[i];

      if (file !== "index.js") {
        const model = require(__dirname + "/" + file)(
          mongoose,
          autoIncrement.plugin
        );

        models[model.name] = model.model;
      }
    }

    // if(process.argv.includes("--clear")) seed(mongoose)

    return models;
  },
};
