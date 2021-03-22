const Discord = require("discord.js");

module.exports.run = async (Lia, message, args, prefix, errors) => {
    var embed = new Discord.MessageEmbed()
        .setColor(Lia.Color)
        .setTitle("Lia Bot Ping")
        .setDescription("*fetching...*");

    let waiting = await message.channel.send(embed).catch(console.error);

    var pingEmbed = new Discord.MessageEmbed()
        .setColor(Lia.Color)
        .setTitle("Lia Bot Ping")
        .setDescription(
            `Ping: ${waiting.createdTimestamp - message.createdTimestamp}ms`
        )

    waiting.edit(pingEmbed).catch(console.error);
}

exports.help = {
    name: "ping",
    description: "get how slow the bot is",
    usage: "ping"
};

exports.conf = {
    Aliases: [""]
};