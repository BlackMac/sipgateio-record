const sipgate = require("../models/sipgate")
const config = require("../config")
const errorhandler = require("../helpers/errorhandler")
const currencies = {
    "EUR": "€",
    "USD": "$",
    "GBP": "£"
}
const md5 = require("js-md5")

const products = {
    "team": "sipgate team",
    "basic": "sipgate basic",
    "simquadrat": "simquadrat"
}

exports.get = (req, res) => {
    Promise.all([
        sipgate.getBalance(req.session.bearer),
        sipgate.getUserInfo(req.session.bearer),
        sipgate.getWebhookUrls(req.session.bearer)])
        .then((data) => {
            let hookEndpoint = req.protocol + '://' + req.get('host') + "/record/" + md5(config.push_salt+req.session.masterSipId)
            let configMissing = (data[2].incomingUrl !=  hookEndpoint || data[2].outgoingUrl != hookEndpoint)
            res.render('dashboard', {
                currency: currencies[data[0].currency],
                amount: Math.round(data[0].amount/100)/100,
                masterSipId: data[1].masterSipId,
                webuser: data[1].sub,
                locale: data[1].locale,
                domain: data[1].domain,
                admin: data[1].isAdmin ? "yes" : "no",
                product: products[data[1].product],
                pageDashboard: true,
                configMissing: configMissing,
                user:req.session.userdetails
            })
    }).catch(errorhandler.api.bind(null, req, res))
}
