module.exports={
    debug:(msg)=>{
        return JSON.stringify(msg,null,4);
    },
    commands: [
        {
            command: "start",
            description: "Запуск бота"  
        },
        {  
            command: "ref",
            description: "Получить реферальную ссылку"   
        },
        {  
            command: "help",
            description: "Раздел помощи"   
        },
        {
            command:"link",
            description:"Ссылки"
        },
        {
            command:"menu",
            description:"Меню "
        },
        {
            command:"second_menu",
            description:"Второе меню "
        }
    
    
    ]
}//module