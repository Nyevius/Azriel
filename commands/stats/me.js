const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('../../Helpers/Database');
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('me')
        .setDescription("Provides information about your statistics on the server."),
    async execute(interaction) {
        let voiceData = vt.get(`stats.${interaction.guildId}.${interaction.user.id}`) || {voice: 0, channels: {}};
        let messageData = mdb.get(`stats.${interaction.guildId}.${interaction.user.id}`) || {messages: 0, channels: {}};

        let voiceList = Object.keys(voiceData.channels).map(vd => {
            return {
                Id: vd,
                Total: voiceData.channels[vd]
            };
        }).sort((a, b) => b.Total - a.Total);

        let messageList = Object.keys(messageData.channels).map(md => {
            return {
                Id: md,
                Total: messageData.channels[md]
            };
        }).sort((a, b) => b.Total - a.Total);

        voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
        voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${interaction.client.channels.cache.has(vd.Id) ? interaction.client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [hours,] m [minutes]")}\``).join("\n");
        messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
        messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${interaction.client.channels.cache.has(md.Id) ? interaction.client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
        const embed = new EmbedBuilder()
          .setColor(interaction.member.displayHexColor)
          .setFooter({ text: `${interaction.user.tag} | Powered by Azraelios`, iconURL: 'https://cdn.discordapp.com/attachments/509430822491783168/1102249346394771506/FutureGirl_2.png' })
          .setThumbnail(interaction.user.avatarURL({dynamic: true}))
          .addFields(
		          { 
                name: 'User Information', 
                value: `ID: ${interaction.user.id}\n` +
                       `Roles: ${interaction.member.roles.cache.size >= 5 ? "Roles are too much..." : interaction.member.roles.cache.map(role => role.toString()).join(', ')}\n` +
                       `Nickname: ${interaction.member.displayName}`, inline : true
              },
              { 
                name: 'Voice Activity', 
                value: `Last Activity: ${new Date(voiceData.activity).toLocaleDateString()}\n` +
                       `** **${voiceList}`, inline : true
              },
		          { 
                name: 'Message Activity', 
                value: `Last Activity: ${new Date(messageData.activity).toLocaleDateString()}\n` +
                       `** **${messageList}`, inline : true
              }
	        )

        await interaction.reply({ embeds: [embed] });
    },
};