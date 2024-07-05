const content = require('../content.json');

module.exports = (req, res) => {
    console.log(content);
    res.render('index', { content });
}