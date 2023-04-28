const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to kick')
				.setRequired(true))
    
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for kicking'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
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
    if (!ranId.permissions.has([PermissionsBitField.Flags.KickMembers])) {
        return interaction.reply('I do not have permission to kick members.');
    }
    if (interaction.member.id == target.id) return await interaction.reply({content: "you can't kick yourself"}, {ephemeral: true})
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

    await interaction.reply(`kicking ${targetMember.user.username} for reason: ${reason}`);
    await interaction.guild.members.kick(targetMember);
  },


};
