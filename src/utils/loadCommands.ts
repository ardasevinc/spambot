import { Collection } from 'discord.js';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const loadCommands = async (Bot): Promise<boolean> => {
  try {
    const result = new Collection();
    const path = (...params) =>
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
      // console.log(mod[name]);
      result.set(name, mod[name]);
    }
    Bot.commands = result;
    console.log(result);
    return result.size > 0;
  } catch (err) {
    console.error('Slash commands could not be loaded: ', err);
    return false;
  }
};

export { loadCommands };
