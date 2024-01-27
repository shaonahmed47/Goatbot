
const axios = require('axios');

module.exports = {
  config: {
    name: "fact",
    aliases: ["facts"],
    version: "1.0",
    author: "Samir",
    countDown: 30,
    role: 0,
    shortDescription: "Get Random Fact",
    longDescription: "Get Random Fact",
    category: "study",
    guide: "{p} fact"
  },

  onStart: async function ({ api, event, args }) {
    const res = await axios.get(`https://api.popcat.xyz/fact`);
var fact = res.data.fact;
return api.sendMessage(`Did you know? \${fact}`, event.threadID, event.messageID)
  }
};