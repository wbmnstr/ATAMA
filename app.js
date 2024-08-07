const express = require('express');
const PORT = 5000;

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.set('view engine', 'pug');
app.set('views', './sayfalar');
app.use(express.static('public'));

const adminRoutes = require('./routes/adminrouter');
const clientRoutes = require('./routes/clientrouter');

app.use('/administrationpage', adminRoutes);
app.use('/', clientRoutes);

app.use((err, req, res, next) => {
    if (err) {
      return res.send(err.message);
    }
    next();
  });








  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})




