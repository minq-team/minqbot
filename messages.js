const back = "Back"

module.exports = {

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
	"Recommend_message_3": "You've recommended @%%.",

	"Recommended_recommender": "Now you can see people that @%% has recommended.",
	"Recommended_recommendee": "Hey, @%% has just recommended you! Maybe recommend @%% back?",

	"Discover trusted people_message": "Your network (your contacts and people they recommended) has persons who are great at: %%",
	
	// "I'm looking for..._message": "Message 3!",
	
	// "Explore opportunities_message": "Message 4!",
	
	"Add myself a skill_message": "Wanna add something you're great at?",
	
	// "Find out @... by ID_message": "Message 6!",
	
	"Bot info_message": "Info message."

}