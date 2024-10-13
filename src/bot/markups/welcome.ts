export const welcomeMessageMarkup = async (userName: string) => {
  return {
    message: `Hi @${userName} 👋, Welcome to Web3school, your go-to bot for Learning the basics of blockchain.\n\n Shall we start? 👇`,
    keyboard: [
      [
        {
          text: 'Lets get started 🚀',
          callback_data: JSON.stringify({
            command: '/launch',
            language: 'english',
          }),
        },
      ],
    ],
  };
};
