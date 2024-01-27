const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const { image } = require('image-downloader');

module.exports = {
  config: {
    name: 'removebg',
    version: '2.0',
    author: 'kshitiz',
    countDown: 8,
    role: 0,
    category: 'fun',
    shortDescription: {
      en: 'remove bg of pic'
    },
    longDescription: {
      en: 'remove background of a picture'
    },
    guide: {
      en: '{pn} removebg on reply of img'
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      if (event.type !== "message_reply") {
        return api.sendMessage("🖼️ | You must reply to the photo you want to remove the background from.", event.threadID, event.messageID);
      }
      api.sendMessage("🖼️ | Removing the background from the provided picture. Please wait...", event.threadID, event.messageID);

      if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        return api.sendMessage("✅ | Background has been successfully removed.", event.threadID, event.messageID);
      }

      if (event.messageReply.attachments[0].type !== "photo") {
        return api.sendMessage("❌ | This media is not available", event.threadID, event.messageID);
      }

      const content = event.messageReply.attachments[0].url;
      const MtxApi = ["ToQX2FRYSXjWGSvmL5vNCzvT"]; 
      const inputPath = path.resolve(__dirname, 'cache', `photo.png`);

      await image({
        url: content,
        dest: inputPath
      });

      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

      axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': MtxApi[Math.floor(Math.random() * MtxApi.length)],
        },
        encoding: null
      })
        .then((response) => {
          if (response.status !== 200) {
            console.error('Error:', response.status, response.statusText);
            return;
          }

          fs.writeFileSync(inputPath, response.data);
          api.sendMessage({ attachment: fs.createReadStream(inputPath) }, event.threadID, () => fs.unlinkSync(inputPath));
        })
        .catch((error) => {
          console.error('Failed Removedbg command API', error);
        });
    } catch (e) {
      console.error(e);
      return api.sendMessage(`Error in the Removed Background command`, event.threadID, event.messageID);
    }
  }
};
