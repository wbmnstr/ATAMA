const express = require('express');
const PORT=5000;
const fs = require('fs');
const bodyParser = require('body-parser');
const content = require('./content.json');
const app = express();

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.set('view engine','pug');
app.set('views','./sayfalar');
app.use(express.static('public'));

app.get('/',(req, res)=>{
    console.log(content);
    res.render('index', { content });
});

app.get('/administrationpage',(req,res)=>{
    res.render('administrationpage', { content });
})
app.post('/administrationpage',(req,res)=>{    
        fs.writeFile('content.json', JSON.stringify(req.body), (err)=>{
            if(err) throw err;
            console.log('Dosya yazıldı');   
        })        
    
   console.log(req.body);
    res.render('postAdministrationpage');
})



app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})




