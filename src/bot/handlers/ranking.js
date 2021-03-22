const Discord = require("discord.js")

async function Rank(Lia, message) {

    let user = message.author.id;
    let server = message.guild.id;
    let xpAdd = Math.ceil(Math.random() * 15);
    let messageAdd = +1;

    await Lia.redis.get(`user-${user}-guild-${server}`, function(err, object) {

        if (err) {
            return console.log(
                `[ Lia ] (Bot) Found an error while loading rank data in handlers/ranking.js.\n${err.stack}`
            );
        }

        if(!object) {
            // new user
            let data = {
                user: message.author.id,
                username: message.author.username,
                serverID: message.guild.id,
                xp: xpAdd,
                level: 0,
                message: messageAdd,
                warns: 0,
                avatarURL: message.author.avatarURL({ format: "jpg" })
            };
            Lia.redis.set(`user-${user}-guild-${server}`, JSON.stringify(data));
        } else {
            // old user
            object = JSON.parse(object);

            object.avatarURL = message.author.avatarURL({ format: "jpg" });
            object.xp =  object.xp + xpAdd;
            object.message = object.message + messageAdd;
            object.username = message.author.username;

            let nxtlvl = 300 * Math.pow(2, object.level);

            if (object.xp >= nxtlvl) {
                object.level = object.level + 1

                // send rank card
                require("./rankCard")(Lia, message, object);

            }

            Lia.redis.set(`user-${user}-guild-${server}`, JSON.stringify(object));
        }

    })

};

module.exports = Rank;