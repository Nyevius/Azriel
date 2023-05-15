
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Get info about the bot performance!'),
  async execute(interaction) { 
    const totalram = ((os.totalmem() / 10**6 + " ").split('.')[0]);
    const freeram = ((os.freemem() / 10**6 + " ").split('.')[0]);
    const usedram = (((os.totalmem() - os.freemem()) / 10**6 + " ").split('.')[0]);
    const prctfreeram = (((os.freemem() * 100) / os.totalmem + " ").split('.')[0]);
    const embed = new EmbedBuilder()
        .setColor(0xd9e0cb)
        .setTitle("Statistics")
        .setDescription("Stats of the bot")
        .addFields(
          { name: 'Memory (RAM)', value: `Total Memory: ${totalram}MB\nUsed Memory: ${usedram}MB\nFree Memory: ${freeram}MB\nPercentage Of Free Memory: ${prctfreeram}%`, inline: false},
          //{ name: 'Ping (ms)', value: `The bot's ping is ${client.ws.ping}ms `, inline: true}
        )
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.username} | Powered by Azraelios`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    
    await interaction.reply({ embeds: [embed] });
  },
};