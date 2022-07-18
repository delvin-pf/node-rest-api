import express from 'express';
import routes from './routes.js';
import handleRoutesError from './app/middelwares/handleRoutesError.js'

class App {
  constructor() {
    this.server = express();
    this.midleware();
    this.routes();
    this.handleError()
  }

  midleware() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  handleError() {
    this.server.use(handleRoutesError)
    this.server.use( (error, req, res) => {
      console.log(typeof error)
    })
  }

}

export default new App().server;