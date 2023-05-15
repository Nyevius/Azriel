const { SlashCommandBuilder, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin_flip')
        .setDescription('Make the bot do a coin flip.'),
    async execute(interaction) {
      let x = Math.floor((Math.random() * 2) + 1);
      var result;
      if (x === 1) {result = 'head';} else {result = 'tails';}
      const message = (`The coin landed on its ${result}.`);
      await interaction.reply(message);
    },
};
