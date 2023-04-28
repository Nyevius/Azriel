const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandFilesPath = path.join(__dirname, "commands");

const walkSync = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fileList = walkSync(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
};

const commandFiles = walkSync(commandFilesPath).filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = require(file);
  console.log(`Processing file ${file}`);
  console.log(`Command: ${command}`);
  console.log(`Command data: ${command.data}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
