const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Database = require('../../Helpers/Database');
const vt = new Database('Database', 'Voice');
const mdb = new Database('Database', 'Message');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('me')
    .setDescription('Provides information about your statistics on the server.'),
  async execute(interaction) {
    const member = interaction.member;
    const voiceData = vt.get(`stats.${interaction.guild.id}.${member.id}`) || {
      voice: 0,
      channels: {},
    };
    const messageData = mdb.get(`stats.${interaction.guild.id}.${member.id}`) || {
      messages: 0,
      channels: {},
    };

    let voiceList = Object.keys(voiceData.channels)
      .map((vd) => {
        return {
          Id: vd,
          Total: voiceData.channels[vd],
        };
      })
      .sort((a, b) => b.Total - a.Total);

    let messageList = Object.keys(messageData.channels)
      .map((md) => {
        return {
          Id: md,
          Total: messageData.channels[md],
        };
      })
      .sort((a, b) => b.Total - a.Total);

    voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
    voiceList = voiceList
      .map(
        (vd, index) =>
          `\`${index + 1}.\` ${
            interaction.client.channels.cache.has(vd.Id)
              ? interaction.client.channels.cache.get(vd.Id).toString()
              : '#deleted-channel'
          }: \`${moment.duration(vd.Total).format('H [hours,] m [minutes]')}\``
      )
      .join('\n');
    messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
    messageList = messageList
      .map(
        (md, index) =>
          `\`${index + 1}.\` ${
            interaction.client.channels.cache.has(md.Id)
              ? interaction.client.channels.cache.get(md.Id).toString()
              : '#deleted-channel'
          }: \`${md.Total} message\``
      )
      .join('\n');
    const embed = new MessageEmbed()
      .setColor(member.displayHexColor)
      .setFooter(`${member.user.tag} | Powered by Serendia Squad`)
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .addField(
        'User Information',
        `\`ID:\` ${member.id}\n\`Roles:\` ${
          member.roles.cache.size >= 5 ? 'Roles are too much...' : member.roles.cache.map((role) => role.toString())
        }\n\`Nickname:\` ${member.displayName}`
      )
      .addField(
        'Voice Activity',
        `Last Activity: ${new Date(voiceData.activity).toLocaleDateString()}\n** **${voiceList}`
      )
      .addField(
        'Message Activity',
        `Last Activity: ${new Date(messageData.activity).toLocaleDateString()}\n** **${messageList}`
      );

    interaction.reply({ embeds: [embed] });
  },
};