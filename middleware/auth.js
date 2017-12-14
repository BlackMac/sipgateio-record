module.exports = (req, res, next) => {
  console.log(req.get)
    if (!req.session.bearer) {
        res.redirect(req.protocol + '://' + req.get('host') + '/login')
    } else {
        next()
    }
}
