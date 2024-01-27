const fs = require('fs');//please add music or video and move that all file inside scripts/cmdsnonprefix and replace that music name in the code or vdo if you want toset vdo just replace .mp3 with .mp4

module.exports = {
  config: {
    name: "audio",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "ara":
          message.reply({
            body: "「 Ara Ara 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/ara.mp3"),
          });
          await api.setMessageReaction("😜", event.messageID, event.threadID, api);
        break;
case "yemete":
          message.reply({
            body: "「 Yemete kudasai💋😛 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/yemete.mp3"),
          });
          await api.setMessageReaction("😛", event.messageID, event.threadID, api);
   case "machikney":
          message.reply({
            body: "「 Machikney 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/machikney.mp3"),
          });
          await api.setMessageReaction("🤨", event.messageID, event.threadID, api);
case "haha":
          message.reply({
            body: "「 Na Has Hai muji 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/haha.mp3"),
          });
          await api.setMessageReaction("😒", event.messageID, event.threadID, api);
  case "lado":
          message.reply({
            body: "「 LADO KHA 」",
            attachment: fs.createReadStream("scripts/cmds/noprefix/lado.mp3"),
          });
          await api.setMessageReaction("😡", event.messageID, event.threadID, api);
   default:
          return;
      }
    }
  }
};