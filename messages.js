const back = "Back"

function message(message, values) {
	var message = messages[message]

	if(!message) return ""

	for (var i = 0; i < values.length; i++) {
		message = message.replace("%%", values[i])
	}

	return message
}

const messages = {

	message,

	greeting: "Welcome message.",
	menu: "Menu message.",

	back_keyboard: [[back]],

	// menu_keyboard: [["Recommend", "Discover trusted people"], ["I'm looking for...", "Explore opportunities", "Add myself a skill"], ["Find out @... by ID", "Bot info"]],
	menu_keyboard: [["Recommend", "Discover trusted people"], ["Add myself a skill", "Bot info"]],
	// !!! ВАЖНО чтобы пункты меню в точности совпадали с ключами сообщений + _message_x ниже:

	"Recommend_message": "Copy a person's username.",
	"Recommend_message_1": "Tell us what this person is really great at?",
	"Recommend_message_2": "Anything else this person is great at?",
	"Recommend_keyboard_2": [["Yes", "No"], [back]],

	"Recommend_recommender": "You've recommended @%%. Now you can see people that @%% has recommended.",
	"Recommend_recommender_recommendee_not_existing": "@%% is not registered in Minq, send him invite:",
	"Recommend_recommender_recommendee_not_existing_forward_message": "Hey, @%%! You've been invited to Minq bot by @%%!",
	"Recommend_recommendee": "Hey, @%% has just recommended you! Maybe recommend @%% back?",

	"Discover trusted people_message": "Your network (your contacts and people they recommended) has persons who are great at:\n\n",
	"Discover trusted people_message_generative": true,
	"Discover trusted people_message_empty": "Your network is empty, recommend someone, invite people.",

	"Discover trusted people_message_show_your_contact": "Your contact @%% is great at %%",
	"Discover trusted people_message_show_not_your_contact": "%% recommended a person who is great at \"%%\". Ask %% for an intro! To make it easy to forward, here are this person's skills/qualities:",
	
	// "I'm looking for..._message": "Message 3!",
	
	// "Explore opportunities_message": "Message 4!",
	
	"Add myself a skill_message": "Wanna add something you're great at?",

	"Add myself a skill_tagged": "You have added \"%%\" for yourself",
	
	// "Find out @... by ID_message": "Message 6!",
	
	"Bot info_message": "Info message."

}

module.exports = messages