const Sequelize = require('sequelize');

const name = 'Tags';

module.exports = {
	name,
	init: async (client) => {
		const table = client.sequelize.define(name, {
			name: {
				type: Sequelize.STRING,
				unique: true,
			},
			description: Sequelize.TEXT,
			username: Sequelize.STRING,
			usage_count: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		});

		table.sync();

		return table;
	}
};
