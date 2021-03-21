const fs = require("fs");

function CommandHandler(Lia) {
    fs.readdir("./src/bot/commands/", (err, files) => {
        if (err) {
            console.log(
                `[ Lia ] (Bot) Found an error while loading Lia's Commands.\n${err.stack}`
            );
        }

        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) {
            console.log("[ Lia ] (Bot) No Commands to load.");
        }

        jsfiles.forEach(f => {
            let props = require(`../commands/${f}`);

            Lia.Commands.set(props.help.name, props);
            props.conf.Aliases.forEach(Alias => {
                Lia.Aliases.set(Alias, props.help.name);
            });
        });
    });
}

module.exports = CommandHandler;