var ContractService = require('../services/contract.service')

exports.getContractById = async function (req, res, next) {
    try {
      if(!req.profile) {
        return res.status(400).json({ status: 400, message: "Please choose profile from dropdown" });
      }
      const profileId = req.profile.id;

      const contractId = req.params.id;
      if(contractId === null) {
        return res.status(400).json({ status: 400, message: "Please enter contract ID" });
      }
      var contract = await ContractService.getContractById(req, profileId, contractId)
      return res.status(200).json({ status: 200, data: contract, message: "Succesfully Retrieved Contracts" });
    } catch (e) {
      return res.status(403).json({ status: 400, message: e.message });
    }
}

exports.getContracts = async function (req, res, next) {
    try {
      const profileId = req.profile.id;
      var contracts = await ContractService.getContracts(req, profileId)
      return res.status(200).json({ status: 200, data: contracts, message: "Succesfully Retrieved Contracts" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}
