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
  //option de la commande
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Select a member and unban them.")
    .addUserOption((option) =>
      option
        .setName("targetid")
        .setDescription("The id to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for unbanning")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const target = interaction.options.getUser("targetid");
    const targetId = target.id;
    if (!targetId) {
      return interaction.reply("Could not find that user.");
    }

    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const ranId = interaction.guild.members.cache.get(interaction.user.id);
    if (!ranId.permissions.has([PermissionsBitField.Flags.BanMembers])) {
      return interaction.reply("I do not have permission to ban members.");
    }
    if (interaction.member.id == target.id) {
      return await interaction.reply(
        { content: "you can't unban yourself" },
        { ephemeral: true }
      );
    }

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Unan")
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    const response = await interaction.reply({
      content: `Are you sure you want to unban ${target} for reason: ${reason}?`,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });
      const targetMember = await interaction.guild.bans.fetch(targetId);
      const unbanEmbed = new EmbedBuilder()
        .setTitle("unban")
        .setDescription(`unBanned ${targetMember.user.username} for ${reason}`);

      const cancelEmbed = new EmbedBuilder()
        .setTitle("cancel")
        .setDescription(`The action has been cancelled`);

      if (confirmation.customId === "confirm") {
        
        await interaction.guild.members.unban(targetMember.user.id, { reason });
        unbanEmbed.setColor("Green");
        await confirmation.update({
          content: null,
          embeds: [unbanEmbed],
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
      const errunbanEmbed = new EmbedBuilder()
        .setTitle("error unban")
        .setDescription(`Provide a valid user ID`);
      errunbanEmbed.setColor("Red");
      await interaction.editReply({ embeds: [errunbanEmbed] });
    }
  },
};
