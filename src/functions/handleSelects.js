const fs = require('fs');

module.exports = (client) => {
	client.handleSelects = async (selectFiles) => {
		for (const file of selectFiles) {
			const select = require(`../selects/${file}`);

			client.selects.set(select.data.name, select);
		}
	};
};