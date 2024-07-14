const content = require('../data/sorguekrani.json');

exports.home = (req, res) => {
        console.log(content);
        res.render('client/home', { content });
    }

exports.sorgusonucu = (req, res)=>{
    res.render('client/sorgusonucu')
}