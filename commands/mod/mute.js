const { ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Select a member and mute them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to mute')
				.setRequired(true))
    
    .addStringOption( option => option.setName("duration").setRequired(true).setDescription('the duration of the mute').addChoices(
    {name: '60 seconds', value: '60'},
    {name: '5 minutes', value: '300'},
    {name: '10 minutes', value: '600'},
    {name: '30 minutes', value: '1800'},
    {name: '1 hour', value: '3600'},
    {name: '2 hours', value: '7200'},
    {name: '6 hours', value: '21600'},
    {name: '12 hours', value: '43200'},
    {name: '1 day', value: '86400'},
    {name: '7 days', value: '604800'},
    {name: '1 month', value: '2592000'},
    
    ))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for muting'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),
  
	// data: aujournew SlashCommandBuilder()...
async execute(interaction) {
    const target = interaction.options.getUser('target');
    const targetId = target.id;
    let duration = interaction.options.getString('duration');
    if (!targetId) {
        return interaction.reply('Could not find that user.');
    }

    
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const botMember = interaction.guild.members.cache.get(target.id);
    const ranId = interaction.guild.members.cache.get(interaction.user.id);
    if (!ranId.permissions.has([PermissionsBitField.Flags.ModerateMembers])) {
        return interaction.reply('I do not have permission to mute members.');
    }
    if (interaction.member.id == target.id) return await interaction.reply({content: "you can't timeout yourself"}, {ephemeral: true})
    let targetMember;
    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Mute")
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    const response = await interaction.reply({
      content: `Are you sure you want to mute ${target} for reason: ${reason} for ${duration/60} minute(s)?`,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      targetMember = await interaction.guild.members.fetch(targetId);
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      const muteEmbed = new EmbedBuilder()
        .setTitle("mute")
        .setDescription(`Muted ${targetMember.user.username} for ${reason} for ${duration/60} minute(s)`);

      const cancelEmbed = new EmbedBuilder()
        .setTitle("cancel")
        .setDescription(`The action has been cancelled`);

      if (confirmation.customId === "confirm") {
        await targetMember.timeout(duration*1000, reason);
        muteEmbed.setColor("Green");
        await confirmation.update({
          content: null,
          embeds: [muteEmbed],
          components: [],
        });
      } else if (confirmation.customId === "cancel") {
        cancelEmbed.setColor("Grey");
        await confirmation.update({
          content: null,
          embeds: [cancelEmbed],
          components: [],
        });
      }
    } catch (err) {
      const errmuteEmbed = new EmbedBuilder()
        .setTitle("error mute")
        .setDescription(`Provide a valid user ID`);
      errmuteEmbed.setColor("Red");
      await interaction.editReply({ embeds: [errmuteEmbed] });
    }
  
  
  
  
    
  },


};