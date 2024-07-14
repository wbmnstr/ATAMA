const content = require('../content.json');
const fs = require('fs');

exports.get_adminhome = (req,res)=>{
    res.render('admin/adminhome.pug', { active: "home" });
}


/***SORGU EKRANI********************************************************* */
exports.get_sorguekrani = (req,res)=>{

    const bg = {
        backgroundImage:'/bg/bg.jpg', 
        backgroundSize:'cover',
        backgroundPosition:'center',
    }
    fs.readdir('public/bg',{},(err, files)=>{
        if(err) throw err;
        res.render('admin/sorguekrani.pug', { active : "sorguekrani", content, files,  bg });
    })
}
exports.post_sorguekrani = (req,res)=>{
    fs.writeFile('data/sorguekrani.json', JSON.stringify(req.body), (err) => {
        if (err) {
            throw err;
        } else {            
            console.log(req.file, req.body);
            console.log('Dosya yazıldı');
            res.redirect('/administrationpage/sorguekrani?msg=ok');    
        }
    });    
}
/*********************************************************************** */



exports.get_sonucekrani = (req,res)=>{
    res.render('admin/sonucekrani.pug', { active : "sonucekrani" });
}

exports.get_logo = (req,res)=>{
    fs.readdir('public/logo',{},(err, files)=>{
        if(err) throw err;
        res.render('admin/logo.pug', { active : "logo", content, files });
    })
}

exports.get_arkaplan = (req,res)=>{
    fs.readdir('public/bg',{},(err, files)=>{
        if(err) throw err;
        res.render('admin/arkaplan.pug', { active : "arkaplan", files });
    })
}
exports.post_arkaplan = (res, req)=>{
    /**** */
    /**** */

    /**** */
    /**** */
}

exports.get_liste = (req,res)=>{
    res.render('admin/liste.pug', { active : "liste" });
}
