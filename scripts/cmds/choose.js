module.exports = {
  config: {
    name: "choose",
    version: "1.0",
    author: "Løü Fï",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "the bot chooses"
    },
    longDescription: {
      vi: "",
      en: "it helps you choose"
    },
    category: "games",
    guide: {
      vi: "",
      en: "choose | Lord"
    }
  },

 langs: {
    vi: {
      hello: ""
    },
    en: {
      many: "at least two options"
    }
  },

 onStart: async function ({ message, args, getLang })  { 
 const options = args.join(" ").split("|"); 
 if (options.length < 2) return message.reply(getLang("many")); 

 const index = options[Math.floor(Math.random()*options.length)]; 
 message.reply(`⇒ ${options[index]?.trim() || "┐(￣ヘ￣)┌"}`); 
   }
    }