const { VoiceChannel } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        // On ne veut prendre en compte que les changements de salon vocal
        if (!oldState.channel && newState.channel) {
            // On crée un salon vocal avec le nom de l'utilisateur qui rejoint
            const channel = await newState.guild.channels.create(`${newState.member.displayName}'s Channel`, {
                type: 'GUILD_VOICE',
                parent: newState.channel.parent,
                permissionOverwrites: [
                    {
                        id: newState.guild.roles.everyone.id,
                        deny: VoiceChannel.defaultPermissionOverwrites.everyoneConnect,
                        allow: VoiceChannel.defaultPermissionOverwrites.everyoneSpeak
                    },
                    {
                        id: newState.member.id,
                        allow: VoiceChannel.defaultPermissionOverwrites.member
                    }
                ]
            });
            // On déplace l'utilisateur dans le salon vocal qu'on vient de créer
            newState.setChannel(channel);

            // On ajoute un écouteur d'événement pour supprimer le salon vocal si l'utilisateur le quitte
            const removeChannel = async (oldState, newState) => {
                if (oldState.channelId === channel.id && !newState.channel) {
                    await channel.delete();
                    newState.client.off('voiceStateUpdate', removeChannel);
                }
            };
            newState.client.on('voiceStateUpdate', removeChannel);
        }
    },
};
