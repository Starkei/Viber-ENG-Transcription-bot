require('dotenv').config();
const http = require('http');
const ViberBot = require('viber-bot').Bot;

const port = process.env.PORT || 8080;
const webhookUrl = process.env.WEBHOOK_URL;
const bot = new ViberBot({
    authToken: process.env.VIBER_BOT_TOKEN,
    name: "Eng Transcription",
	avatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftrojantimes.net%2F2138%2Fopinion%2Fyou-should-read-the-book-before-seeing-the-movie%2F&psig=AOvVaw3z_7tO8XMSfIQoB63SPgwu&ust=1589980527497000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDJ3ZaBwOkCFQAAAAAdAAAAABAD"
});

bot.onTextMessage(/!et:[A-Za-z`]+/i, (message, response) => {
    response.send(message); 
});

http.createServer(bot.middleware()).listen(port, () => {
    bot.setWebhook(webhookUrl).catch(err => console.log(err));
});

