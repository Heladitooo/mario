require("dotenv").config()

const config = {
    discord: {
        clientID: process.env.DISCORD_CLIENT_ID,
        serverID: process.env.DISCORD_GUILD_ID,
        botToken: process.env.DISCORD_BOT_TOKEN,
        gmailChannelID: "894979262564687892",
    }
}

module.exports = config;