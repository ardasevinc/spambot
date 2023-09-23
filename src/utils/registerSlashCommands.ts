import { Bot } from '@/types/Bot';
import { Command } from '@/types/Command';
import {
  Message,
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';

const registerSlashCommands = async (
  Bot: Bot,
  message?: Message,
): Promise<boolean> => {
  try {
    const rest = new REST({ version: '10' }).setToken(
      process.env.TOKEN as string,
    );

    const commandData: (
      | RESTPostAPIApplicationCommandsJSONBody
      | RESTPostAPIChatInputApplicationCommandsJSONBody
    )[] = [];

    Bot.commands.forEach(
      (value: Command, _key: string, _map: Map<string, Command>) => {
        // console.log(`data=${value.toString()}, key=${key}, map=${map}`);
        const data =
          value.data.toJSON() as RESTPostAPIApplicationCommandsJSONBody;
        data.options?.sort((a, b) => a.name.localeCompare(b.name));

        commandData.push(data);
      },
    );
    // Bot.contexts?.forEach((context) => commandData.push(context.data));
    if (process.env.NODE_ENV === 'production') {
      console.log('Registering commands globally...');
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID as string),
        {
          body: commandData,
        },
      );
      if (message) {
        await message.channel.send({
          content: 'Commands registered globally!',
        });
      }
    } else {
      console.log('Registering commands to home guild only');
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID as string,
          process.env.HOME_GUILD_ID as string,
        ),
        { body: commandData },
      );
      if (message) {
        await message.channel.send({
          content: `Commands registered to guild ${process.env.HOME_GUILD_ID}!`,
        });
      }
    }
    return true;
  } catch (err) {
    console.error('Slash commands coult not be registered: ', err);
    return false;
  }
};

export { registerSlashCommands };
