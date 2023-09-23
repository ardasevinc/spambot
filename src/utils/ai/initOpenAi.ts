import { Bot } from '@/types/Bot';
import OpenAi from 'openai';

export const initOpenAi = (Bot: Bot) => {
  try {
    const openai = new OpenAi({ apiKey: Bot.env.OPENAI_API_KEY });
    Bot.ai = openai;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
