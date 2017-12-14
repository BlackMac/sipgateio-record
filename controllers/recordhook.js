const sipgate = require("../models/sipgate")

exports.post = (req, res) => {
    let callId = req.body.callId
    sipgate.startRecording(req.session.bearer, callId).catch(console.warn)
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>')
}
