

const pool = require('../../../database/database').pool;
const nodemiral = require('nodemiral');
const uuidv4 = require('uuid/v4');


class SASJob {

    constructor() {
        this.sas_host = 'lpscsasgsubp01.tbd.com'
        this.sas_user = "user.mueller"
        this.sas_password = "Vilenin1917_"
        this.sas_key = "{SAS002}92A3D5351CE25634488A48B11E5E6C9D2BD87C7F";
        this.sas_exe = "/sasgrid/gsub_client/config/Lev1/Applications/SASGridManagerClientUtility/9.4/sasgsub"
        this.profile = "/opt/lsf/lsf/conf/profile.lsf";
        this.session = nodemiral.session(this.sas_host, {username: this.sas_user, password: this.sas_password});
    }


    sas_generate_script(sas_template) {
        return pool.query("SELECT * FROM sas_templates")
    }


    sas_copy_script(loc1, loc2) {
        const session = this.session;
        return new Promise(function (resolve, reject) {
            session.copy(loc1, loc2, {}, function(err) {
                if(err) {
                    reject()
                }
                else {
                    resolve()
                }
            });
        })

    }

    sas_execute_script(script) {
        const session = this.session;
        const cmd = this.profile + '; ' + this.sas_exe + ' -gridsubmitpgm ' + script + ' -METAUSER ' + this.sas_user + ' -METAPASS ' + this.sas_key;
        console.log(cmd)
        return new Promise(function (resolve, reject) {
            session.execute(cmd, function(err, code, logs) {
                if(err) {
                    reject()
                }
                else {
                    console.log(logs.stdout)
                    resolve()
                }
            })
        })
    }



}


const job = new SASJob()

job.sas_generate_script()
    .then(function(data) {
        console.log(data)
    })

// job.sas_copy_script("../test.sas", "/sasfiles/aa/amueller/test.sas")
//     .then(function(){
//         job.sas_execute_script("test.sas")
//     })