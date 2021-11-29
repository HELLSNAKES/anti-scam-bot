const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
    ws: { properties: { $browser: "Discord iOS" } }
})
require("dotenv").config()
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`Antiscam-Bot`, { type: 3, browser: "DISCORD IOS" })
});
client.on('messageCreate', async message => {
    const array = require(`./scam.json`)
    if (array.some(word => message.content.toLowerCase().includes(word))) {
        message.delete()
        const embed = new MessageEmbed()
            .setTitle("Scam detected")
            .setColor("#ff0000")
            .setDescription("Please don't send any scam messages. Thank you.")
            .setFooter("Antiscam-Bot by @HELLSNAKE#6851|Automatically delete messages after 1 minute")
        message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => { m.delete() }, 60000) })
    }
})
// anti crash 
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
})
client.login(process.env.token)