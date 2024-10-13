/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { DatabaseService } from 'src/database/database.service';
import { welcomeMessageMarkup } from './markups';

const token = process.env.TELEGRAM_TOKEN;

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;
  private logger = new Logger(BotService.name);

  constructor(private databaserService: DatabaseService) {
    this.bot = new TelegramBot(token, { polling: true });
    this.bot.on('message', this.handleRecievedMessages);
    this.bot.on('callback_query', this.handleButtonCommands);
  }

  handleRecievedMessages = async (msg: any) => {
    this.logger.debug(msg);
    try {
      await this.bot.sendChatAction(msg.chat.id, 'typing');
      if (msg.text === '/start') {
        const username = `${msg.from.username}`;

        const userExist = await this.databaserService.user.findFirst({
          where: { chatId: msg.chat.id },
        });
        if (userExist) {
          const welcome = await welcomeMessageMarkup(username);
          const replyMarkup = {
            inline_keyboard: welcome.keyboard,
          };

          await this.bot.sendMessage(msg.chat.id, welcome.message, {
            reply_markup: replyMarkup,
          });
        }

        await this.databaserService.user.create({
          data: { chatId: msg.chat.id, username },
        });
        const welcome = await welcomeMessageMarkup(username);
        const replyMarkup = {
          inline_keyboard: welcome.keyboard,
        };

        await this.bot.sendMessage(msg.chat.id, welcome.message, {
          reply_markup: replyMarkup,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleButtonCommands = async (query: any) => {
    this.logger.debug(query);
    let command: string;

    // function to check if query.data is a json type
    function isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    if (isJSON(query.data)) {
      command = JSON.parse(query.data).command;
    } else {
      command = query.data;
    }

    const chatId = query.message.chat.id;
    // const userId = query.from.id;

    try {
      switch (command) {
        case '/launch':
          await this.bot.sendChatAction(chatId, 'typing');
          return this.bot.sendMessage(chatId, 'web3 school', {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'launch App',
                    web_app: { url: `${process.env.APP_URL}` },
                  },
                ],
              ],
            },
          });

        default:
          await this.bot.sendChatAction(chatId, 'typing');
          return this.bot.sendMessage(chatId, 'Error processing your request');
      }
    } catch (error) {
      console.log(error);
    }
  };
}
