const fs = require("fs")

module.exports = function(db, send) {
	const files = fs.readdirSync(__dirname)

	var controllers = []

	for (var i = 0; i < files.length; i++) {
		const file = files[i]

		if(file !== "index.js") {
			controllers[file.replace(".js", "")] = require(__dirname + "/" + file)(db, send)
		}
	}

	return controllers
}