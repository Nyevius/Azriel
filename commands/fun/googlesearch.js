const { SlashCommandBuilder, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('google_search')
        .setDescription('Send a google search.')
    .addStringOption(option =>
			option
				.setName('search')
				.setDescription('Thing you want to search')
        .setRequired(true)),
    async execute(interaction){
      var search_old = interaction.options.getString('search')
      var search = search_old.split(' ').join('+');
      await interaction.reply(`https://www.google.com/search?client=firefox-b-e&q=${search}`)
    }
}