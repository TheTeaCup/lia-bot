const Discord = require("discord.js");

module.exports.run = async (Lia, message, args, prefix, errors) => {

    if (args[0]) {
        if (Lia.Developers.includes(message.author.id)) {
        } else {
            if (!message.member.permissions.has("ADMINISTRATOR"))
                return errors.mainError(
                    message,
                    "You need the `ADMINISTRATOR` permission to use this command."
                );
        }
    }

    await Lia.redis.get(`guild-${message.guild.id}`, async function (err, object) {
        if (err) {
            return errors.mainError(message, "Database Error");
        }

        if (object) {
            object = JSON.parse(object)
        } else {
            Lia.emit("guildCreate", message.guild);
            object = {
                id: message.guild.id,
                owner: message.guild.ownerID,
                addedTimeStamp: message.guild.joinedTimestamp,
                prefix: "-",
                daily: {
                    enabled: false,
                    channel: null
                },
                events: {
                    enabled: false,
                    sendChannel: false,
                    channel: null
                },
                leveling: {
                    enabled: false,
                    channel: null
                },
                welcome: {
                    enabled: false,
                    channel: null,
                    dm: false,
                    embed: false
                },
                autorole: {
                    enabled: false,
                    roles: []
                }
            };
        }

        console.log(object);

        if (!args[0]) {
            let response1 = new Discord.MessageEmbed()
                .setColor(Lia.Color)
                .setTitle("Lia - Server Settings")
                .addField("Ranking", `**\`${prefix}Settings Ranking <enable/disabled>\` - Disabled or Enable ranking for this Discord Server.**\n**\`${prefix}Settings Ranking Channel <#channel>\` - (Optional) Send all level-ups to a certain channel**`)
            return message.channel.send(response1);
        }

        if (args[0].toLowerCase() === "ranking") {

            if (!args[1]) {
                return errors.mainError(message, "Invalid Option: `Enable` or `Disable`");
            }

            if (args[1].toLowerCase() === "enable") {

                object.leveling.enabled = true;
                Lia.redis.set(`guild-${message.guild.id}`, JSON.stringify(object));
                return message.channel.send("Ranking has now been enabled!");

            } else if (args[1].toLowerCase() === "disable") {

                object.leveling.enabled = false;
                Lia.redis.set(`guild-${message.guild.id}`, JSON.stringify(object));
                return message.channel.send("Ranking has now been disabled!");

            } else {
                return errors.mainError(message, "Invalid Option: `Enable` or `Disable`");
            }

        }
    });
}

exports.help = {
    name: "settings",
    description: "Change a guilds settings",
    usage: "settings <function> <info>"
};

exports.conf = {
    Aliases: ["s"]
};