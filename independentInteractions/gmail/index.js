const config = require("../../config");

const auth = require("./auth");
const { google } = require('googleapis');
var base64 = require('js-base64');
const Discord = require("discord.js");

let discordClient;
let lastMeetLink = "";
let channelID = config.discord.gmailChannelID;

const sendDiscordMessage = async (name, meetLink, htmlBody) => {
    let embed = await new Discord.MessageEmbed()
        .setColor("#0BEE38")
        .setAuthor("Nuevo link de clase mortales! 🦗")
        .setTitle(name)
        .addFields(
            {
                name: "link:", value: ("💠 https://" + meetLink), inline: true
            },
            {
                name: "linkAlternativo:", value: ("💠 https://" + meetLink + "?pli=1&authuser=1"), inline: true
            },
            {
                name: "Descripcion:", value: htmlBody
            },
        );


    discordClient.channels.cache.get(channelID).send("-- @everyone -------------------------------------------------------------------------------");
    discordClient.channels.cache.get(channelID).send({embeds: [embed]});
    discordClient.channels.cache.get(channelID).send("--------------------------------------------------------------------------------------------");

    lastMeetLink = meetLink;
}



const getMail = (auth, messageId) => {
    const gmail = google.gmail({ version: 'v1', auth });

    gmail.users.messages.get({
        userId: "me",
        id: messageId
    },
        (err, res) => {
            if (err) {
                console.log(err.message);
            }

            var body = res.data.payload.parts[0].body.data;
            var name = res.data.payload.headers.find((data) => {
                return data.name == "Subject"
            })

            var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));

            try {
                var meetLink = htmlBody.match(/meet.google.com\/.{3}-.{4}-.{3}/)[0];
            }
            catch {
                var meetLink = null;
            }

            if (meetLink != null && lastMeetLink != meetLink) {
                sendDiscordMessage(name.value, meetLink, htmlBody);
            }
        })
}



const ReadLastMessage = (auth, query) => {
    return new Promise((resolve, reject) => {
        const gmail = google.gmail({ version: 'v1', auth });

        gmail.users.messages.list(
            {
                userId: "me",
                q: query
            },
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!res.data.messages) {
                    resolve([]);
                    return;
                }

                resolve(res.data);
                getMail(auth, res.data.messages[0].id);
            }
        )
    })
}

const checkInbox = (client) => {
    discordClient = client;
    setInterval(() => {
        auth.authorizeInteraction(ReadLastMessage);
    }, 1000);
}

module.exports = {
    checkInbox
}