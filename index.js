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
   const msgWait =  await bot.sendMessage(msg.chat.id,"Бот генерирует ответ");
   setTimeout(async ()=>{
    await bot.deleteMessage(msg.chat.id, msgWait.message_id);
    await bot.sendMessage(msg.chat.id,msg.text + " addendum");
   },4000)
})//on



