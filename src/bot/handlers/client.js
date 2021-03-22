const Discord = require("discord.js");
const Lia = new Discord.Client();

Lia.Commands = new Discord.Collection();
Lia.Aliases = new Discord.Collection();
Lia.ErrorColor = 0xf64465;
Lia.Color = "#D29D97";

require("./events.js")(Lia);
require("./commands.js")(Lia);

Lia.Developers = [
  "338192747754160138" // Tea Cup#9999
];

module.exports = Lia;