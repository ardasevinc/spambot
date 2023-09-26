import { Command } from '@/types/Command';
import { randomPhrase } from '@/utils/randomPhrase';
import { TimerStatus } from '@prisma/client';
import { ChannelType, SlashCommandBuilder } from 'discord.js';
import { setInterval } from 'timers';

export const spam: Command = {
  data: new SlashCommandBuilder()
    .setName('spam')
    .setDescription('Set up, list, stop or remove a spam timer')
    .setDMPermission(false),

  execute: async (Bot, interaction) => {
    await interaction.deferReply();

    if (interaction.options.getSubcommand(false) === null) {
      if (!interaction.isChatInputCommand()) return;
      const channel = await Bot.channels.fetch(interaction.channelId);
      if (channel === null) return;
      if (
        !channel.isDMBased ||
        !channel.isTextBased ||
        channel.type !== ChannelType.GuildText
      )
        return;
      const msg =
        (await randomPhrase(Bot, channel.guildId)) || 'hello world lol';
      const nodeInterval = setInterval(async () => {
        await channel.send(msg);
      }, 500);

      Bot.timers.set(interaction.channelId, nodeInterval);
      await Bot.db.timer.upsert({
        create: {
          delay: 500,
          guild: {
            connectOrCreate: {
              create: { id: channel.guildId, name: channel.guild.name },
              where: { id: channel.guildId },
            },
          },
          channelId: channel.id,
          status: TimerStatus.RUNNING,
        },
        update: {},
        where: { channelId: channel.id },
      });
      await interaction.editReply('Spammer created!');
    }
  },
};
