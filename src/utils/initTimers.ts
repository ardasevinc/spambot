import { Bot } from '@/types/Bot';
import { Channel, Collection, GuildTextBasedChannel } from 'discord.js';
import { TimerStatus } from '@prisma/client';
import { randomPhrase } from './randomPhrase';

export const initTimers = async (Bot: Bot) => {
  try {
    Bot.timers = new Collection();

    const dbTimers = await Bot.db.timer.findMany();
    if (dbTimers.length === 0) return;

    const channelPromises = dbTimers.map((timer) => {
      return Bot.channels.fetch(timer.channelId);
    });

    const channelPromisesResults = await Promise.allSettled(channelPromises);

    const validChannelPromises = channelPromisesResults.filter(
      (result) => result.status === 'fulfilled'
    );

    const validChannels = validChannelPromises.map((result) => {
      if (result.status === 'fulfilled' && result.value !== null) {
        return result.value;
      }
      return null;
    }) as GuildTextBasedChannel[];

    type ValidTimer = (typeof dbTimers)[number] & {
      channel: GuildTextBasedChannel;
    };

    const validTimers = dbTimers.reduce((acc, timer) => {
      const channel = validChannels.find(
        (channel) => channel.id === timer.channelId
      );
      if (channel === undefined) return acc;
      acc.push({ ...timer, channel });
      return acc;
    }, [] as ValidTimer[]);

    validTimers.forEach(async (timer) => {
      if (timer.status === TimerStatus.STOPPED) return;

      const message = await randomPhrase(Bot, timer.guildId);

      console.log(`Starting timer ${timer.id}...`);

      const nodeInterval = setInterval(async () => {
        await timer.channel.send(message || 'hello world lol');
      }, timer.delay);

      Bot.timers.set(timer.channelId, nodeInterval);
    });
    return true;
  } catch (err) {
    console.error(`Error initializing timers: ${err}`);
    return false;
  }
};
