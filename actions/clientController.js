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
            "mainhead": "ATAMA SONUÇLARI",
            "subhead": "2024 yılı Atama Sonuçları Sorgu Ekranı",
            "input1label": "Sicil",
            "input2label": "T.C. No",
            "submitlabel": "SORGULA",
            "sonucmainhead":"ATAMA SONUCU",
            "sonucsubhead":"Yeni Yerinizde Başarılar dileriz.",
            "sonucaciklama":"1- başlama yapmak için vesaire vesaire evraklarınızı getiriniz.\r\n2- Direk atandığınız birimde başlama yapınız.\r\n3- bir haftya mesaiden sonra makama görüşe çıkın\r\nkoruma şubeden giriş kartınızı alın.\r\n4- kanti alışveriş için sosyal hizmetlerden hesap oluşturun",
            "sonucclosebtn":"Yeni Sorgu",
            "fontsize": "medium",
            "formtema": "light",
            "backgroundSize": "auto",
            "backgroundPosition": "center",
            "shadow": "on",
            "karartma": "on",
            "backgroundImage": "bg.jpg",
            "logo": "logo.png"
        };
    }
}

exports.home = (req, res) => {
    const content = sorguEkraniData();
    console.log(req.connection.remoteAddress);
    res.render('client/home', { content, ip : req.connection.remoteAddress });
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
            //const foundPersonel = liste.find(personel => personel[Object.keys(personel)[1]].toString() === sicil && personel[Object.keys(personel)[0]].toString() === tc);
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