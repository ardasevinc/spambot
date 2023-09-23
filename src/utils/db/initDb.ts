import type { Bot } from '@/types/Bot';
import { PrismaClient } from '@prisma/client';

export const initDb = async (Bot: Bot) => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    Bot.db = prisma;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
