const name = "User";

module.exports = function (mongoose) {
  const schema = new mongoose.Schema({
    id: Number,
    name: String,
    phone: String,

    tags: String,

    mode: String,
    step: Number,
    info: String,

    createdAt: { type: Date, default: Date.now },
  });

  schema.methods.identifier = function (symbol) {
    symbol = symbol || false;
    return this.name
      ? (symbol ? "@" : "") + this.name
      : (symbol ? "+" : "") + this.phone;
  };

  schema.methods.set = function (mode) {
    this.mode = mode;
    this.step = 0;
  };

  schema.methods.clear = function () {
    this.mode = null;
    this.step = null;
    this.info = null;
  };

  return { name: name, model: mongoose.model(name, schema) };
};
