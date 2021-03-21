const Discord = require("discord.js");
const Lia = new Discord.Client();

Lia.Commands = new Discord.Collection();
Lia.Aliases = new Discord.Collection();
Lia.ErrorColor = 0xf64465;
Lia.Color = "RANDOM"

require("./events.js")(Lia);
require("./commands.js")(Lia);

module.exports = Lia;