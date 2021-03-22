const Discord = require("discord.js");
let Errors = require("../handlers/errors");

module.exports = async (Lia, message) => {
    if (
        message.author.bot ||
        !message.author ||
        message.channel.type !== "text"
    ) {
        return undefined;
    }

    let Prefix = "-";

    let guildInfo;
    let error;
    await Lia.redis.get(`guild-${message.guild.id}`, function(err, object) {
        if (err) {
            console.log(
                `[ Lia ] (Bot) Found an error while loading guild data in message.js.\n${err.stack}`
            );
            error = true;
        }
        if (object) {
            guildInfo = JSON.parse(object);
        }

        if (guildInfo) {
            Prefix = guildInfo.prefix || "a!";
            if(guildInfo.leveling.enabled) {
                require("../handlers/ranking")(Lia, message);
            };
        } else {
            Lia.emit("guildCreate", message.guild);
        }

        if (message.content === `<@!${Lia.user.id}>`) {
            const embed2 = new Discord.MessageEmbed()
                .setColor(Lia.Color)
                .setTitle("Need Assistance?")
                .setThumbnail(message.guild.iconURL())
                .setDescription(
                    `This guilds prefix is: **${Prefix}** \n Help Command: **${Prefix}help** \n Support Guild: [click here](https://discord.gg/pkSwUmDvGF)`
                );

            return message.channel.send(embed2);
        }

        if (message.content.indexOf(Prefix) !== 0) {
            return undefined;
        }

        console.log(
            `${message.guild.name} [${message.guild.id}] - ${message.channel.name} [${message.channel.id}] \n ${message.author.tag} - ${message.content}`
        );

        let args = message.content
            .slice(Prefix.length)
            .trim()
            .split(/ +/g);
        let Command = args.shift().toLowerCase();

        let LiaCommand;
        if (Lia.Commands.has(Command)) {
            LiaCommand = Lia.Commands.get(Command);
        } else if (Lia.Aliases.has(Command)) {
            LiaCommand = Lia.Commands.get(Lia.Aliases.get(Command));
        } else {
            return; //Not a command
        }

        LiaCommand.run(Lia, message, args, Prefix, Errors);
    });
};