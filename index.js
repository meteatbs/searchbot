require('dotenv').config();
const Telegraf=require('telegraf');



const bot=new Telegraf(process.env.TOKEN);




const startCommand=require('./src/commands/start');
startCommand(bot);


const imageHandler=require('./src/inlinehandlers/image');
imageHandler(bot);


const wikiHandler=require('./src/inlinehandlers/wiki');
wikiHandler(bot);

const startHandler=require('./src/inlinehandlers/start');
startHandler(bot);





exports.handler=(event,context,callback)=>{
    const tmp=JSON.parse(event.body);//get data passed to us
    bot.handleUpdate(tmp);//make Telegraf process that data
    return callback(null,{
        statusCode:200,
        body:'',
    });
};



// bot.launch();