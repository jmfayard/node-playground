import os from "os";
import cluster from "cluster";

if (cluster.isMaster) {
    const cpuCont = os.cpus().length
    for (let i = 0; i < cpuCont; i++) {
        cluster.fork()
    }
} else {
    require('./server')
}
