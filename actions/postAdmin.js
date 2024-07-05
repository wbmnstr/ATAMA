const fs = require('fs');

module.exports = (req, res) => {
    fs.writeFile('content.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('Dosya yazıldı');
    })
    console.log(req.body);
    res.render('postAdministrationpage');
}