const { resolve } = require("path");
const axios = require("axios");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const JavaScriptObfuscator = require("javascript-obfuscator");
const { PasteClient } = require("pastebin-api");

module.exports = {
  config: {
    name: "enc",
    aliases: ["encode", "encrypt", "obf", "obfuscate"],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: "Encrypt javascript from directory Files",
    longDescription: "",
    category: "owner",
    guide: {
      vi: "{pn} <filename>",
      en: "{pn} <filename>",
    },
  },
  onStart: async function ({ api, event, args, messageReply, type }) {
    const permission = global.GoatBot.config.GOD;
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only My Authors Have Access.", event.threadID, event.messageID);
    return;
  }

    const { senderID, threadID, messageID } = event;

    var name = args[0];
    var text = "";

    if (type == "message_reply") {
      text = messageReply.body;
    }

    if (!text && !name) {
      api.sendMessage(
        "Please reply to the link you want to apply the code to or write the file name to upload the code to pastebin!",
        threadID,
        messageID
      );
      return;
    }

    if (!text && name) {
      var data = fs.readFileSync(resolve(__dirname, `${args[0]}.js`), "utf-8");

      const client = new PasteClient("aeGtA7rxefvTnR3AKmYwG-jxMo598whT");

      async function pastepin(name, code) {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
          compact: false,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          stringArrayShuffle: true,
          splitStrings: true,
          stringArrayThreshold: 1,
        });

        const obfuscatedCode = obfuscationResult.getObfuscatedCode();

        const url = await client.createPaste({
          code: obfuscatedCode,
          expireDate: "N",
          format: "javascript",
          name: name,
          publicity: 1,
        });

        var id = url.split("/")[3];
        return "https://pastebin.com/raw/" + id;
      }

      var link = await pastepin(args[1] || "noname", data);
      return api.sendMessage(link, threadID, messageID);
    }

    var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    var url = text.match(urlR);

    if (url[0].indexOf("pastebin") !== -1) {
      axios.get(url[0]).then(async (i) => {
        var data = i.data;
        fs.writeFileSync(resolve(__dirname, `${args[0]}.js`), data, "utf-8");
        api.sendMessage(
          `Code applied ${args[0]}.js, use command load to use!`,
          threadID,
          messageID
        );
      });
    }

    if (
      url[0].indexOf("buildtool") !== -1 ||
      url[0].indexOf("tinyurl.com") !== -1
    ) {
      const options = {
        method: "GET",
        url: messageReply.body,
      };
      request(options, function (error, response, body) {
        if (error)
          return api.sendMessage(
            "Please only reply to the link (contains nothing but links)",
            threadID,
            messageID
          );
        const load = cheerio.load(body);
        const code = load(".language-js").first().text();
        if (!code)
          return api.sendMessage(
            "Could not find any JavaScript code in the link",
            threadID,
            messageID
          );
        fs.writeFileSync(
          resolve(__dirname, `${args[0]}.js`),
          code,
          "utf-8"
        );
        return api.sendMessage(
          `Added this code "${args[0]}.js", use command load to use!`,
          threadID,
          messageID
        );
      });
      return;
    }

    if (url[0].indexOf("drive.google") !== -1) {
      var id = url[0].match(/[-\w]{25,}/);
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(
          `https://drive.google.com/u/0/uc?id=${id}&export=download`,
          path
        );
        return api.sendMessage(
          `Added this code "${args[0]}.js". If an error occurs, change the drive file to txt!`,
          threadID,
          messageID
        );
      } catch (e) {
        return api.sendMessage(
          `An error occurred while applying the new code to "${args[0]}.js".`,
          threadID,
          messageID
        );
      }
    }
  },
};