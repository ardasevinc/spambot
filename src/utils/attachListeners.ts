import { interactionCreate } from '@/listeners/interactionCreate';
import { Bot } from '@/types/Bot';
import { Events } from 'discord.js';
export const attachListeners = (Bot: Bot) => {
  Bot.on(Events.InteractionCreate, async (interaction) => {
    await interactionCreate(Bot, interaction);
  });
};
