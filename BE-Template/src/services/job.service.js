const Sequelize = require('sequelize');
const { ne, or, gte, between, in: opIn } = Sequelize.Op;
const Moment = require('moment')

exports.getJobs = async function (req, profileId) {
    try {
      const {Job, Contract} = req.app.get('models');
      const contracts = await Contract.findAll({
        include: {
          model: Job
        },
        where: {
          [or]: [
            {ContractorId: profileId},
            {ClientId: profileId}
          ],
          status: { [ne] : "terminated" }
        }
      });

      const jobs = contracts.flatMap(contract => contract.Jobs);

      return jobs;
    } catch (e) {
      // Log Errors
      console.log(e)
      throw Error('Error while getting jobs')
    }
}

exports.getUnpaidJobs = async function (req, profileId) {
    try {
      const {Job, Contract} = req.app.get('models');
      const contracts = await Contract.findAll({
        include: {
          model: Job,
          where: {
            paid: { [or]:
                    [null, false]
                  }
          }
        },
        where: {
          [or]: [
            {ContractorId: profileId},
            {ClientId: profileId}
          ],
          status: { [ne] : "terminated" }
        }
      });

      const jobs = contracts.flatMap(contract => contract.Jobs);

      return jobs;
    } catch (e) {
      // Log Errors
      throw Error('Error while getting unpaid jobs')
    }
}

exports.payForJob = async function (req, profileId, jobId) {
    try {
      const {Job, Contract, Profile} = req.app.get('models');
      const job = await Job.findOne({
        include: [
          {
            model: Contract,
            required: true,
            include: [
              {
                model: Profile,
                as: 'Client',
                required: true,
                where: { id: profileId }
              },
              {
                model: Profile,
                as: 'Contractor',
                required: true
              }
            ]
          }
        ],
        where: {
          paid: { [or]:
                  [null, false]
                },
          id: jobId
        }
      });

      if(!job){
        throw Error("No job found!");
      }

      if(!(job.Contract.Client.balance >= job.price)){
        throw Error("Insufficiant funds!");
      }

      var transaction;
      try{
        transaction = await req.app.settings.sequelize.transaction();

        await job.Contract.Client.increment('balance', {by: -job.price});
        await job.Contract.Contractor.increment('balance', {by: job.price});
        job.paid = 1;
        job.paymentDate = Date.now();
        await job.save();

        transaction.commit();
      }
      catch (e) {
        console.log(e)
        throw Error("Error during transaction!");
        transaction.rollback();
      }

      return message = "Succesfully paid "+ job.Contract.Contractor.firstName+" "+ job.Contract.Contractor.lastName+" "+job.price+"$";
    } catch (e) {
      // Log Errors
      throw Error(e)
    }
}
