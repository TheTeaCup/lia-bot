const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

async function RankCard(Lia, message, object) {

    let defaultBackground = "https://cdn.astrobot.org/assets/images/lia-default.jpeg";

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 70;
        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
    };

    let canvas = Canvas.createCanvas(934, 282);
    let ctx = canvas.getContext('2d');

    var background = await Canvas.loadImage(defaultBackground);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Draw rectangle
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(260, 80, 650, 160);
    ctx.closePath();
    ctx.stroke();

    //show Username
    ctx.font = applyText(canvas, object.username);
    ctx.fillStyle = '#fff';
    ctx.fillText(object.username + " Level up!", 280, 136);

    //Show Level & XP
    let nxtlvl = 300 * Math.pow(2, object.level);
    var xpleft = nxtlvl - object.xp;
    ctx.font = '40px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText("You are level now " + object.level + " - " + object.xp + " XP", 280, 180);

    //xp Left
    ctx.font = '50px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText("Next Level in " + xpleft + " xp", 280, 225);

    //Get avatar
    await GetAvatar(object, ctx);
    var lvlupimg = new MessageAttachment(canvas.toBuffer(), 'lvlup-image.png');
    message.channel.send(lvlupimg);

}

async function GetAvatar(object, ctx) {
    var avatar = await Canvas.loadImage(object.avatarURL);
    ctx.beginPath();
    ctx.arc(125, 140, 100, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 25, 40, 200, 200);
}
module.exports = RankCard;