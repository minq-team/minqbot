const back = "Back";

const messages = {
  greeting:
    "Welcome to @Minqbot!\n\nUsing Minqbot is simple:\n1. Recommend people you trust. These people will become your contacts on Minqbot and you'll be able to see people they've recommended.\n2. Explore your network: discover all the people recommended by your contacts on Minqbot and see what they're great at (their skills, qualities etc).\n3. Promote yourself: add what you're great at and get recommended by your friends so that people in their networks can discover you.\n\nFor any questions, contact @we_minq.\n\nHappy networking!",
  menu: "Choose what you'd like to do:",

  phone_required:
    "You don't have a @username on Telegram. It means that we need your phone number to form your connections on Minqbot.\n\nPlease share your contact number with us. We won't share it with anyone – we'll only use it to form your network", // !!!
  phone_required_keyboard: [
    [{ text: "Share my phone number", request_contact: true }],
  ], // !!!

  back_keyboard: [[back]],

  // menu_keyboard: [["Recommend a friend", "Explore your network"], ["I'm looking for...", "Explore opportunities", "Promote yourself"], ["Find out @... by ID", "Bot info"]],
  menu_keyboard: [
    ["Recommend a friend", "Explore your network"],
    ["Promote yourself", "Bot info"],
  ],
  // !!! ВАЖНО чтобы пункты меню в точности совпадали с ключами сообщений + _message_x ниже:

  "Recommend a friend_message":
    "Copy/paste a person's @username, e.g. @durov or durov.",
  "Recommend a friend_message_generative": true,
  "Recommend a friend_keyboard": [
    ["This person has only a phone number on Telegram"],
    [back],
  ], // !!!
  "Recommend a friend_message_1":
    "Tell us what this person is really great at? One thing!\nE.g. Product Management, EU Financial Law, Interior design etc.\n(must not exceed 50 characters)",
  "Recommend a friend_message_2":
    "Would you like to add another thing this person is great at?",
  "Recommend a friend_keyboard_2": [["Yes", "No"], [back]],

  "Recommend a friend_message_request_number":
    "Copy/paste a person's phone number.\nIt should start with a country code, e.g. +1234556 (not 234556)", // !!!
  "Recommend a friend_message_wrong_number":
    "It doesn't look like a phone number :) Try again.", // !!!

  "Recommend a friend_recommender":
    "Nice! You've recommended %%. Now the people whom %% has recommended are added to \"Explore your network\".\n%% has been notified that you've recommended them, so maybe they'll decide to recommend you back!",
  "Recommend a friend_recommender_recommendee_not_existing":
    "Nice! You've recommended %%. Unfortunately, %% is not on @Minqbot yet, so %% has not recommended anyone and there's no one to add to \"Explore your network\".\nChange it: send a link to @Minqbot to %% so that they'll recommend people they trust and you'll grow your network.\nE.g. you can use this message to copy:",
  "Recommend a friend_recommender_recommendee_not_existing_forward_message":
    "Hey there! I've just recommended you on @Minqbot. It's a database of people your contacts trust and recommend. Join @Minqbot, recommend people you trust, and discover great people they trust.\nMaybe recommend me back? :)",
  "Recommend a friend_recommender_recommendee_not_existing_by_phone":
    "Nice! You've recommended %%. Unfortunately, %% is not on @Minqbot yet, so %% has not recommended anyone and there's no one to add to \"Explore your network\".\nChange it: send a link to @Minqbot to %% so that they'll recommend people they trust and you'll grow your network.\nE.g. you can use this message to copy:", // !!!
  "Recommend a friend_recommender_recommendee_not_existing_forward_message_by_phone":
    "Hey there! I've just recommended you on @Minqbot. It's a database of people your contacts trust and recommend. Join @Minqbot, recommend people you trust, and discover great people they trust.\nMaybe recommend me back? :)", // !!!
  "Recommend a friend_recommendee":
    "Hey! %% has just recommended you! Maybe recommend %% back?",

  "Explore your network_message":
    "Your network (your contacts and people they've recommended) has persons who are great at:\n\n",
  "Explore your network_message_generative": true,
  "Explore your network_message_empty":
    "You have not recommended anyone, so there's no one in your network. Recommend people you trust, tell us what they are great at, and start growing your network with @Minqbot!",

  "Explore your network_message_show_your_contact":
    "Your contact %% is great at %%",
  "Explore your network_message_show_not_your_contact":
    '%% recommended a person who is great at "%%". Ask %% for an intro!\nTo make it easy to forward, here is what this person is great at:',

  // "I'm looking for..._message": "Message 3!",

  // "Explore opportunities_message": "Message 4!",

  "Promote yourself_message":
    "Add something you're great at\n(must not exceed 50 characters)",

  "Promote yourself_tagged":
    "Nice! You've added \"%%\" to the list of things you're great at. Don't forget to ask your friends to recommend you so that their contacts can discover your talents!\nInvite them to @Minqbot",

  // "Find out @... by ID_message": "Message 6!",

  "Bot info_message":
    "Using @Minqbot is simple:\n\n1. Recommend people you trust. These people will become your contacts on Minqbot and you'll be able to see people they've recommended.\n2. Explore your network: discover all the people recommended by your contacts on Minqbot and see what they're great at (their skills, qualities etc).\n3. Promote yourself: add what you're great at and get recommended by your friends so that people in their networks can discover you.\n\nFor any questions, contact @we_minq. По-русски @ru_minqbot\n\nHappy networking!",
};

module.exports = { messages, back };
