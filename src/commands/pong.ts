import { SlashCommandBuilder } from 'discord.js';
import { setInterval } from 'timers';

export const pong = {
  data: new SlashCommandBuilder()
    .setName('pong')
    .setDMPermission(false)
    .setDescription('pong command'),
  execute: async (i, Bot) => {
    await i.reply('Ok... pinging...');

    const channel = await Bot.channels.fetch(i.channelId);
    const timer = setInterval(async () => {
      await channel.send('pongity pingity');
    }, 500);

    Bot.timers = Bot.timers ?? new Map();
    Bot.timers.set(i.channelId, timer);

    setTimeout(() => {
      clearInterval(timer);
    }, 15000);
  },
};
