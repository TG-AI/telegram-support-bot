"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
const db = require("./db");
const cache_1 = require("./cache");
const config_1 = require("../config/config");
const { Extra } = require('telegraf');
/** Message template helper
 * @param {String} ticket
 * @param {Object} message
 * @param {Boolean} anon
 * @return {String} text
 */
function ticketMsg(ticket, message, anon = true) {
    let link = '';
    if (!anon) {
        link = `tg://user?id=${cache_1.default.ticketID}`;
    }
    return `${config_1.default.lang_ticket} ` +
        `#T${ticket.toString().padStart(6, '0')} ${config_1.default.lang_from} ` +
        `<a href="${link}">` +
        `${message.from.first_name}</a> ${config_1.default.lang_language}: ` +
        `${message.from.language_code}\n\n` +
        `${message.text}`;
}
/**
 * Ticket handling and spam protection.
 * @param {context} ctx Bot context.
 * @param {bot} bot Bot object.
 * @param {chat} chat Bot chat.
 */
function chat(ctx, bot, chat) {
    cache_1.default.ticketID = ctx.message.from.id;
    if (cache_1.default.ticketIDs[cache_1.default.ticketID] === undefined) {
        cache_1.default.ticketIDs.push(cache_1.default.ticketID);
    }
    cache_1.default.ticketStatus[cache_1.default.ticketID] = true;
    if (cache_1.default.ticketSent[cache_1.default.ticketID] === undefined) {
        // Get Ticket ID from DB
        // eslint-disable-next-line new-cap
        bot.telegram.sendMessage(chat.id, config_1.default.lang_contactMessage, Extra.HTML());
        // Get Ticket ID from DB
        db.check(chat.id, function (ticket) {
            bot.telegram.sendMessage(config_1.default.staffchat_id, ticketMsg(ticket.id, ctx.message), 
            // eslint-disable-next-line new-cap
            Extra.HTML());
            if (ctx.session.group !== undefined) {
                bot.telegram.sendMessage(ctx.session.group, ticketMsg(ticket.id, ctx.message), {
                    parse_mode: 'html',
                    reply_markup: {
                        html: '',
                        inline_keyboard: [
                            [
                                {
                                    'text': 'Reply in private',
                                    'callback_data': ticket.id.toString().padStart(6, '0')
                                }
                            ],
                        ],
                    },
                });
            }
        });
        // wait 5 minutes before this message appears again and do not
        // send notificatoin sounds in that time to avoid spam
        setTimeout(function () {
            cache_1.default.ticketSent[cache_1.default.ticketID] = undefined;
        }, config_1.default.spam_time);
        cache_1.default.ticketSent[cache_1.default.ticketID] = 0;
    }
    else if (cache_1.default.ticketSent[cache_1.default.ticketID] < 4) {
        cache_1.default.ticketSent[cache_1.default.ticketID]++;
        db.check(cache_1.default.ticketID, function (ticket) {
            bot.telegram.sendMessage(config_1.default.staffchat_id, ticketMsg(ticket.id, ctx.message), 
            // eslint-disable-next-line new-cap
            Extra.HTML());
            if (ctx.session.group !== undefined) {
                bot.telegram.sendMessage(ctx.session.group, ticketMsg(ticket.id, ctx.message), 
                // eslint-disable-next-line new-cap
                Extra.HTML());
            }
        });
    }
    else if (cache_1.default.ticketSent[cache_1.default.ticketID] === 4) {
        cache_1.default.ticketSent[cache_1.default.ticketID]++;
        // eslint-disable-next-line new-cap
        bot.telegram.sendMessage(chat.id, config_1.default.lang_blockedSpam, Extra.HTML());
    }
    db.check(cache_1.default.ticketID, function (ticket) {
        console.log(ticketMsg(ticket.id, ctx.message));
    });
}
exports.chat = chat;