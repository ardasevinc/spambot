import type { PrismaClient } from '@prisma/client';
import type { Client } from 'discord.js';
import type { CommandCollection } from './Command';

export interface Bot extends Client {
  commands: CommandCollection;
  env: Record<string, string>;
  db: PrismaClient;
}
