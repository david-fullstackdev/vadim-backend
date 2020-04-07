
const JobService = require('./jobs.service');
const jobService = new JobService();

class JobController {

  run_job(req, res) {

    const jobType = req.params.jobType;

    switch(jobType) {
      case "power":
        jobService.imt_job(req.body)
          .then(function(data) {
            res.send(data)
          })
          .catch(function(err) {
            console.log(err)
            res.send(err)
          });
        break;
      default:
        res.send({message: "Invalid Job Code"});
    }

  }



}

module.exports = JobController;

