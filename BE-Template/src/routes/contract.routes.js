var express = require('express');
var router = express.Router();

const {getProfile} = require('../middleware/getProfile');

var ContractController = require('../controllers/contract.controller');

router.get('/', getProfile, ContractController.getContracts);
router.get('/:id(\\d+)', getProfile, ContractController.getContractById);

module.exports = router;
