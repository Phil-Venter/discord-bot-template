const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require("path");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function getFiles(dir) {
	return fs.readdirSync(dir).flatMap(file => {
		let fullPath = path.join(dir, file);
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
const eventFiles = getFiles('./src/events');
const buttonFiles = getFiles('./src/buttons');
const commandFiles = getFiles('./src/commands');
const selectFiles = getFiles('./src/selects');

(async () => {
	for (file of handlers) {
		console.log(file)
		require(file)(client);
	}

	client.handleEvents(eventFiles);
	client.handleButtons(buttonFiles);
	client.handleCommands(commandFiles);
	client.handleSelects(selectFiles);

	client.login(token);
})();