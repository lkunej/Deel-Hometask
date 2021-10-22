var JobService = require('../services/job.service')

exports.getJobs = async function (req, res, next) {
    try {
      const profileId = req.profile.id;
      var jobs = await JobService.getJobs(req, profileId)
      return res.status(200).json({ status: 200, data: jobs, message: "Succesfully Retrieved Jobs" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUnpaidJobs = async function (req, res, next) {
    try {
      const profileId = req.profile.id;
      var jobs = await JobService.getUnpaidJobs(req, profileId)
      return res.status(200).json({ status: 200, data: jobs, message: "Succesfully Retrieved Unpaid Jobs" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.payForJob = async function (req, res, next) {
    try {
      const profileId = req.profile.id;
      const jobId = req.params.job_id;

      var message = await JobService.payForJob(req, profileId, jobId)
      return res.status(200).json({ status: 200, message: message});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e });
    }
}
