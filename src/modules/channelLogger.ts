import { Bot } from '@/types/Bot';
import { type BaseGuildTextChannel, EmbedBuilder } from 'discord.js';

export const channelLogger = async (
  Bot: Bot,
  guildId: string,
  message: string,
) => {
  const logChannelId = await Bot.db.config
    .findUnique({
      where: { guildId: guildId },
    })
    .then((config) => config?.logChannelId);

  if (!logChannelId) {
    console.log(`Log channel not set for guildId: ${guildId}`);
    return;
  }

  const logChannel = (await Bot.channels.fetch(
    logChannelId,
  )) as BaseGuildTextChannel;

  if (!logChannel) {
    console.log(
      `Log channel canot be fetched for guildId: ${guildId}, name: ${await Bot.guilds
        .fetch(guildId)
        .then((guild) => guild.name)}`,
    );
    return false;
  }

  try {
    const embed = new EmbedBuilder()
      .setColor('#7FFF00')
      .setTitle('Bot Log')
      .setDescription(message)
      .setTimestamp();
    await logChannel.send({ embeds: [embed] });
    return true;
  } catch (err) {
    console.error(`Channel logger error: ${err}`);
    return false;
  }
};
