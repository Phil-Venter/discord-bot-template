const { ActivityTypes } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const { type, name, status } = client.config;
		client.user.setPresence({ activities: [{ type, name }], status });
	}
}