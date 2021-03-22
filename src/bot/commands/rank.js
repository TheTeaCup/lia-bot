const Discord = require("discord.js");

module.exports.run = async (Lia, message, args, prefix, errors) => {

    await Lia.redis.get(`guild-${message.guild.id}`, async function(err, object) {
        if (err) {
            console.log(
                `[ Lia ] (Bot) Found an error while loading guild data in message.js.\n${err.stack}`
            );
            error = true;
        }
        if (object) {
            object = JSON.parse(object);
            if(!object.leveling.enabled) {
                return errors.mainError(message, "Leveling is disabled in this server.");
            } else {

                let user = message.author.id;
                let server = message.guild.id;

                let awaiter = await message.channel.send("<a:loading:808174226057199667> Please wait while I fetch your info!");

                await Lia.redis.get(`user-${user}-guild-${server}`, function(err, object) {

                    if (err) {
                        console.log(
                            `[ Lia ] (Bot) Found an error while loading rank data in handlers/ranking.js.\n${err.stack}`
                        );
                        awaiter.delete();
                        return errors.mainError(message, "A Database error has occurred.")
                    }

                    if(object) {
                        object = JSON.parse(object);
                        // user
                        require("../handlers/rankCardCommand")(Lia, message, object, awaiter);
                    } else {
                        // no user
                        let data = {
                            user: message.author.id,
                            username: message.author.username,
                            serverID: message.guild.id,
                            xp: 0,
                            level: 0,
                            message: 0,
                            warns: 0,
                            avatarURL: message.author.avatarURL({ format: "jpg" })
                        };

                        require("../handlers/rankCardCommand")(Lia, message, data, awaiter);
                    };
                });

            }
        } else {
            Lia.emit("guildCreate", message.guild);
            return errors.mainError(message, "Leveling is disabled in this server.");
        }

    });
};

exports.help = {
    name: "rank",
    description: "gives a user their rank card",
    usage: "rank <@user>"
};

exports.conf = {
    Aliases: []
};