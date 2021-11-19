const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.buttons = new Collection();
client.commands = new Collection();
client.selects = new Collection();

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./src/buttons').filter(file => file.endsWith('.js'));
const selectFiles = fs.readdirSync('./src/selects').filter(file => file.endsWith('.js'));

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client);
	}

	client.handleEvents(eventFiles);
	client.handleCommands(commandFiles);
	client.handleButtons(buttonFiles);
	client.handleSelects(selectFiles);

	client.login(token);
})();