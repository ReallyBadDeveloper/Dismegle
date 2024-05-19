const dotenv = require('dotenv').config();
const { Client, GatewayIntentBits, Events, REST, Routes, EmbedBuilder } = require('discord.js');
const token = process.env.TOKEN;
const client_id = process.env.CLIENT_ID;
const queueManager = require('./queue.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
] });

const embedColors = {
    green: 0x3ef05f,
    red: 0xe84938,
    orange: 0xd89e2f,
}

const commands = [
    {
        name: 'queue',
        description: 'Searches for an open user to start talking with.',
    },
    {
        name: 'exit',
        description: 'Exits the chat.',
    },
];
  
const rest = new REST({ version: '10' }).setToken(token);
  
try {
    console.log('Started refreshing application (/) commands.');
  
    rest.put(Routes.applicationCommands(client_id), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error('Failed to add commands: ' + error);
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'queue') {
        await interaction.reply({
            embeds: [
                new EmbedBuilder().setColor(embedColors.orange).setTitle('Searching...').setDescription('This may take longer depending on the amount of users searching.')
            ], ephemeral: true,
        });
    }
  });

client.login(token);