

class Server {

  constructor(app, port) {
    this.app = app;
    this.port = port
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
  }
  
}



module.exports = Server;