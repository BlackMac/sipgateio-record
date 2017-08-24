const clientController = require("./controllers/client"),
      loginController = require("./controllers/login"),
      staticController = require("./controllers/static"),
      dashboardController = require("./controllers/dashboard"),
      phoneController = require("./controllers/phone"),
      hooksController = require("./controllers/hooks"),
      numbersController = require("./controllers/numbers"),
      authMiddleware = require('./middleware/auth'),
      domainMiddleware = require('./middleware/domain')

module.exports = (app) => {
    app.get('/', authMiddleware, dashboardController.get)
    app.get('/clients', authMiddleware, clientController.get)
    app.get('/numbers', authMiddleware, numbersController.get)
    app.get('/hooks', authMiddleware, hooksController.get)
    app.get('/phone', authMiddleware, phoneController.get)
    app.get('/login', loginController.get)
    app.get('/login/oauth', loginController.authenticate)
    app.get('/static/:filename', staticController.get)
    app.post('/client/add', clientController.post)
    app.get('/client/delete/:clientid', clientController.delete)
}