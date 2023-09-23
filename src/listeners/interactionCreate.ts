import type { Bot } from '@/types/Bot';
import { type Interaction } from 'discord.js';

export const interactionCreate = async (Bot: Bot, interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = Bot.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(Bot, interaction);
  } catch (err) {
    console.error(err);

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
};
