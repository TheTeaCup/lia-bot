const Discord = require("discord.js");
const package = require("../../../package.json");

module.exports.run = async (Lia, message, args, prefix, errors) => {

    const aboutEmbed = new Discord.MessageEmbed()
        .setTitle("Lia Stats")
        .setColor(Lia.Color)
        .addField(
            "How much storage does Lia take up?",
            `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
        )
        .addField(
            "What DJS and Node Version are we using?",
            `DJS: v${Discord.version} \n Node: ${process.version}`
        )
        .addField(
            "How many servers am I in?",
            `\`${Lia.guilds.cache.size.toLocaleString()}\` Servers`
        )
        .addField(
            "How many users do I serve?",
            `\`${Lia.guilds.cache
                .map(g => g.memberCount)
                .reduce((a, b) => a + b).toLocaleString()}\` Users`
        )

        .addField("Lia Version", `Current version of the bot: ${package.version} `)

    return message.channel.send(aboutEmbed);
}

exports.help = {
    name: "stats",
    description: "provides information on the bot",
    usage: ""
};

exports.conf = {
    Aliases: [""]
};