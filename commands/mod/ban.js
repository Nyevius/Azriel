const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField,  EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
  
	// data: aujournew SlashCommandBuilder()...
async execute(interaction) {
    const target = interaction.options.getUser('target');
    const targetId = target.id;
    if (!targetId) {
        return interaction.reply('Could not find that user.');
    }

    
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const botMember = interaction.guild.members.cache.get(target.id);
    const ranId = interaction.guild.members.cache.get(interaction.user.id);
    if (!ranId.permissions.has([PermissionsBitField.Flags.BanMembers])) {
        return interaction.reply('I do not have permission to ban members.');
    }
    if (interaction.member.id == target.id) return await interaction.reply({content: "you can't ban yourself"}, {ephemeral: true})
    let targetMember;
    try {
        targetMember = await interaction.guild.members.fetch(targetId);
    } catch (error) {
        console.error(error);
        return interaction.reply('An error occurred while trying to fetch the member.');
    }

    if (!targetMember) {
        return interaction.reply('Could not find that user.');
    }

    
    await interaction.guild.members.ban(targetMember);
  try {
      const banEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("unban")
      .setDescription(`Banned ${targetMember.user.username} for ${reason}`)
      await interaction.reply({embeds: [banEmbed]})
      
    } catch (err) {
      const errbanEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("error ban")
      .setDescription(`provide valid user ID`)
      await interaction.reply({embeds: [errbanEmbed]})
    }
  },


};
