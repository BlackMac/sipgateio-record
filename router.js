const clientController = require("./controllers/client"),
      loginController = require("./controllers/login"),
      staticController = require("./controllers/static"),
      dashboardController = require("./controllers/dashboard"),
      phoneController = require("./controllers/phone"),
      recordingsController = require("./controllers/recordings"),
      hooksController = require("./controllers/hooks"),
      statusController = require("./controllers/status"),
      numbersController = require("./controllers/numbers"),
      authMiddleware = require('./middleware/auth'),
      domainMiddleware = require('./middleware/domain'),
      recordhookController  = require("./controllers/recordhook")

module.exports = (app) => {
    app.get('/', authMiddleware, dashboardController.get)
    app.get('/recordings', authMiddleware, recordingsController.get)
    app.get('/hooks', authMiddleware, hooksController.get)
    app.get('/hooks/record/enable', authMiddleware, hooksController.enableRecord)
    app.get('/login', loginController.get)
    app.get('/login/oauth', loginController.authenticate)
    app.get('/static/:filename', staticController.get)
    app.post('/record/:token', recordhookController.post)
    app.get('/client/delete/:clientid', clientController.delete)
}
