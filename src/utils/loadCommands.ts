import type { Bot } from '@/types/Bot';
import type { CommandCollection } from '@/types/Command';
import { Collection } from 'discord.js';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const loadCommands = async (Bot: Bot): Promise<boolean> => {
  try {
    const result = new Collection() as CommandCollection;
    const path = (...params: string[]) =>
      join(
        process.cwd(),
        `${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}`,
        'commands',
        ...params,
      );
    const files = await readdir(path(), 'utf-8');
    for (const file of files) {
      const status = await stat(path(file));
      if (status.isDirectory()) {
        continue;
      }
      const name = file.split('.')[0];
      const mod = await import(path(name));
      result.set(name, mod[name]);
    }
    Bot.commands = result;
    return result.size > 0;
  } catch (err) {
    console.error('Slash commands could not be loaded: ', err);
    return false;
  }
  2;
};

export { loadCommands };
