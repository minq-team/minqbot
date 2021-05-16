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

  schema.methods.identifier = function () {
    return this.name ? this.name : this.phone;
  };

  schema.methods.identifierRule = function () {
    if (this.name && this.phone)
      return { $or: [{ name: this.name }, { phone: this.phone }] };
    return this.name ? this.name : this.phone;
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
