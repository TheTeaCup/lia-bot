const dotenv = require("dotenv").config();
const exec = require("child_process").exec;

if (process.env.GITHUBPULL) {
    update()
    async function update() {
        exec(`git pull origin master`, (error, stdout) => {
            let response = error || stdout;
            if (!error) {
                if (response.includes("Already up to date.")) {
                    console.log('[Lia] (Bot) already up to date. No changes since last pull')
                } else {
                    setTimeout(() => {
                        process.exit();
                    }, 1000);

                }
            }
        });
    }
    setInterval(function() {
        update()
    }, 60 * 1000);
};

require("./src/index");