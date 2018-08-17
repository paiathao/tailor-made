const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');
/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('here is req.body', req.body);
    let newCustomer = new Customer(req.body);
    //save to mongodb, CREATE
    newCustomer.save().then( (data) => {
      console.log(data);
      res.sendStatus(201);
    }).catch( (err) => {
      console.log(err);
      res.sendStatus(500)
    })
});

module.exports = router;