const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un certain nombre de messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Le nombre de messages à supprimer')
                .setRequired(true)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Le nombre de messages à supprimer doit être compris entre 1 et 100.', ephemeral: false });
        }

        try {
            const fetched = await interaction.channel.messages.fetch({ limit: amount });
            interaction.channel.bulkDelete(fetched);
            interaction.reply({ content: `Suppression de ${amount} messages effectuée.`, ephemeral: false });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Une erreur s\'est produite lors de la suppression des messages.', ephemeral: false });
        }
    },
};