const sandboxModel = require("../models/sandbox")
const sipgate = require("../models/sipgate")
const errorhandler = require("../helpers/errorhandler")
const dateFormat = require('dateformat')

exports.get = (req, res) => {
    sipgate.getHistory(req.session.bearer).then((result) => {
        res.render('recordings', {
            recordings: result.items,
            pageClients: true,
            user:req.session.userdetails,
            formatDate: function() {
              return function (rawDate) {
                return dateFormat(Date.parse(rawDate), "dddd, mmmm dS, yyyy, h:MM:ss TT");
              }
            }
        })
    }).catch(errorhandler.api.bind(null, req, res))
 }
