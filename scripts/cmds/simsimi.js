const axios = require("axios");

module.exports = {
 config: {
 name: 'simsimi',
 version: '1.2',
 author: 'NIB | JARiF',
 countDown: 5,
 role: 0,
 shortDescription: 'Sakura Ai',
 longDescription: {
 vi: 'Chat với sakura ♡',
 en: 'Chat with sakura ♡'
 },
 category: 'Ai',
 guide: {
 vi: ' {pn} [on | off]: bật/tắt sakura ♡'
 + '\'\n'
 + '\ {pn} <word>: chat nhanh với sakura ♡'
 + '\ Ví dụ:\ {pn} hi',
 en: ' {pn} <word>: chat with sakura ♡'
 + '\ Example:\ {pn} hi'
 }
 },
 langs: {
 vi: {
 turnedOn: 'Bật simsimi thành công!',
 turnedOff: 'Tắt simsimi thành công!',
 chatting: 'Đang chat với simsimi...',
 error: 'Simsimi đang bận, bạn hãy thử lại sau'
 },
 en: {
 turnedOn: 'Turned on sakura ♡ successfully!',
 turnedOff: 'Turned off sakura ♡ successfully!',
 chatting: 'Already Chatting with sakura ♡...',
 error: 'What?🙂'
 }
 },
 onStart: async function ({ args, threadsData, message, event, getLang }) {
 if (args[0] == 'on' || args[0] == 'off') {
 await threadsData.set(event.threadID, args[0] == "on", "settings.simsimi");
 return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
 } else if (args[0]) {
 const yourMessage = args.join(" ");
 try {
 const responseMessage = await getMessage(yourMessage);
 return message.reply(`${responseMessage}`);
 } catch (err) {
 console.log(err);
 return message.reply(getLang("error"));
 }
 }
 },
 onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
 if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.simsimi"))) {
 try {
 const langCode = (await threadsData.get(event.threadID, "settings.lang")) || global.GoatBot.config.language;
 const responseMessage = await getMessage(args.join(" "), langCode);
 return message.reply(`${responseMessage}`);
 } catch (err) {
 return message.reply(getLang("error"));
 }
 }
 }
};

async function getMessage(yourMessage, langCode) {
 const res = await axios.post(
 'https://api.simsimi.vn/v1/simtalk',
 new URLSearchParams({
 'text': yourMessage,
 'lc': langCode || 'en'
 })
 );

 if (res.status > 200) {
 throw new Error(res.data.success);
 }

 return res.data.message;
 }