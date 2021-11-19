const fs = require('fs');

module.exports = (client) => {
	client.handleButtons = async (buttonFiles) => {
		for (const file of buttonFiles) {
			const button = require(`../buttons/${file}`);

			client.buttons.set(button.data.name, button);
		}
	};
};