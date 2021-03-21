const Discord = require("discord.js");

module.exports.run = async (Lia, message, args, prefix, errors) => {
    let response = new Discord.MessageEmbed()
        .setColor(Lia.Color)
        .setTitle("Lia - Help")
        .setDescription(`Hello <@${message.author.id}>, I am Lia a multipurpose bot created by [Tea Cup#9999](https://theteacup.dev/)`)
        .addField("Commands", `**\`${prefix}Help\` - This command**`)
    return message.channel.send(response);

}

exports.help = {
    name: "help",
    description: "gives information about the bot and the commands list",
    usage: "help"
};

exports.conf = {
    Aliases: ["h"]
};