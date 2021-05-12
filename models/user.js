const name = "User"

module.exports = function(mongoose) {
	const schema = new mongoose.Schema({

		id: Number,
		name: String,

		mode: String,
		step: Number,

		createdAt: { type: Date, default: Date.now }

	})

	schema.methods.set = function(mode, step) {
		this.mode = mode
		this.step = 0
	}

	schema.methods.clear = function() {
		this.mode = null
		this.step = null
	}

	return { name: name, model: mongoose.model(name, schema)}
}