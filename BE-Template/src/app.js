const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./models/model')
const {getProfile} = require('./middleware/getProfile')

const Sequelize = require('sequelize');
const { ne, or, gte, between, in: opIn } = Sequelize.Op;

// custom routes
const contractRoutes = require('./routes/contract.routes')
const jobRoutes = require('./routes/job.routes')

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

// use custom routes
app.use('/contracts',contractRoutes);
app.use('/jobs',jobRoutes);

/**
  * Function used to get all profiles in DB. Used for dropdown
**/
app.get('/getProfiles',async (req, res) =>{
    const {Profile} = req.app.get('models');
    const profiles = await Profile.findAll();
    res.json(profiles);
})

module.exports = app;
