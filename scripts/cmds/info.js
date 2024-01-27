const fs = require('fs');
const moment = require('moment-timezone');
const NepaliDate = require('nepali-date');
const fast = require('fast-speedtest-api');

module.exports = {
  config: {
    name: "info",
    aliases: ['info', 'owner'],
    version: "1.3",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message, api, event, usersData, threadsData }) {
    const allUsers = await usersData.getAll();
    const allThreads = await threadsData.getAll();
    const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
      });
    const result = await speedTest.getSpeed();
    const botName = global.GoatBot.config.nickNameBot;
    const botPrefix = global.GoatBot.config.prefix;
    const authorName = global.GoatBot.config.authorName;
    const authorFB = global.GoatBot.config.authorFB;
    const authorInsta = "https://www.instagram.com/xnil867";
    const authorEmail = global.GoatBot.config.authorEmail;
    const authorGithub = "https://github.com/X-nil143";
    const status = "𝙎𝙞𝙣𝙜𝙡𝙚";
    const timeStart = Date.now();

    const urls = JSON.parse(fs.readFileSync('scripts/cmds/xnil/info.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    // Get current date and time in Asia/Kathmandu timezone
    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    // Calculate bot uptime
    const uptime = process.uptime();
    const uptimeString = formatUptime(uptime);

    const ping = Date.now() - timeStart;

    const replyMessage = `===「 Bot & Owner Info 」===
❏ Bot Name: ${botName}
❏ Bot Prefix: ${botPrefix}
❏ Author Name: ${authorName}
❏ FB: ${authorFB}
❏ Instagram: ${authorInsta}
❏ Author Email: ${authorEmail}
❏ Author Github: ${authorGithub}
❏ Status: ${status}
❏ Date: ${date}
❏ Total Threads: ${allThreads.length}
❏ Total Users: ${allUsers.length}
❏ Time: ${time}
❏ Bot Running: ${uptimeString}
❏ Bot's Speed: ${result} MBPS
=====================`;

    const attachment = await global.utils.getStreamFromURL(link);
    message.reply({
      body: replyMessage,
      attachment
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      await this.onStart({ message });
    }
  }
};

function formatUptime(uptime) {
  const seconds = Math.floor(uptime % 60);
  const minutes = Math.floor((uptime / 60) % 60);
  const hours = Math.floor((uptime / (60 * 60)) % 24);
  const days = Math.floor(uptime / (60 * 60 * 24));

  const uptimeString = [];
  if (days > 0) uptimeString.push(`${days}d`);
  if (hours > 0) uptimeString.push(`${hours}h`);
  if (minutes > 0) uptimeString.push(`${minutes}min`);
  if (seconds > 0) uptimeString.push(`${seconds}sec`);

  return uptimeString.join(" ");
}
