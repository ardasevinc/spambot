import { Command } from '@/types/Command';
import { SlashCommandBuilder } from 'discord.js';
import { setInterval } from 'timers';

export const spam: Command = {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDMPermission(false)
    .setDescription('spam'),
  execute: async (Bot, interaction) => {
    await interaction.deferReply();

    const channel = await Bot.channels.fetch(interaction.channelId);
    const timer = setInterval(async () => {
      await channel.send('pongity pingity');
    }, 500);

    Bot.timers = Bot.timers ?? new Map();
    Bot.timers.set(interaction.channelId, timer);

    setTimeout(() => {
      clearInterval(timer);
    }, 15000);
  },
};
