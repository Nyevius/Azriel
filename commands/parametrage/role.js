const { Client, SlashCommandBuilder, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
	.setName('role')
	.setDescription('Add or assign yourself a new role')
	.addSubcommand(subcommand =>
		subcommand
			.setName('add')
			.setDescription('Add a new role on the  server')
			.addUserOption(option => option.setName('new_role').setDescription('The new role you want to add')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('assign')
			.setDescription('A ssign yourself a new role')),
    async execute(interaction) {
      
        await interaction.reply('');
    },
};

    