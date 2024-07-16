const content = require('../data/sorguekrani.json');
const fs = require('fs');


exports.home = (req, res) => {
    res.render('client/home', { content });
}

exports.sorgusonucu = (req, res) => {
    const { tc, sicil } = req.body;

    const filePath = 'data/personellistesi.json';
    let liste = [];
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            liste = JSON.parse(data);
            const foundPersonel = liste.find(personel => personel.sicil.toString() === sicil && personel.tc.toString() === tc);
            if (foundPersonel) {
                res.render('client/sorgusonucu', { content, foundPersonel: foundPersonel });
            } else {
                res.render('client/sorgusonucu', { content, foundPersonel: null });
            }
        } else {
            res.render('admin/hata.pug', { error: "Veritabanı Görüntüleme Hatası!" });

        }
    } catch (err) {
        res.render('admin/hata.pug', { error: err });
    }

}