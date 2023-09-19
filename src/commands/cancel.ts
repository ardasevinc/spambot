import { SlashCommandBuilder } from 'discord.js';
import { setInterval } from 'timers';

export const cancel = {
  data: new SlashCommandBuilder()
    .setName('cancel')
    .setDMPermission(false)
    .setDescription('cancel command'),
  execute: async (i, Bot) => {
    await i.deferReply();
    const channel = await Bot.channels.fetch(i.channelId);
    if (!Bot.timers?.has(i.channelId)) {
      await i.editReply('No timer to cancel!');
    } else {
      clearInterval(Bot.timers.get(i.channelId));
      Bot.timers.delete(i.channelId);
      await i.editReply('Timer cancelled.');
    }
  },
};
