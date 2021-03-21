const Lia = require("./bot/handlers/client");
const database = require("./bot/handlers/database");
const cron = require("node-cron");

database.on("connect", function() {
    console.log(
        "[ Lia ] ( Database ) Successfully connected to Redis database."
    );
    success(database);
});

database.on("error", function(err) {
    console.log(
        "[ Lia ] ( Database ) Connection Failed to Redis database."
    );
    console.log("[ Lia ] ( Database ) Error: ", err);
    error(err);
});

var success = (function(s) {
    var executed = false;
    return function(s) {
        if (!executed) {
            executed = true;
            console.log("[ Lia ] ( Bot ) is starting...");
            Lia.redis = database;
            Lia.login(process.env.TOKEN);
        }
    };
})();

var error = (function(e) {
    var executed = false;
    return function(e) {
        if (!executed) {
            executed = true;
            cron.schedule("*/2 * * * *", function() {
                console.log(
                    "[ Lia ] ( Database ) Error: Attempting to restart bot. ( every 2 minutes until connected to DB )"
                );
                process.exit();
            });
        }
    };
})();