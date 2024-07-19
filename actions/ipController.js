module.exports = (req, res, next) => {
    const clientIp = req.connection.remoteAddress;  
    if (clientIp === '::1' || clientIp === '127.0.0.1' || clientIp === '::ffff:127.0.0.1') {
      next();
    } else {
      res.render('hata.pug',{error:"İzinsiz giriş talebi : Erişiminiz engellendi."});
    }
  };