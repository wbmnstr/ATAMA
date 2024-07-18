const fs = require('fs');

function sorguEkraniData() {
    const contentPath = './data/sorguekrani.json';
    let content = [];
    if (fs.existsSync(contentPath, 'utf-8')) {
        const data = fs.readFileSync(contentPath, 'utf8');
        return JSON.parse(data);
    } else {
        return {
            "author":"wbmnstr",
            "fontsize": "small",
            "fontcolor": "#333333",
            "mainhead": "ATAMA SONUÇLARI",
            "subhead": "2024 yılı Atama Sonuçları Sorgu Ekranı",
            "input1label": "Sicil",
            "input2label": "T.C. No",
            "submitlabel": "SORGULA",
            "shadow": "on",
            "backgroundSize": "auto",
            "backgroundPosition": "center",
            "backgroundImage": "bg.jpg",
            "logo": "logo.png",
            "karartma": "on",
            "formtema": "dark"
        };
    }
}

exports.home = (req, res) => {
    const content = sorguEkraniData();
    console.log(content);
    res.render('client/home', { content });
}

exports.sorgusonucu = (req, res) => {
    const { tc, sicil } = req.body;
    const content = sorguEkraniData();
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
            res.render('hata.pug', { error: "Veritabanı Görüntüleme Hatası!" });

        }
    } catch (err) {
        res.render('hata.pug', { error: err });
    }

}