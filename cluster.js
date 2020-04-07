

class Cluster {

  constructor(server, num_cpus) {

    this.server = server;
    this.num_cpus = num_cpus;

  }

  start() {
    const cluster = require('cluster');
    if (cluster.isMaster) {
      // Fork workers. One per CPU for maximum effectiveness
      for (var i = 0; i < this.num_cpus; i++) {
        cluster.fork();
      }
    } else {
      this.server.app.listen(this.server.port, () => console.log(`Listening on port ${this.server.port}`));
    }
  }
}


module.exports = Cluster;