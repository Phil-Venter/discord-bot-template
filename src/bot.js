const { Client, Intents } = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const path = require("path");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function getFiles(dir) {
	return fs.readdirSync(dir).flatMap(file => {
		const fullPath = path.join(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			return getFiles(fullPath);
		} else {
			if(fullPath.endsWith('.js')) {
				return path.resolve(fullPath);
			}
		}
	}).filter(_ => _);
}

const handlers = getFiles('./src/handlers');
const databaseFiles = getFiles('./src/database');
const eventFiles = getFiles('./src/events');
const buttonFiles = getFiles('./src/buttons');
const commandFiles = getFiles('./src/commands');
const selectFiles = getFiles('./src/select');

(async () => {
	for (file of handlers) {
		require(file)(client);
	}

	client.handleDatabase(databaseFiles, config);
	client.handleEvents(eventFiles);
	client.handleButtons(buttonFiles);
	client.handleCommands(commandFiles, config);
	client.handleSelects(selectFiles);

	client.login(config.token);
})();