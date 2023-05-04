const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("messageCreate", async message => {
  if (message.content.toLowerCase().ncludes('hey bot')){
    message.channel.send("hello");
  }
});