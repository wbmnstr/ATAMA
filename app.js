const express = require('express');
const PORT=5000;
const app = express();

app.set('view engine','pug');
app.set('views','./sayfalar');
app.use(express.static('public'));

app.get('/',(req, res)=>{
    res.render('index');
});

app.listen(PORT, ()=>{
    console.log(`System is running on http://localhost:${PORT}`);
})




