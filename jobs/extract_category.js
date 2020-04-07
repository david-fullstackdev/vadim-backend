
const nodemiral = require('nodemiral')


class JobRunner {


    constructor(category, table, display_name, filter) {

    }

}


const session = nodemiral.session('lpwhp1', {username: 'hdpsolns', password: 'eaFX6V$qWb'});


session.execute('pwd', function(err, code, logs) {
    console.log(logs.stdout);
});



