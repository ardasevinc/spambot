import type { PrismaClient } from '@prisma/client';
import type { Client } from 'discord.js';
import type { CommandCollection } from '@/types/Command';
import type { TimerCollection } from '@/types/Timer';
import type OpenAi from 'openai';

export interface Bot extends Client {
  commands: CommandCollection;
  env: Record<string, string>;
  timers: TimerCollection;
  ai?: OpenAi;
  db: PrismaClient;
}
