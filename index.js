const TelegramBot = require("node-telegram-bot-api");
const dot = require("dotenv");
dot.config();
const helper = require("./helpers");
const bot = new TelegramBot(process.env.TOKEN,{
    polling:{
        interval:300,
        autoStart:true,
    }
})
bot.on("polling_error",(err)=>{console.log(err.data.error.message)})

bot.on("text", async msg=>{
    await bot.sendMessage(msg.chat.id, helper.debug(msg));
})



