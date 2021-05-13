module.exports = {

	sleep: async function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	},

	clean: function(string, replace) {
		replace = replace || false

		return (replace ? string.replace("@", "").replace(/[^a-zA-Z0-9]/g, "_") : string).substring(0, 32)
	},

	unique: function (value, index, self) {
		return self.indexOf(value) === index
	}

}