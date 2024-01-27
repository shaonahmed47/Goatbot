const axios = require('axios');

module.exports = {
 config: {
 name: "imagine2",
 aliases: [],
 version: "3.0",
 author: "kshitiz",
 countDown: 0,
 role: 0,
 shortDescription: {
 en: 'Create AI Art from Text'
 },
 longDescription: {
 en: "Transform text into stunning AI-generated art using stable diffusion models."
 },
 category: "ai"
 },

 onStart: async function ({ message, args }) {
 const text = args.join(" ");
 if (!text) {
 return message.reply("Please provide a prompt along with a model number if desired.\n\nimagine {prompt}\nExample: imagine a beautiful girl\n\nimagine {prompt}:{model number}\nExample: imagine a beautiful girl:43\n\nSupported models:\n" +
 "0. Absolute Reality V16\n" +
 "1. Absolute Reality V181\n" +
 "2. Analog Diffusion 1.0\n" +
 "3. Anything V3.0 (Pruned)\n" +
 "4. Anything V4.5 (Pruned)\n" +
 "5. Anything V5 (PrtRE)\n" +
 "6. AOM3A3 Orange Mix\n" +
 "7. Children's Stories V13D\n" +
 "8. Children's Stories V1 Semi-Real\n" +
 "9. Children's Stories V1 Toon Anime\n" +
 "10. Cyberrealistic V33\n" +
 "11. Deliberate V2\n" +
 "12. Dreamlike Anime 1.0\n" +
 "13. Dreamlike Diffusion 1.0\n" +
 "14. Dreamlike Photoreal 2.0\n" +
 "15. Dreamshaper 6 (Baked VAE)\n" +
 "16. Dreamshaper 7\n" +
 "17. Dreamshaper 8\n" +
 "18. Edge of Realism Eor V20\n" +
 "19. Eimis Anime Diffusion V1\n" +
 "20. Elldreth's Vivid Mix\n" +
 "21. Epic Realism Natural Sin RC1VAE\n" +
 "22. I Can't Believe It's Not Photography Seco\n" +
 "23. Juggernaut Aftermath\n" +
 "24. Lyriel V16\n" +
 "25. Mechamix V10\n" +
 "26. Meinamix Meina V9\n" +
 "27. Meinamix Meina V11\n" +
 "28. Open Journey V4\n" +
 "29. Portrait Plus V1.0\n" +
 "30. Realistic Vision V1.4 (Pruned, FP16)\n" +
 "31. Realistic Vision V2.0\n" +
 "32. Realistic Vision V4.0\n" +
 "33. Realistic Vision V5.0\n" +
 "34. Redshift Diffusion V10\n" +
 "35. Rev Animated V122\n" +
 "36. Run DiffusionFX 25D V10\n" +
 "37. Run DiffusionFX V10\n" +
 "38. SD V1.4\n" +
 "39. V1.5 (Pruned, Emaonly)\n" +
 "40. Shonin's Beautiful V10\n" +
 "41. The Ally's Mix II (Churned)\n" +
 "42. Timeless 1.0\n" +
 "43. ToonYou Beta 6"
 );
 }

 let prompt, model;
 if (text.includes(":")) {
 const [promptText, modelText] = text.split(":").map((str) => str.trim());
 prompt = promptText;
 model = modelText;

 if (isNaN(model) || model < 0 || model > 43) {
 return message.reply("❗ Invalid model number. Please specify a model number between 0 and 43.");
 }
 } else {
 prompt = text;
 model = "0";
 }

 try {
 message.reply("✅ Processing your prompt. Please wait...");
 const API = `https://aliestercrowley.com/api/crowgen.php?model=${model}&prompt=${encodeURIComponent(prompt)}`;
 const responsePromise = axios.get(API, { responseType: "arraybuffer" });

 const timeoutPromise = new Promise((_, reject) => {
 setTimeout(() => {
 reject(new Error("Timeout: Processing took longer than 20 seconds."));
 }, 20000);
 });

 const response = await Promise.race([responsePromise, timeoutPromise]);

 if (response instanceof Error) {
 throw response;
 }

 const imageStream = await global.utils.getStreamFromURL(API);

 await message.reply({
 attachment: imageStream
 });
 } catch (error) {
 console.error(error);
 if (error.message === "Timeout: Processing took longer than 20 seconds.") {
 message.reply("❌ An error occurred while processing your prompt. Please try again later");
 } else {
 message.reply("❌ An error occurred while processing your prompt. Please try again later.");
 }
 }
 }
};

module.exports = {
 config: {
 name: "imagine2",
 aliases: [],
 version: "3.0",
 author: "kshitiz",
 countDown: 0,
 role: 0,
 shortDescription: {
 en: 'Create AI Art from Text'
 },
 longDescription: {
 en: "Transform text into stunning AI-generated art using stable diffusion models."
 },
 category: "ai"
 },

 onStart: async function ({ message, args }) {
 const text = args.join(" ");
 if (!text) {
 return message.reply("Please provide a prompt along with a model number if desired.\n\nimagine {prompt}\nExample: imagine a beautiful girl\n\nimagine {prompt}:{model number}\nExample: imagine a beautiful girl:43\n\nSupported models:\n" +
 "0. Absolute Reality V16\n" +
 "1. Absolute Reality V181\n" +
 "2. Analog Diffusion 1.0\n" +
 "3. Anything V3.0 (Pruned)\n" +
 "4. Anything V4.5 (Pruned)\n" +
 "5. Anything V5 (PrtRE)\n" +
 "6. AOM3A3 Orange Mix\n" +
 "7. Children's Stories V13D\n" +
 "8. Children's Stories V1 Semi-Real\n" +
 "9. Children's Stories V1 Toon Anime\n" +
 "10. Cyberrealistic V33\n" +
 "11. Deliberate V2\n" +
 "12. Dreamlike Anime 1.0\n" +
 "13. Dreamlike Diffusion 1.0\n" +
 "14. Dreamlike Photoreal 2.0\n" +
 "15. Dreamshaper 6 (Baked VAE)\n" +
 "16. Dreamshaper 7\n" +
 "17. Dreamshaper 8\n" +
 "18. Edge of Realism Eor V20\n" +
 "19. Eimis Anime Diffusion V1\n" +
 "20. Elldreth's Vivid Mix\n" +
 "21. Epic Realism Natural Sin RC1VAE\n" +
 "22. I Can't Believe It's Not Photography Seco\n" +
 "23. Juggernaut Aftermath\n" +
 "24. Lyriel V16\n" +
 "25. Mechamix V10\n" +
 "26. Meinamix Meina V9\n" +
 "27. Meinamix Meina V11\n" +
 "28. Open Journey V4\n" +
 "29. Portrait Plus V1.0\n" +
 "30. Realistic Vision V1.4 (Pruned, FP16)\n" +
 "31. Realistic Vision V2.0\n" +
 "32. Realistic Vision V4.0\n" +
 "33. Realistic Vision V5.0\n" +
 "34. Redshift Diffusion V10\n" +
 "35. Rev Animated V122\n" +
 "36. Run DiffusionFX 25D V10\n" +
 "37. Run DiffusionFX V10\n" +
 "38. SD V1.4\n" +
 "39. V1.5 (Pruned, Emaonly)\n" +
 "40. Shonin's Beautiful V10\n" +
 "41. The Ally's Mix II (Churned)\n" +
 "42. Timeless 1.0\n" +
 "43. ToonYou Beta 6"
 );
 }

 let prompt, model;
 if (text.includes(":")) {
 const [promptText, modelText] = text.split(":").map((str) => str.trim());
 prompt = promptText;
 model = modelText;

 if (isNaN(model) || model < 0 || model > 43) {
 return message.reply("❗ Invalid model number. Please specify a model number between 0 and 43.");
 }
 } else {
 prompt = text;
 model = "0";
 }

 try {
 message.reply("✅ Processing your prompt. Please wait...");
 const API = `https://aliestercrowley.com/api/crowgen.php?model=${model}&prompt=${encodeURIComponent(prompt)}`;
 const responsePromise = axios.get(API, { responseType: "arraybuffer" });

 const timeoutPromise = new Promise((_, reject) => {
 setTimeout(() => {
 reject(new Error("Timeout: Processing took longer than 20 seconds."));
 }, 20000);
 });

 const response = await Promise.race([responsePromise, timeoutPromise]);

 if (response instanceof Error) {
 throw response;
 }

 const imageStream = await global.utils.getStreamFromURL(API);

 await message.reply({
 attachment: imageStream
 });
 } catch (error) {
 console.error(error);
 if (error.message === "Timeout: Processing took longer than 20 seconds.") {
 message.reply("❌ An error occurred while processing your prompt. Please try again later");
 } else {
 message.reply("❌ An error occurred while processing your prompt. Please try again later.");
 }
 }
 }
};