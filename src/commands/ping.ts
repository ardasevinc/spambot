import { SlashCommandBuilder } from 'discord.js';

export const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDMPermission(false)
    .setDescription('ping command'),
  execute: async (interaction) => {
    await interaction.reply('pingity pongity');
  },
};
