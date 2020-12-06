module.exports = {
  // bot settings
  bot_token: process.env.BOT_TOKEN, // support bot token
  staffchat_id: process.env.SUPERGROUP_ID, // eg. -123456789
  owner_id: process.env.OWNER_ID,
  spam_time: 5 * 60 * 1000, // time (in MS) in which user may send 5 messages
  port: process.env.PORT ||  3000,
  url: process.env.URL || 'https://{your_app_name}.herokuapp.com',

  // customize your language
  startCommandText: 'Welcome in our support chat! Ask your question here.',
  faqCommandText: 'Check out our FAQ here: <a href="http://linktoyourfaq">linktoyourfaq.com</a>',
  helpCommandText: '<b>Available commands:</b>\n/help\n/faq\n/id',
  lang_contactMessage:
    `Thank you for contacting us. We will answer as soon as possible.`,
  lang_blockedSpam:
    `You sent quite a number of questions in the last while.
    Please calm down and wait until staff reviews them.`,
  lang_ticket: 'Ticket',
  lang_acceptedBy: 'was accepted by',
  lang_dear: 'Dear',
  lang_regards: 'Best regards,',
  lang_from: 'from',
  lang_language: 'Language',
  lang_msg_sent: 'Message sent to user',
  lang_usr_with_ticket: 'User with ticket',
  lang_banned: 'banned',
};
