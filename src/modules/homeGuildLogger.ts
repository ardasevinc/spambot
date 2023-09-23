import { Bot } from '@/types/Bot';
import { type BaseGuildTextChannel } from 'discord.js';

export const homeGuildLogger = async (Bot: Bot, message: string) => {
  const logChannelId = Bot.env.HOME_GUILD_CHANNEL_ID;

  if (!logChannelId) {
    console.log('Home Guild log channel not set');
    return;
  }

  const logChannel = (await Bot.channels.fetch(
    logChannelId,
  )) as BaseGuildTextChannel;

  if (!logChannel) {
    console.log('Home Guild log channel canot be fetched');
    return false;
  }

  try {
    await logChannel.send(message);
    return true;
  } catch (err) {
    console.error(`Home Guild channel logger error: ${err}`);
    return false;
  }
};
