import { Bot } from '@/types/Bot';

export const randomPhrase = async (Bot: Bot, guildId: string) => {
  const systemMessage =
    'Immediately return a 30 words nonsensical sentence only. Maximum reddit cringe.';

  const model = 'gpt-3.5-turbo';

  const freqPenalty = 0.25;
  const presencePenalty = 0.16;
  const maxLength = 100;
  const topP = 1;
  const temp = 1;

  if (!Bot.ai) {
    console.error('AI not initialized!');
    return;
  }

  try {
    const completion = await Bot.ai.chat.completions.create({
      messages: [{ role: 'system', content: systemMessage }],
      model: model,
      max_tokens: maxLength,
      temperature: temp,
      top_p: topP,
      frequency_penalty: freqPenalty,
      presence_penalty: presencePenalty,
    });

    const result = completion.choices[0].message.content;
    const InputTokenUsage = completion.usage?.prompt_tokens || 0;
    const OutputTokenUsage = completion.usage?.completion_tokens || 0;
    const cost =
      InputTokenUsage * (0.0015 / 1000) + OutputTokenUsage * (0.002 / 1000);

    const guild = await Bot.guilds.fetch(guildId);

    const dbGuild = await Bot.db.guild.upsert({
      create: {
        id: guild.id,
        name: guild.name,
        timers: {},
        aiUsage: { create: { usd: cost } },
      },
      update: {
        aiUsage: { update: { usd: { increment: cost } } },
      },
      where: {
        id: guild.id,
      },
    });

    console.log(dbGuild);

    return result;
  } catch (err) {
    console.error(`AI completion error: ${err}`);
    return false;
  }
};
