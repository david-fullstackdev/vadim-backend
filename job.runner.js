

const nodemiral = require('nodemiral')
const { spark } = require('./config');


class JobRunner {


    constructor(host, username, password, port) {
        this.session  = nodemiral.session(host, {username: username, password: password }, {ssh: {port: parseInt(port)}});
    }

    run_category_extract() {
        this.session.execute('spark-submit --master yarn --py-files tbd_etl-0.1-py3.5.egg main.py SHOW_TABLE /opt/hdfs/tbd_solutions/data/weekly_data_parquet', function(err, code, logs) {
            console.log(logs.stdout)
        })
    }

}





