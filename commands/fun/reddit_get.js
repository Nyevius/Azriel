const { SlashCommandBuilder, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription('Post a popular recent post from a subreddit.')
    .addStringOption(option =>
			option
				.setName('subreddit')
				.setDescription('Subreddit you want to look for')
        .setRequired(true))
    .addStringOption( option => option.setName("setting").setRequired(true).setDescription('The Setting in which the post will be took from').addChoices(
        {name: 'Brand New', value: 'new'},
        {name: 'Recent and liked', value: 'hot'},
        {name: 'Most popular', value: 'top/?t=all'}
      )),
    async execute(interaction){
      const subreddit = interaction.options.getString('subreddit')
      const setting = interaction.options.getString('setting')
      await interaction.reply(`https://www.reddit.com/r/${subreddit}/${setting}`)
    }
}