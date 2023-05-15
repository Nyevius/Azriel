const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Select a member and unmute them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to unmute")
        .setRequired(true)
    )

    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for unmuting")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),

  // data: aujournew SlashCommandBuilder()...
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const targetId = target.id;

    if (!targetId) {
      return interaction.reply("Could not find that user.");
    }

    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const botMember = interaction.guild.members.cache.get(target.id);
    const ranId = interaction.guild.members.cache.get(interaction.user.id);
    if (!ranId.permissions.has([PermissionsBitField.Flags.ModerateMembers])) {
      return interaction.reply("I do not have permission to unmute members.");
    }
    if (interaction.member.id == target.id)
      return await interaction.reply(
        { content: "you can't untimeout yourself" },
        { ephemeral: true }
      );
    let targetMember;
    
    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Unmute")
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    const response = await interaction.reply({
      content: `Are you sure you want to unmute ${target} for reason: ${reason}?`,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      targetMember = await interaction.guild.members.fetch(targetId);
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      const unmuteEmbed = new EmbedBuilder()
        .setTitle("unmute")
        .setDescription(`unmuted ${targetMember.user.username} for ${reason}`);

      const cancelEmbed = new EmbedBuilder()
        .setTitle("cancel")
        .setDescription(`The action has been cancelled`);

      if (confirmation.customId === "confirm") {
        await targetMember.timeout(null, reason);
        unmuteEmbed.setColor("Green");
        await confirmation.update({
          content: null,
          embeds: [unmuteEmbed],
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
      const errbanEmbed = new EmbedBuilder()
        .setTitle("error unmute")
        .setDescription(`Provide a valid user ID`);
      errbanEmbed.setColor("Red");
      await interaction.editReply({ embeds: [errbanEmbed] });
    }
   
  },
};
