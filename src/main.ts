import { Client, Events } from 'discord.js';
import { loadCommands } from '@/utils/loadCommands';
import { IntentOptions } from '@/config/IntentOptions';
import { registerSlashCommands } from './utils/registerSlashCommands';

void (async () => {
  console.log('Starting spambot...');

  const Bot = new Client({
    intents: IntentOptions,
  });

  console.log('Loading commands...');
  const commandsLoaded = await loadCommands(Bot);

  if (commandsLoaded) {
    console.log('Commands loaded');
  } else {
    console.error('Commands could not be loaded!');
    process.exit(1);
  }

  const slashCommandsRegistered = await registerSlashCommands(Bot);

  if (slashCommandsRegistered) {
    console.log('Slash commands registered');
  } else {
    console.error('Slash commands could not be registered!');
    process.exit(1);
  }

  Bot.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user?.tag}`);
  });

  Bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction, Bot);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  });

  console.log('Logging in...');
  await Bot.login(process.env.TOKEN);
})();
