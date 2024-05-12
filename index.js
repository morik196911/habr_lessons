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
bot.setMyCommands(helper.commands);
bot.on("polling_error",(err)=>{console.log(err.data.error.message)})

bot.on("text", async msg=>{
  try {
    if(msg.text.startsWith("/start")){
        await bot.sendMessage(msg.chat.id,"Вы запустили бота !!!");
      if(msg.text.length > 6){
        const ref_id = msg.text.slice(7);
        await bot.sendMessage(msg.chat.id,`Вы зашли по ссылке ${ref_id}`)
      }
       
    }else if(msg.text == "/ref"){
        await bot.sendMessage(msg.chat.id,`${process.env.URL_BOT}?start=${msg.from.id}`)
       
    }else{
        await bot.sendMessage(msg.chat.id,msg.text)
    }
  } catch (error) {
    console.log(error);
  }
})//on



