const { Client, SlashCommandBuilder, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Make the bot do a poll.')
        .addStringOption(option =>
          option
            .setName('message')
            .setDescription('The message of the poll')
            .setRequired(true))
        .addStringOption(option =>
			    option
				    .setName('choice_1')
				    .setDescription('First choice')
            .setRequired(true))
        .addStringOption(option =>
			    option
				    .setName('choice_2')
				    .setDescription('Second choice')
            .setRequired(true)),
    async execute(interaction) {
        const msg = interaction.options.getString('message');
        const choice_1 = interaction.options.getString('choice_1');
        const choice_2 = interaction.options.getString('choice_2');
        const content = `${msg} 
1️⃣ = ${choice_1} 
2️⃣ = ${choice_2}`
        const message = await interaction.reply({ content: content, fetchReply: true })
        await message.react('1️⃣')
			  await message.react('2️⃣')
       
    },
};
