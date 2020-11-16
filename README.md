

[![Bot API Version](https://img.shields.io/badge/Bot%20API-v4.8-f36caf.svg?style=flat-square)](https://core.telegram.org/bots/api)
[![NPM Version](https://img.shields.io/npm/v/telegraf.svg?style=flat-square)](https://www.npmjs.com/)
[![node](https://img.shields.io/node/v/telegraf.svg?style=flat-square)](https://www.npmjs.com/package/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# [Telegram Support Bot](https://github.com/bostrot/telegram-support-bot)
is a support bot for telegram bots, using the Telegraf framework (by [@dotcypress](https://github.com/dotcypress)). It lets users create tickets which will be send to a staff group and can be answered by a reply.

<table>
<tr>
<th><img src="https://i.imgur.com/du5KZ1C.jpg" /></th>
<th><img src="https://i.imgur.com/N2002b0.jpg" /></th>
</tr>
</table>

## Documentation

`telegram-support-bot` was built on top of [`Telegraf`](https://github.com/telegraf/telegraf) libary.

[Telegraf documentation](http://telegraf.js.org).

## Installation

Setup a heroku account. Do configuration as described in the next step. Then set your webhok:

    https://api.telegram.org/bot{my_bot_token}/setWebhook?url=https://{my_heroku_app_name}.herokuapp.com/{my_bot_token}

Push it to your heroku branch.

## Configuration

You can get your ID with /id. The first number will be yours the second the one from the group you are in (if you are in one; including the minus).

You need to set your bot token and chat ids in `config.js`:

```js
module.exports = {
    bot_token: "YOUR_BOT_TOKEN", // support bot token
    staffchat_id: "SUPERGROUP_CHAT_ID",  // telegram staff group chat id eg. -123456789
    owner_id: "YOUR_TELEGRAM_ID",
    startCommandText: "Welcome in our support chat! Ask your question here.",
    faqCommandText: "Check out our FAQ here: Address to your FAQ",
};
```

## Features

When a user sends a message to the support chat it will create a ticket which will be forwarded to the staff group. Any admin in the staff group may answer that ticket by just replying to it. Salutation is added automatically. Photos will be forwared too.

Currently the support chat offers these commands (staff commands):
* `/open` - lists all open tickets (messages where noone has replied yet)
* `/close` - close a ticket manually (in case someone writes 'thank you')
* `/id` - returns your telegram id and the group chat id (1234567 -1234567890)
* `/ban` - ban a person from writing to your chat

User commands:
* `/start` - tells the user how to use this bot
* `/help` - an overview over the commands or some explanation for the user
* `/faq` - shows the FAQ

Features:
* File forwarding from and to user
* Database for handling open and closed tickets
* Restrict users
* Simple anti spam system

## Docker

via docker-compose:
```
docker-compose up -d
```

or build:

```
docker build -t bostrot/telegram-support-bot .
docker run bostrot/telegram-support-bot -v /path/to/config_dir:/telegram-support-bot/config
```

## Update to v1.0.1

Backup and delete the database file (src/support.db) and move config.js to folder config. Then just start it normally.

## Telegram token

To use the [Telegram Bot API](https://core.telegram.org/bots/api), 
you first have to [get a bot account](https://core.telegram.org/bots) 
by [chatting with BotFather](https://core.telegram.org/bots#6-botfather).

BotFather will give you a *token*, something like `123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ`.

## Creating a bot

[Telegraf bot framework](https://github.com/telegraf/telegraf) for building a bot


## Help

Also you can write to my own support bot: @bostrot_bot

You are welcome to contribute with pull requests, bug reports, ideas and donations. Join the forum if you have any general purpose questions: [bostrot.com](https://www.bostrot.com)

Hit me up for a custom hosting solution or other help on Telegram [@bostrot_bot](http://t.me/bostrot_bot)
