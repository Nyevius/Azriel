const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Select a member and unban them.')
		.addUserOption(option =>
			option
				.setName('targetid')
				.setDescription('The id to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for unbanning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
  
	async execute(interaction) {
		const target = interaction.options.get('targetid').value;
		const targetId = target.id;
		if (!targetId) {
			return interaction.reply('Could not find that user.');
		}

		const reason = interaction.options.getString('reason') || 'No reason provided';
		const ranId = interaction.guild.members.cache.get(interaction.user.id);
		if (!ranId.permissions.has([PermissionsBitField.Flags.BanMembers])) {
			return interaction.reply('I do not have permission to ban members.');
		}
		if (interaction.member.id == target.id) {
			return await interaction.reply({ content: "you can't unban yourself" }, { ephemeral: true })
		}
		
		try {
			const targetMember = await interaction.guild.members.fetch(target);
			const unbanEmbed = new EmbedBuilder()
				.setColor("Green")
				 .setTitle("unban")
				.setDescription(`Unbanned ${targetMember.user.username} for ${reason}`);
			await interaction.reply({ embeds: [unbanEmbed] })
			await interaction.guild.members.unban(targetMember.user.id, { reason });
		} catch (err) {
			const errunbanEmbed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("error unban")
				.setDescription(`provide valid user ID`);
			await interaction.reply({ embeds: [errunbanEmbed] });
		}
	},
};