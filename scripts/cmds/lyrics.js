const axios = require('axios');

module.exports = {
  config: {
    name: "lyrics",
    aliases: ["lyrics"],
    version: "1.0",
    author: "otttinneeeey",
    countDown: 5,
    role: 0,
    shortDescription: "song lyrics",
    longDescription: "song lyrics",
    category: "media",
    guide: "{pn} "
  },

  onStart: async function ({ api, event, message, args }) {
        const lyricsFinder = require('lyrics-finder');
    var artists = args.join(" "), titles = args.join(" ");
    (async function(artist, title) {
        let lyrics = await lyricsFinder(artist, title) || "Not Found!";
        api.sendMessage(`${lyrics}`, event.threadID, event.messageID);
    })(artists, titles);
}
};