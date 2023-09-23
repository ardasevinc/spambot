import { clientReady } from '@/listeners/clientReady';
import { interactionCreate } from '@/listeners/interactionCreate';
import { Bot } from '@/types/Bot';
import { Events } from 'discord.js';
export const attachListeners = async (Bot: Bot) => {
  try {
    Bot.on(Events.InteractionCreate, async (interaction) => {
      await interactionCreate(Bot, interaction);
    });

    Bot.once(Events.ClientReady, async () => {
      await clientReady(Bot);
    });
    return true;
  } catch (err) {
    console.error(`Event handler error: ${err}`);
    return false;
  }
};
