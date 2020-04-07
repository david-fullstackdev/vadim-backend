
const pool = require('../../database/database').pool;
const sendmail = require('sendmail')();
const node_ssh = require('node-ssh');
const fs = require('fs-extra');
const request = require('request-promise');


class JobService {


    async imt_job(body) {

        // get parameters from message body
        const {upc_list, bu, job_id} = body;

        // construct upc string
        const upc_string = upc_list.split(" ").map( x => "'" + x + "'").join(",");

        const sas_schema = await pool.query("SELECT * FROM sas_schema WHERE bu=$1",[bu]);

        const {meta_library, fact_table, dma_table} = sas_schema.rows[0];
        const sas_template = require('./templates/power.sas')(meta_library, fact_table, dma_table, upc_string, job_id);
        const shell_template = require('./templates/power.sh')(job_id);
        const ssh = new node_ssh();

        await ssh.connect({host: 'lpscsasgsubp01.tbd.com', username: 'user.mueller', password: 'Vilenin1917_'});
        await fs.outputFile("tmp/"+job_id + "/extract.sas", sas_template);
        await fs.outputFile("tmp/"+job_id + "/extract.sh", shell_template);
        await ssh.putDirectory("tmp/"+job_id, '/sasfiles/aa/amueller/imt/'+job_id);
        await ssh.execCommand('sh imt/'+job_id+"/extract.sh", { cwd:'/sasfiles/aa/amueller' });

        request.get('http://lpwametld01:5000/imt/power/'+job_id)
            .then(function(data) {
                console.log(data)
            })
            .catch(function(err) {
                console.log(err)
            })

        return {"message": "job running!"}
    }
}

module.exports = JobService;




// const job_id = uuidv4().toString();
// const {upc_list, bu} = body;
// const temp_sas_file = "tmp/"+job_id+".sas";
// const session = nodemiral.session('lpscsasgsubp01.tbd.com', {username: 'user.mueller', password: 'Vilenin1917_'});
// const result = await this.get_sas_template("imt_power")
//
// const template = result.rows[0].template
//
// fs.outputFile(temp_sas_file, template) //write template out to disk
//     .then(this.copy_to_server(session, temp_sas_file, "/sasfiles/aa/amueller/imt/"+temp_sas_file))
//     .then(this.execute_on_server(session, "sh imt/power.sh"))



//const template = x.rows[0].template.replace("$$$", upc_list.split(" ").map( x => "'" + x + "'").join(","))
// sendmail({
//   from: 'imt@tbd.org',
//   to: body.email,
//   subject: 'In Market Testing',
//   html: 'Here are some In Market Testing Results'
// }, function (err, reply) {
//   console.log(err && err.stack)
//   console.dir(reply)
// })


// if(err) {
//     return console.log(err);
// }
//
// const session = nodemiral.session('lpscsasgsubp01.tbd.com', {username: 'user.mueller', password: 'Vilenin1917_'});
//
// session.copy('test.sas', '/sasfiles/aa/amueller/test.sas', {}, function() {
//     session.execute(this.imt_command, function(err, code, logs) {
//         console.log(logs.stdout);
//     });
// })
//
//
//







//
//
//
// constructor() {
//
//     this.profile = "/opt/lsf/lsf/conf/profile.lsf";
//     this.sas_exec = "/sasgrid/gsub_client/config/Lev1/Applications/SASGridManagerClientUtility/9.4/sasgsub";
//     this.sas_user = "user.mueller";
//     this.sas_server = "lpscsasgsubp01.tbd.com";
//     this.sas_key = "Vilenin1917_";
//     this.sas_password = "{SAS002}92A3D5351CE25634488A48B11E5E6C9D2BD87C7F";
// }
//
// compose_imt_command(script_location) {
//     return this.profile + '; ' + this.sas_exec + ' gridsubmitpgm ' + script_location + ' METAUSER ' +this.sas_user+ ' METAPASS ' + this.sas_password
// }
//
// imt_job(body) {
//
//     const job_id = uuidv4().toString();
//     const sas_file =  job_id +'.sas';
//     const session = nodemiral.session(this.sas_server, {username: this.sas_user, password: this.sas_key});
//
//     fs.writeFile(sas_file, imt_template.replace("$$$", body.upc_list.split(" ").map( x => "'" + x + "'").join(",")), function(err) {
//         session.copy(sas_file, '/sasfiles/aa/amueller/' + sas_file, {}, function() {
//
//         })
//
//
//
//     });
























