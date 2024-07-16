const content = require('../data/sorguekrani.json');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

exports.get_adminhome = (req, res) => {
    res.render('admin/adminhome.pug', { active: "home" });
}

/***SORGU EKRANI********************************************************* */
exports.get_sorguekrani = (req, res) => {
    fs.readdir('public/bg', {}, (err, bgfiles) => {
        if (err) {
            res.render('admin/hata.pug',{error:err});   
        }else{
            fs.readdir('public/logo', {}, (err, logofiles) => {
                if (err){
                    res.render('admin/hata.pug',{error:err});                
                } else{
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
                res.render('admin/hata.pug',{error:err});
            } else {
                console.log('Sorguekranı veri dosyası kaydedildi.');
                res.redirect('/administrationpage');
            }
        });
    } catch (err) {
        res.render('admin/hata.pug',{error:err});
    }
}
/*********************************************************************** */

exports.get_sonucekrani = (req, res) => {
    res.render('admin/sonucekrani.pug', { active: "sonucekrani" });
}

exports.get_logo = (req, res) => {
    fs.readdir('public/logo', {}, (err, files) => {
        if (err) {
            res.render('admin/hata.pug',{error:err});
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
            res.render('admin/hata.pug',{error:err});
        }else{
            res.redirect("/administrationpage/logo");
        }
    })
}

exports.get_arkaplan = (req, res) => {
    fs.readdir('public/bg', {}, (err, files) => {
        if (err) {
            res.render('admin/hata.pug',{error:err});
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
            res.render('admin/hata.pug',{error:err});
        } else {
            res.redirect("/administrationpage/arkaplan");
        }
    })

}

exports.get_liste = (req, res) => {
    res.render('admin/liste.pug', { active: "liste" });
}
exports.post_liste = (req, res) => {
    res.redirect("/administrationpage/liste");
}
