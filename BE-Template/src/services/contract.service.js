const Sequelize = require('sequelize');
const { ne, or, gte, between, in: opIn } = Sequelize.Op;


exports.getContractById = async function (req, profileId, id) {
    try {
      const {Contract} = req.app.get('models');
      const contract = await Contract.findOne(
        {where:
          { id: id }
        }
      );

      if (contract.ContractorId !== profileId) {
        throw new Error('Unauthorized to view!')
      }

      return contract;
    } catch (e) {
      throw Error(e.message)
    }
}

exports.getContracts = async function (req, profileId) {
    try {
      const {Contract} = req.app.get('models');
      const contracts = await Contract.findAll(
        {
          where: {
            [or]: [
              {ContractorId: profileId},
              {ClientId: profileId}
            ],
            status: { [ne] : "terminated" }
          }
        }
      );
      return contracts;
    } catch (e) {
      // Log Errors
      console.log(e)
      throw Error('Error while getting contracts')
    }
}
