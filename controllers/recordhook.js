const sipgate = require("../models/sipgate")
const config = require("../config")
const md5 = require("js-md5")

exports.post = (req, res) => {
    let callId = req.body.callId
    let hookEndpoint = req.protocol + '://' + req.get('host') + "/record/" + md5(config.push_salt+req.session.masterSipId)
    sipgate.startRecording(req.session.bearer, callId).catch(console.warn)
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response onAnswer="'+hookEndpoint+'" />')
}
