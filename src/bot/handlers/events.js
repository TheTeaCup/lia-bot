const fs = require("fs");

function EventHandler(Lia) {
    fs.readdir("./src/bot/events/", (err, files) => {
        if (err) {
            return console.log(
                `[ Lia ] (Bot) Found an error while loading Lia's Events.\n${err.stack}`
            );
        }

        files.forEach(file => {
            if (!file.endsWith(".js")) {
                return undefined;
            }

            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];

            Lia.on(eventName, event.bind(null, Lia));
            delete require.cache[require.resolve(`../events/${file}`)];
        });
    });
}

module.exports = EventHandler;