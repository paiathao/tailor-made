const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

router.get('/', (req, res) => {
  if (req.isAuthenticated) {
    console.log('got to customer GET');
    Customer.find({}).then((data) => {
      console.log('here is our data', data);
      res.send(data);
    }).catch((err) => {
      console.log('error on GET', err);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

router.post('/', (req, res) => {
  if (req.isAuthenticated) {
    console.log('here is req.body', req.body);
    let newCustomer = new Customer(req.body);
    //save to mongodb, CREATE
    newCustomer.save().then((data) => {
      console.log(data);
      res.sendStatus(201);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
  } else {
    res.sendStatus(403);
  }
});

//put request to update order status to complete
router.put('/:id', function (req, res) {
  if (req.isAuthenticated) {
    console.log('Got to PUT');
    // update Database
    Customer.findByIdAndUpdate({
      _id: req.params.id
    }, {
        $set: { complete: true }
      }).then(function (response) {
        res.sendStatus(200);
      }).catch((err) => {
        console.log(err);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;