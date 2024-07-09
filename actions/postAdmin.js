const fs = require('fs');
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();


const uploadDir = 'public/bg';
if (!fs.existsSync(uploadDir)){
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
      cb(new Error('<center>Sadece .jpg uzantılı resim dosyalarını yükleyebilirsiniz!<br><a href="/administrationpage">Önceki sayfaya</a> gidip tekrar deneyiniz...</center>'), false);
    }
  };

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

const uploadFile = (req, res) => {
    fs.writeFile('content.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('Dosya yazıldı');
    })

    console.log(req.file, req.body);
    console.log('File uploaded successfully');
    res.render('postAdministrationpage');

};

// Middleware işlemleri için route'u tanımlıyoruz
router.post('/administrationpage', upload.single('backgroundimage'), uploadFile);

module.exports = router;
