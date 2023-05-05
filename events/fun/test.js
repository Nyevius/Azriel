const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("messageCreate", async message => {
  if (message.content.includes('hey bot')){
    message.channel.send('hello')
  }
});