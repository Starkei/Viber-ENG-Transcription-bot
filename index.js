require("dotenv").config();

const express = require("express");
const ViberBot = require("viber-bot").Bot;
const TextMessage = require("viber-bot").Message.Text;
const app = express();

const port = process.env.PORT || 8080;
const webhookUrl = process.env.WEBHOOK_URL;

const bot = new ViberBot({
  authToken: process.env.VIBER_BOT_TOKEN,
  name: "Eng Transcription",
  avatar:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftrojantimes.net%2F2138%2Fopinion%2Fyou-should-read-the-book-before-seeing-the-movie%2F&psig=AOvVaw3z_7tO8XMSfIQoB63SPgwu&ust=1589980527497000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDJ3ZaBwOkCFQAAAAAdAAAAABAD",
});

const dict = [
  ["э,", "æ"],
  ["о,", 'ɔː'],
  ["б,", "ɒ"],
  ["у,", "ʊ"],
  ["ы,", "ə"],
  ["а,", "ɑː"],
  ["я,", 'ʌ'],
  ["и,", 'ɪ'],
  ["з,", "θ"],
  ["с,", "ð"],
  ["ш,", "ʃ"],
  ["ж,", "ʒ"],
  ["н,", "n̩"],
  ["дж,", "dʒ"],
  ["ой,", "ɔɪ"],
];
app.use("/viber/webhook", bot.middleware());

bot.onTextMessage(/!et:[А-Яа-яA-Za-z0-9'`,]+/i, (message, response) => {
  let toPhonetic = message.text.match(/!et:[А-Яа-яA-Za-z0-9'`,]+/i);
  let phonetic = [];
  for (let i = 0; i < toPhonetic.length; i++) {
    for (let j = 0; j < dict.length; j++) {
      toPhonetic[i] = toPhonetic[i].replace(dict[j][0], dict[j][1]);
    }
    toPhonetic[i] = "[" + toPhonetic[i] + "]";
  }
  let result = toPhonetic.toString().replace(/!et:/, "");
  response.send(new TextMessage(result));
});

app.listen(port, () => {
  console.log(`App is running ${port}`);
  bot.setWebhook(`${webhookUrl}/viber/webhook`).catch((err) => {
    console.log("try run server");
    console.error(err);
    process.exit(1);
  });
});
