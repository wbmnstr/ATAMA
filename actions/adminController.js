const content = require('../data/sorguekrani.json');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');

exports.get_adminhome = (req, res) => {
    res.render('admin/adminhome.pug', { active: "home" });
}

/***SORGU EKRANI********************************************************* */
exports.get_sorguekrani = (req, res) => {
    fs.readdir('public/bg', {}, (err, bgfiles) => {
        if (err) {
            res.render('admin/hata.pug', { error: err });
        } else {
            fs.readdir('public/logo', {}, (err, logofiles) => {
                if (err) {
                    res.render('admin/hata.pug', { error: err });
                } else {
                    res.render('admin/sorguekrani.pug', { active: "sorguekrani", content, bgfiles, logofiles });
                }
            })
        }
    })
}
exports.post_sorguekrani = async (req, res) => {
    try {
        await fs.writeFile('./data/sorguekrani.json', JSON.stringify(req.body), (err) => {
            if (err) {
                res.render('admin/hata.pug', { error: err });
            } else {
                console.log('Sorguekranı veri dosyası kaydedildi.');
                res.redirect('/administrationpage');
            }
        });
    } catch (err) {
        res.render('admin/hata.pug', { error: err });
    }
}
/*********************************************************************** */

exports.get_sonucekrani = (req, res) => {
    res.render('admin/sonucekrani.pug', { active: "sonucekrani" });
}

exports.get_logo = (req, res) => {
    fs.readdir('public/logo', {}, (err, files) => {
        if (err) {
            res.render('admin/hata.pug', { error: err });
        } else {
            res.render('admin/logo.pug', { active: "logo", content, files });
        }
    })
}
exports.post_logo = (req, res) => {
    const uploadDir = 'public/logo';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            cb(null, 'logo.png');
        }
    });
    const fileFilter = (req, file, cb) => {
        const filetypes = /png$/;
        const mimetype = file.mimetype === 'image/png';
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('<center>Sadece .png uzantılı resim dosyalarını yükleyebilirsiniz!<br><a href="/administrationpage/logo">Önceki sayfaya</a> gidip tekrar deneyiniz...</center>'), false);
        }
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    }).single('logo');

    upload(req, res, (err) => {
        if (err) {
            res.render('admin/hata.pug', { error: err });
        } else {
            res.redirect("/administrationpage/logo");
        }
    })
}

exports.get_arkaplan = (req, res) => {
    fs.readdir('public/bg', {}, (err, files) => {
        if (err) {
            res.render('admin/hata.pug', { error: err });
        } else {
            res.render('admin/arkaplan.pug', { active: "arkaplan", files });
        }
    })
}
exports.post_arkaplan = (req, res) => {

    const uploadDir = 'public/bg';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            cb(null, 'bg.jpg');
        }
    });
    const fileFilter = (req, file, cb) => {
        const filetypes = /jpg$/;
        const mimetype = file.mimetype === 'image/jpeg';
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('<center>Sadece .jpg uzantılı resim dosyalarını yükleyebilirsiniz!<br><a href="/administrationpage/arkaplan">Önceki sayfaya</a> gidip tekrar deneyiniz...</center>'), false);
        }
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    }).single('backgroundImage');

    upload(req, res, (err) => {
        if (err) {
            res.render('admin/hata.pug', { error: err });
        } else {
            res.redirect("/administrationpage/arkaplan");
        }
    })

}





exports.get_liste = (req, res) => {
    const filePath = 'data/personellistesi.json';
    let liste = [];
    console.log(filePath);

    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            liste = JSON.parse(data);
        } else {
            console.log('personellistesi.json dosyası bulunamadı veya okunamadı.');
        }
    } catch (err) {
        res.render('admin/hata.pug', { error: err });        
    }
    
    res.render('admin/liste.pug', { active: "liste", liste });
}




exports.post_liste = (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'data/');
        },
        filename: function (req, file, cb) {
            cb(null, 'personellistesi.xlsx');
        }
    })
    const upload = multer({ storage }).single('personellistesi');
    upload(req, res, (err) => {
        if (err) {
            res.render('admin/hata.pug', { error: err });
        } else {
            try {
                const workbook = xlsx.readFile('data/personellistesi.xlsx');
                const sheet_name_list = workbook.SheetNames;
                const jsondata = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                fs.writeFileSync('data/personellistesi.json', JSON.stringify(jsondata, null, 2));
                console.log('dosya başarı ile yüklendi ve data dönüşümü tamamlandı.');
                res.redirect("/administrationpage");
            } catch (err) {
                res.render('admin/hata.pug', { error: err });
            }
        }
    })
}
