const content = require('../content.json');

module.exports = (req,res)=>{
    res.render('administrationpage', { content });
}