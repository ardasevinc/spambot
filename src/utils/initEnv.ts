import { Bot } from '@/types/Bot';

export const initEnv = (Bot: Bot) => {
  Bot.env = {};

  if (!process.env.TOKEN) {
    console.error('TOKEN env variable is not set');
    return false;
  } else {
    Bot.env.TOKEN = process.env.TOKEN;
  }

  if (!process.env.CLIENT_ID) {
    console.error('CLIENT_ID env variable is not set');
    return false;
  } else {
    Bot.env.CLIENT_ID = process.env.CLIENT_ID;
  }

  if (!process.env.HOME_GUILD_ID) {
    console.error('HOME_GUILD_ID env variable is not set');
    return false;
  } else {
    Bot.env.HOME_GUILD_ID = process.env.HOME_GUILD_ID;
  }

  if (!process.env.NODE_ENV) {
    console.error('NODE_ENV env variable is not set');
    return false;
  }

  if (!process.env.BOT_OWNER_ID) {
    console.error('BOT_OWNER_ID env variable is not set');
    return false;
  } else {
    Bot.env.BOT_OWNER_ID = process.env.BOT_OWNER_ID;
  }

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL env variable is not set');
    return false;
  } else {
    Bot.env.DATABASE_URL = process.env.DATABASE_URL;
  }

  return true;
};
