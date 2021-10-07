const config = require("./config");
const commands = require("./commands");

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const guildCommands = require("./guildCommands");

const gmail = require("./independentInteractions/gmail");

guildCommands.startGuildCommands();



client.on('ready', () => {
    console.log(`${client.user.tag} is online!`);

    gmail.checkInbox(client);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.find((command) => {
        return command.name === interaction.commandName;
    })

    if (command !== undefined) {
        command.response(interaction);
    }
});

client.login(config.discord.botToken);