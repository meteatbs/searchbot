const axios=require('axios');
module.exports=(bot)=>{

    bot.inlineQuery(/w\s.+/,async ctx=>{
    
        let input =ctx.inlineQuery.query.split(' ');//["p","iphone","8"]
    
        input.shift();//["iphone","8"]
    
        let query=input.join(' ');//"iphone 8"
    
        
        let res=await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=50`);
    
        console.log(res.data);
    
        let data=res.data;
        let allTitles=data[1];
    
        let allLinks=data[3];
    
        if (allTitles==undefined) {
            return;
        }
    
    
        let results=allTitles.map((item,index)=>{
            return{
                type:'article',
                id:String(index),
                title:item,
                input_message_content:{
                    message_text:`${item}\n${allLinks[index]}`
                },
                description: allLinks[index],
                reply_markup:{
                    inline_keyboard:[
    
                        [
                            {text:`Share ${item}`,switch_inline_query: `${item}`}
                        ]
                    ]
                }
            }
        })
        ctx.answerInlineQuery(results);
        
    })
}
