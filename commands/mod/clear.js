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

        if (isNaN(amount) || amount < 1 || amount > 1000) {
            return interaction.reply({ content: 'Le nombre de messages à supprimer doit être compris entre 1 et 1000.', ephemeral: false });
        }

        const maxBulkDelete = 100;

        try {
            let totalDeleted = 0;
            let remaining = amount;

            while (remaining > 0) {
                const currentBulkDelete = Math.min(remaining, maxBulkDelete);

                const fetched = await interaction.channel.messages.fetch({ limit: currentBulkDelete });
                try {
                  await interaction.channel.bulkDelete(fetched);
                } catch (error) {
                    if (error.code === 50034) {
                       return interaction.channel.send("Je ne peux pas supprimer des messages de plus de 14 jours !");
                    } else {
                        console.error(error);
                        return interaction.channel.send("Une erreur s'est produite lors de la suppression des messages...");
                      }
                    }

                totalDeleted += fetched.size;
                remaining -= fetched.size;
            }

            interaction.reply({ content: `Suppression de ${totalDeleted} messages effectuée.`, ephemeral: false });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Une erreur s\'est produite lors de la suppression des messages.', ephemeral: false });
        }
    },
};