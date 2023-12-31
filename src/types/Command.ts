import type {
  ChatInputCommandInteraction,
  Collection,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import type { Bot } from './Bot';

export interface Command {
  data: SlashCommandBuilder;

  execute: (
    Bot: Bot,
    interaction: ChatInputCommandInteraction
  ) => Promise<void>;
}

export type CommandCollection = Collection<string, Command>;
