const { sleep, clean, unique } = require("../library");
const messages = require("../messages");

module.exports = function (db, send) {
  async function addTag(recommender, recommendee, tag, phone) {
    phone = phone || false;

    const addTag = { recommender, recommendee, tag, phone };

    const existing = await db.Tag.findOne(addTag);
    if (!existing) await db.Tag.create(addTag);
  }

  async function showContact(user, _message) {
    const show = _message.replace("show:", "");

    const tag = await db.Tag.findOne({
      $or: [
        { recommender: user.name, recommendee: show },
        { recommender: user.phone, recommendee: show },
      ],
    });
    const tags = await db.Tag.find({ recommendee: show });
    const tagsCloud = tags
      .map((tag) => tag.tag)
      .filter(unique)
      .join(", ");

    const showat = /^\d+$/.test(show) ? "+" + show : "@" + show;

    if (tag) {
      send(
        user.id,
        messages.message(user.mode + "_message_show_your_contact", [
          showat,
          tagsCloud,
        ]),
        messages.menu_keyboard
      );
    } else {
      const recommended = await db.Tag.find({
        $or: [{ recommender: user.name }, { recommender: user.phone }],
      });
      const recommendersCloud = tags
        .filter(
          (tag) =>
            tag.recommender !== user.identifier() &&
            recommended.map((r) => r.recommendee).includes(tag.recommender)
        )
        .map((tag) =>
          /^\d+$/.test(tag.recommender)
            ? "+" + tag.recommender
            : "@" + tag.recommender
        )
        .filter(unique)
        .join(", ");

      send(
        user.id,
        messages.message(user.mode + "_message_show_not_your_contact", [
          recommendersCloud,
          tagsCloud,
          recommendersCloud,
        ])
      );
      await sleep(1500);
      send(user.id, tagsCloud, messages.menu_keyboard);
    }
  }

  const menu = messages.menu_keyboard.flat();

  var flow = {};

  // 1. Recommend

  flow[menu[0]] = async function (user, _message) {
    const info = user.info ? JSON.parse(user.info) : {};

    switch (user.step) {
      case 0:
        send(
          user.id,
          messages[menu[0] + "_message"],
          messages[menu[0] + "_keyboard"]
        );
        break;
      case 1:
        if (info && info.phone) {
          const number = _message.replace(/[^0-9]/g, "");

          if (number.length < 7 || number.length > 15) {
            return send(
              user.id,
              messages[menu[0] + "_message_wrong_number"],
              messages.back_keyboard
            );
          }

          user.info = JSON.stringify({ phone: number });
        } else {
          const phoneMessage = messages[menu[0] + "_keyboard"][0][0];

          if (phoneMessage === _message) {
            send(
              user.id,
              messages[menu[0] + "_message_request_number"],
              messages.back_keyboard
            );

            user.info = JSON.stringify({ phone: true });
            user.step--;
          } else {
            user.info = JSON.stringify({
              name: clean(_message.toLowerCase(), true),
            });
          }
        }

        await user.save();
        break;
      case 2:
        if (info && (info.name || info.phone))
          await addTag(
            user.identifier(),
            !info.name ? info.phone : info.name,
            clean(_message),
            !info.name
          );
        break;
      case 3:
        if (info && (info.name || info.phone)) {
          const id = !info.name ? info.phone : info.name;
          const options = messages[menu[0] + "_keyboard_2"].flat();

          if (_message === options[0])
            // Yes
            user.step = 1;
          else if (_message === options[1])
            // No
            user.clear();
          else {
            await addTag(user.identifier(), id, clean(_message), !info.name);

            user.step--;
          }

          await user.save();

          if (user.mode === null) {
            const recommendeeExisting = await db.User.findOne(
              !info.name ? { phone: id } : { name: id }
            );

            const idat = !info.name ? "+" + id : "@" + id;

            if (recommendeeExisting) {
              send(
                recommendeeExisting.id,
                messages.message(menu[0] + "_recommendee", [
                  user.identifier(true),
                  user.identifier(true),
                ])
              );
              send(
                user.id,
                messages.message(menu[0] + "_recommender", [idat, idat, idat]),
                messages.menu_keyboard
              );
            } else {
              send(
                user.id,
                messages.message(
                  menu[0] +
                    "_recommender_recommendee_not_existing" +
                    (!info.name ? "_by_phone" : ""),
                  [idat, idat, idat, idat]
                ),
                messages.menu_keyboard
              );
              await sleep(2000);
              send(
                user.id,
                messages.message(
                  menu[0] +
                    "_recommender_recommendee_not_existing_forward_message" +
                    (!info.name ? "_by_phone" : ""),
                  [idat, user.identifier(true)]
                ),
                messages.menu_keyboard
              );
            }
          }
        }
        break;
    }

    const message = messages[menu[0] + "_message_" + user.step];
    const keyboard = messages[menu[0] + "_keyboard_" + user.step];

    if (message)
      send(user.id, message, keyboard ? keyboard : messages.back_keyboard);

    user.step++;
    await user.save();
  };

  // 2. Discover trusted people

  flow[menu[1]] = async function (user) {
    var list = [];
    var filter = [];

    async function add(recommendee) {
      if (filter.includes(recommendee)) return;

      const tags = await db.Tag.find({
        $or: [
          { phone: { $exists: false }, recommendee },
          { phone: false, recommendee },
          { phone: true, recommendee: recommendee.replace(/[^0-9]/g, "") },
        ],
      });

      list.push([
        {
          text: tags
            .map((tag) => tag.tag)
            .filter(unique)
            .join(", "),
          callback_data: recommendee,
        },
      ]);
      filter.push(recommendee);
    }

    const tags = await db.Tag.find({
      recommender: user.name ? user.name : user.phone,
      recommendee: { $ne: user.identifier() },
    });

    for (var i = 0; i < tags.length; i++) {
      const tag = tags[i];
      await add(tag.recommendee);

      const recommendeeTags = await db.Tag.find({
        recommender: tag.recommendee,
        recommendee: { $ne: user.identifier() },
      });
      for (var n = 0; n < recommendeeTags.length; n++) {
        await add(recommendeeTags[n].recommendee);
      }
    }

    if (list.length) {
      send(user.id, messages[menu[1] + "_message"], list, true);
    } else {
      send(user.id, messages[menu[1] + "_message_empty"]);
    }

    user.step++;
    await user.save();
  };

  // 3. I'm looking for...

  // flow[menu[2]] = function(user, _message) {
  // 	console.log("!3")
  // }

  // 4. Explore opportunities

  // flow[menu[3]] = function(user, _message) {
  // 	console.log("!4")
  // }

  // 5. Add myself a skill

  flow[menu[2 /*4*/]] = async function (user, _message) {
    await addTag(user.identifier(), user.identifier(), clean(_message));

    user.clear();
    await user.save();

    send(
      user.id,
      messages.message(menu[2 /*4*/] + "_tagged", [clean(_message)]),
      messages.menu_keyboard
    );
  };

  // 6. Find out @... by ID

  // flow[menu[5]] = function(user, _message) {
  // 	console.log("!6")
  // }

  const action = async function (_user, _message, _contact) {
    const user = await db.User.findOneAndUpdate(
      { id: _user.id },
      _user.name ? { $set: { name: _user.name } } : {}
    );

    if (!user || !user.mode) return;

    if (_message.startsWith("show:")) {
      showContact(user, _message);
    } else if (_message.startsWith("contact:")) {
      if (user.mode === menu[0] && user.step === 1) {
        flow[menu[0]](user, _contact.phone_number);
      }
    } else {
      if (menu.includes(user.mode)) {
        flow[user.mode](user, _message);
      }
    }
  };

  return action;
};
