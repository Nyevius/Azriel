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
    .setName("ban")
    .setDescription("Select a member and ban them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for banning")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

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
    if (!ranId.permissions.has([PermissionsBitField.Flags.BanMembers])) {
      return interaction.reply("I do not have permission to ban members.");
    }
    if (interaction.member.id == target.id)
      return await interaction.reply(
        { content: "You can't ban yourself." },
        { ephemeral: true }
      );
    let targetMember;
    try {
      targetMember = await interaction.guild.members.fetch(targetId);
    } catch (error) {
      console.error(error);
      return interaction.reply(
        "An error occurred while trying to fetch the member."
      );
    }

    if (!targetMember) {
      return interaction.reply("Could not find that user.");
    }

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    const response = await interaction.reply({
      content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      const banEmbed = new EmbedBuilder()
        .setTitle("ban")
        .setDescription(`Banned ${targetMember.user.username} for ${reason}`);

      const cancelEmbed = new EmbedBuilder()
        .setTitle("cancel")
        .setDescription(`The action has been cancelled`);

      if (confirmation.customId === "confirm") {
        await interaction.guild.members.ban(targetMember);
        banEmbed.setColor("Green");
        await confirmation.update({
          content: null,
          embeds: [banEmbed],
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
        .setTitle("error ban")
        .setDescription(`Provide a valid user ID`);
      errbanEmbed.setColor("Red");
      await interaction.editReply({ embeds: [errbanEmbed] });
    }
  },
};
