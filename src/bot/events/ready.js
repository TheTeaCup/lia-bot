const cron = require("node-cron");
const Discord = require("discord.js");

module.exports = async Lia => {
    console.log("Lia (Bot) Connected to Discord.");
    console.log(`Lia (Bot) Server's I serve ${Lia.guilds.cache.size}`);

    //Auto Activities List
    const activities = [
        {
            text: "Created by Tea Cup",
            type: "PLAYING"
        },
        {
            text: "Over everyone",
            type: "WATCHING"
        }
    ];

    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        Lia.user.setActivity(activity.text, {
            type: activity.type
        });
    }, 30000);

};