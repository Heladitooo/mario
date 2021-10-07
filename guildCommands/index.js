require("dotenv").config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("../config");
const commands = require("../commands");

const rest = new REST({ version: '9' }).setToken(config.discord.botToken);

const startGuildCommands = async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.discord.clientID, config.discord.serverID),
            { body: commands},
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    startGuildCommands
}; 
