const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');
const fs = require('fs');

module.exports = (client) => {
	client.handleCommands = async (commandFiles) => {
		const commandArray = [];

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);

			client.commands.set(command.data.name, command);
			commandArray.push(command.data.toJSON());
		}

		const rest = new REST({ version: '9' }).setToken(token);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commandArray },
				);

				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	};
};