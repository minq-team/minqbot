const name = "Tag"

module.exports = function(mongoose) {
	const schema = new mongoose.Schema({

		recommender: Number,
		recommendee: Number,

		tag: String,

		createdAt: { type: Date, default: Date.now }

	})

	return { name: name, model: mongoose.model(name, schema)}
}