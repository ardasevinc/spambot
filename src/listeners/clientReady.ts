import type { Bot } from '@/types/Bot';
import { homeGuildLogger } from '@/modules/homeGuildLogger';

export const clientReady = async (Bot: Bot) => {
  console.log(`Logged in as ${Bot.user?.tag}!`);
  await homeGuildLogger(Bot, 'Bot just logged in!');
};
