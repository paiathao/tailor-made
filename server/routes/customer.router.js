const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

router.get('/', (req, res) => {
    console.log('got to customer GET');
    Customer.find({}).then((data) =>{
      console.log('here is our data', data);
      res.send(data);
    }).catch( (err) => {
      console.log('error on GET', err);
      res.sendStatus(500);
    });
});

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