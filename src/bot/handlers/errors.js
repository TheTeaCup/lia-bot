const Discord = require("discord.js");

module.exports.mainError = async (message, msg) => {
    let errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf64465)
        .setDescription(`${msg}`)

    return message.channel.send(errorEmbed);
};