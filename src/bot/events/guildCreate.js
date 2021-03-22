module.exports = async (Lia, guild) => {
    let data = {
        id: guild.id,
        owner: guild.ownerID,
        addedTimeStamp: guild.joinedTimestamp,
        prefix: "-",
        daily: {
            enabled: false,
            channel: null
        },
        events: {
            enabled: false,
            sendChannel: false,
            channel: null
        },
        leveling: {
            enabled: false,
            channel: null
        },
        welcome: {
            enabled: false,
            channel: null,
            dm: false,
            embed: false
        },
        autorole: {
            enabled: false,
            roles: []
        }
    };
    // store in redis as a string
    Lia.redis.set(`guild-${guild.id}`, JSON.stringify(data));

};