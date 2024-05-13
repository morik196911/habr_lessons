const TelegramBot = require("node-telegram-bot-api");
const dot = require("dotenv");
dot.config();
const helper = require("./helpers");
const fs = require("fs");
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
        await bot.sendMessage(msg.chat.id,`Вы запустили бота !!!🤢`);
      if(msg.text.length > 6){
        const ref_id = msg.text.slice(7);
        await bot.sendMessage(msg.chat.id,`Вы зашли по ссылке ${ref_id}`)
      }
       
    }else if(msg.text == "/ref"){
        await bot.sendMessage(msg.chat.id,`${process.env.URL_BOT}?start=${msg.from.id}`)
       
    }else if(msg.text == "/help"){
     await  bot.sendMessage(msg.chat.id, "Раздел помощи\n <b>Fat</b>\n<i>Italik</i>",{
        parse_mode:"HTML"
       })
       await bot.sendMessage(msg.chat.id,"_Italik_\n*FatMurcdaun*",{
        parse_mode:"MarkdownV2"
       })
    }else if(msg.text == "/link"){
        await bot.sendMessage(msg.chat.id,`https://habr.com`,{
            disable_web_page_preview:true,
            disable_notification:true
        });
    }else if(msg.text == "/menu"){
      await bot.sendMessage(msg.chat.id,"Menu of the bot",{
      reply_markup:{
        keyboard:[
            ["🤔 Картинка","🤔 Видео"],
            ["👑 Аудио"," 👑 Голосовое сообщение"],
            ['⭐️ Контакт', '⭐️ Геолокация'],
                ['❌ Закрыть меню']
        ],
        resize_keyboard:true
      }
      })
    }else if(msg.text == "❌ Закрыть меню"){
    await bot.sendMessage(msg.chat.id,"Delete menu",{
        reply_markup:{
            remove_keyboard:true
        }
    })
    }else if(msg.text == "🤔 Картинка"){
     //await bot.sendPhoto(msg.chat.id,"./images/cat.jpg")
     //await bot.sendPhoto(msg.chat.id,process.env.URL_TO_IMG);
     //const image = fs.createReadStream("./images/cat.jpg")
     //await bot.sendPhoto(msg.chat.id,image);
        //Скидываем изображение с помощью буфера
    const imageBuffer = fs.readFileSync('./images/cat.jpg');
    await bot.sendPhoto(msg.chat.id, imageBuffer,{
       caption:"<b>☺️ Подпись к картинке</b>" ,
       parse_mode:"HTML"      
        })
    }else{
        await bot.sendMessage(msg.chat.id,msg.text) 
    }
  } catch (error) {
    console.log(error);
  }
})//on

bot.on("photo", async img=>{
  try{
    await bot.downloadFile(img.photo[img.photo.length-1].file_id, "./upload");
  }catch(error){
    console.log(error)
  }
})//on photo



