const { Client, Intents } = require('discord.js');
const config = require('../config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const files = require('./files.js');

const handlerFiles = files('./src/handlers');
const databaseFiles = files('./src/database');
const eventFiles = files('./src/events');
const buttonFiles = files('./src/buttons');
const commandFiles = files('./src/commands');
const selectFiles = files('./src/select');

(async () => {
	for (file of handlerFiles) {
		require(file)(client);
	}

	client.handleDatabase(databaseFiles, config);
	client.handleEvents(eventFiles, config);
	client.handleButtons(buttonFiles, config);
	client.handleCommands(commandFiles, config);
	client.handleSelects(selectFiles, config);

	client.login(config.token);
})();