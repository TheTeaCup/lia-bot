module.exports = async (Lia, guild) => {
    Lia.redis.del(`guild-${guild.id}`);
};