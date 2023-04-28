const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or a server!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('user')
        .setDescription('Info about a user')
        .addUserOption(option => option.setName('target').setDescription('The user'))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('server')
        .setDescription('Info about the server')
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target') || interaction.user;
      const member = interaction.guild.members.cache.get(user.id);
      // user is the object representing the user specified in the UserOption, or the user who ran the command if no user was specified
      await interaction.reply(`This command was run by ${interaction.user.username}. The specified user is ${user.username} who joined on ${member.joinedAt}.`);
    } else if (interaction.options.getSubcommand() === 'server') {
      // interaction.guild is the object representing the Guild in which the command was run
      await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    }
  }
};