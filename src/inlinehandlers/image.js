const axios=require('axios');

const apikey=process.env.PIXABAYAPI;

module.exports=(bot)=>{

    bot.inlineQuery(/p\s.+/,async ctx=>{
    
        let input =ctx.inlineQuery.query.split(' ');//["p","iphone","8"]
    
        input.shift();//["iphone","8"]
    
        let query=input.join(' ');//"iphone 8"
        let res=await  axios.get(`https://pixabay.com/api/?key=${apikey}&q=${query}`);
    
        // console.log(res.data.hits);
    
        let data=res.data.hits;
        console.log(data);
    
    
        let results= data.map((item,index)=>{
            return {
                type:'photo',
                id: String(index),
                photo_url: item.webformatURL,
                thumb_url: item.previewURL,
                photo_width:300,
                photo_height:200,
                caption:`[Source] (${item.webformatURL}) \n[Large Image]:(${item.largeImageURL}) `,
                parse_mode:'Markdown'
            }
        })
    
        ctx.answerInlineQuery(results)
    
    
        //bot.telegram.answerInlineQuery(inlineQuery,results,[extra])
        
        
    });
}

