const { MessageEmbed, SlashCommandBuilder } = require("discord.js");
const Database = require('../../Helpers/Database');
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('me')
        .addDescription("Provides information about your statistics on the server."),
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
        let embed = new MessageEmbed();
        embed.setColor(interaction.member.displayHexColor)
        .setFooter(`${interaction.user.tag} | Powered by Serendia Squad`)
        .setThumbnail(interaction.user.avatarURL({dynamic: true}))
        .addField("User Information",` 
    
        \`ID:\` ${interaction.user.id} 
        \`Roles:\` ${interaction.member.roles.cache.size >= 5 ? "Roles are too much..." : interaction.member.roles.cache.map(role => role.toString())}
        \`Nickname:\` ${interaction.member.displayName}
        `)
        .addField("Voice Activity", `
        Last Activity: ${new Date(voiceData.activity).toLocaleDateString()}
        ** **${voiceList}
        `)
        .addField("Message Activity", `
        Last Activity: ${new Date(messageData.activity).toLocaleDateString()}
        ** **${messageList}
        `);

        await interaction.reply({ embeds: [embed] });
    },
};