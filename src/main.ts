import { Client, Events } from 'discord.js';
import { loadCommands } from '@/utils/loadCommands';
import { IntentOptions } from '@/config/IntentOptions';
import { registerSlashCommands } from './utils/registerSlashCommands';
import { initDb } from './utils/db/initDb';
import { Bot } from './types/Bot';
import { initEnv } from '@/utils/initEnv';
import { attachListeners } from './utils/attachListeners';

void (async () => {
  console.log('Starting spambot...');

  const Bot = new Client({
    intents: IntentOptions,
  }) as Bot;

  console.log('Init env...');
  const envInitialized = initEnv(Bot);
  if (envInitialized) {
    console.log('Env init success');
  } else {
    console.error('Env init failed!');
    process.exit(1);
  }

  console.log('Loading commands...');
  const commandsLoaded = await loadCommands(Bot);

  if (commandsLoaded) {
    console.log('Commands loaded');
  } else {
    console.error('Commands could not be loaded!');
    process.exit(1);
  }

  const slashCommandsRegistered = await registerSlashCommands(Bot);

  if (slashCommandsRegistered) {
    console.log('Slash commands registered');
  } else {
    console.error('Slash commands could not be registered!');
    process.exit(1);
  }

  console.log('Initializing database connection...');
  const dbInitialized = await initDb(Bot);
  if (dbInitialized) {
    console.log('DB init success');
  } else {
    console.error('DB init failed!');
    process.exit(1);
  }

  console.log('Loading events...');
  const eventsAttached = await attachListeners(Bot);
  if (eventsAttached) {
    console.log('Events loaded');
  } else {
    console.error('Events could not be loaded!');
    process.exit(1);
  }

  console.log('Logging in...');
  await Bot.login(process.env.TOKEN);
})();
