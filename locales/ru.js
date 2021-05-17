const back = "Назад"

const messages = {

	greeting: "Привет, я – Minqbot!\n\nПользоваться мной просто:\n1. Рекомендуйте проверенных людей. Эти люди станут вашими контактами в Minqbot, и вы сможете видеть, кого порекомендовали они.\n2. Находите того, кто вам нужен: узнайте, кого порекомендовали ваши контакты в Minqbot, в чем они хороши и чем могут быть полезны.\n3. Продвигайте себя: расскажите, что вы делаете хорошо и чем можете быть полезны другим людям. Пусть ваши друзья рекомендуют вас – так вы окажетесь в их нетворке, и их контакты смогут находить вас.\n\nПо любым вопросам пишите @we_minq.\n\nПриятных коннектов :)",
	menu: "Что хотите сделать?",

	phone_required: "У вас нет @юзернейма в Telegram. Значит, нам понадобится ваш телефонный номер, чтобы сформировать ваши связи с другими людьми в Minqbot.\n\nПожалуйста, поделитесь своим контактом с Minqbot по кнопке ниже. Мы не покажем ваш номер незнакомым людям, не переживайте – мы используем его лишь для формирования вашего нетворка.", // !!!
	phone_required_keyboard: [[{ text: "Поделиться своим контактом", request_contact: true }]], // !!!

	back_keyboard: [[back]],

	// menu_keyboard: [["Recommend a friend", "Explore your network"], ["I'm looking for...", "Explore opportunities", "Promote yourself"], ["Find out @... by ID", "Bot info"]],
	menu_keyboard: [["Рекомендовать друга", "Найти проверенного человека"], ["Добавить себе навык", "Инфо о боте"]],
	// !!! ВАЖНО чтобы пункты меню в точности совпадали с ключами сообщений + _message_x ниже:

	"Рекомендовать друга_message": "Скопируйте и вставьте @username человека, например @durov или durov.",
	"Рекомендовать друга_message_generative": true,
	"Рекомендовать друга_keyboard": [["У человека указан только телефонный номер в Telegram"], [back]], // !!!
	"Рекомендовать друга_message_1": "Расскажите, в чем этот человек хорош, чем может быть полезен другим? Что-то одно!\nНапример, налоговое право, Java разработчик, дизайн интерьера, няня и т.д.\n(до 50 символов)",
	"Рекомендовать друга_message_2": "Хотите добавить что-то еще, в чем этот человек хорош?",
	"Рекомендовать друга_keyboard_2": [["Да", "Нет"], [back]],

	"Рекомендовать друга_message_request_number": "Скопируйте и вставьте телефонный номер человека.\nОн должен начинаться с кода страны, т.е. +7234556 (а не 8234556 или 234556)", // !!!
	"Рекомендовать друга_message_wrong_number": "Это не выглядит как телефонный номер :) Должны быть только цифры.", // !!!

	"Рекомендовать друга_recommender": "Отлично! Вы порекомендовали %%. Теперь вы можете видеть людей, которых порекомендовал/а %%, в \"Найти проверенного человека\".\nМы оповестили %% о вашей рекомендации, так что, возможно, этот человек захочет порекомендовать вас в ответ!",
	"Рекомендовать друга_recommender_recommendee_not_existing": "Отлично! Вы порекомендовали %%. К сожалению, %% еще не заходил/а @ru_Minqbot, поэтому %% еще никого не порекомендовал/а, и мы не можем никого добавить в \"Найти проверенного человека\".\nИсправьте это: отправьте %% ссылку на @ru_Minqbot – пусть он порекомендует тех, кому доверяет, и вы получите доступ к его нетворку.\nНапример, вы можете использовать это сообщение:",
	"Рекомендовать друга_recommender_recommendee_not_existing_forward_message": "Привет! Ты теперь в моих рекомендованных на @ru_Minqbot. С Minqbot ты сможешь находить классных специалистов, которых порекомендовали твои контакты. Зайди в @ru_Minqbot, порекомендуй тех, кому доверяешь, и открывай для себя людей, кого порекомендовали они.\nМожет, и меня порекомендуешь в ответ? :)",
	"Рекомендовать друга_recommender_recommendee_not_existing_by_phone": "Отлично! Вы порекомендовали %%. К сожалению, %% еще не заходил/а @ru_Minqbot, поэтому %% еще никого не порекомендовал/а, и мы не можем никого добавить в \"Найти проверенного человека\".\nИсправьте это: отправьте %% ссылку на @ru_Minqbot – пусть он порекомендует тех, кому доверяет, и вы получите доступ к его нетворку.\nНапример, вы можете использовать это сообщение:", // !!!
	"Рекомендовать друга_recommender_recommendee_not_existing_forward_message_by_phone": "Привет! Ты теперь в моих рекомендованных на @ru_Minqbot. С Minqbot ты сможешь находить классных специалистов, которых порекомендовали твои контакты. Зайди в @ru_Minqbot, порекомендуй тех, кому доверяешь, и открывай для себя людей, кого порекомендовали они.\nМожет, и меня порекомендуешь?:)", // !!!
	"Рекомендовать друга_recommendee": "%% только что порекомендовал/а вас! Может, порекомендуете %% в ответ?",

	"Найти проверенного человека_message": "Среди ваших контактов и тех, кого они порекомендовали, есть люди, которые хороши в следующем (нажмите на любого, чтобы узнать больше):\n\n",
	"Найти проверенного человека_message_generative": true,
	"Найти проверенного человека_message_empty": "Вы еще никого не порекомендовали, так что в вашем нетворке нет никого :( Порекомендуйте людей, кому доверяете, напишите, в чем они хороши и чем могут быть полезны, и получите доступ к их рекомендованным людям с @ru_Minqbot!",

	"Найти проверенного человека_message_show_your_contact": "Ваш контакт %% хорош в: %%",
	"Найти проверенного человека_message_show_not_your_contact": "%% порекомендовал/а человека, который хорош в: \"%%\". Попросите %% свести вас с этим человеком!\nЧтобы было легче спросить, вот список того, в чем этот человек хорош (можете переслать):",
	
	// "I'm looking for..._message": "Message 3!",
	
	// "Explore opportunities_message": "Message 4!",
	
	"Добавить себе навык_message": "В чем вы хороши, в чем можете быть полезны другим? Что-то одно за раз\n(не больше 50 символов)",

	"Добавить себе навык_tagged": "Отлично! Вы добавили \"%%\" к списку того, в чем вы хороши. Не забудьте попросить своих друзей рекомендовать вас – только в этом случае их контакты смогут найти вас!\nПриглашайте их в @ru_Minqbot (@Minqbot for English-speaking ones)!",
	
	// "Find out @... by ID_message": "Message 6!",
	
	"Инфо о боте_message": "Пользоваться @ru_Minqbot просто:\n1. Рекомендуйте проверенных людей. Эти люди станут вашими контактами в Minqbot, и вы сможете видеть, кого порекомендовали они.\n2. Находите того, кто вам нужен: узнайте, кого порекомендовали ваши контакты в Minqbot, в чем они круты и чем могут быть полезны.\n3. Продвигайте себя: расскажите, что вы делаете хорошо и чем можете быть полезны другим людям. Пусть ваши друзья рекомендуют вас – так вы окажетесь в их нетворке, и их контакты смогут находить вас.\n\nПо любым вопросам пишите @we_minq.\n\nПриятных коннектов :)"

}

module.exports = { messages, back }