const express = require('express');
const PORT = 5000;

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.set('view engine', 'pug');
app.set('views', './sayfalar');
app.use(express.static('public'));

const [getHome, postSorgu, getAdmin, postAdmin] = [
    require('./actions/getHome'), 
    require('./actions/postSorgu'), 
    require('./actions/getAdmin'), 
    require('./actions/postAdmin')
];

app.get('/', getHome);
app.post('/', postSorgu);
app.get('/administrationpage', getAdmin);
app.post('/administrationpage', postAdmin);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})




