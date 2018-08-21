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
        $set: { 
          complete: true,
          payment: true }
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

//put request to object customer
router.put('/', function (req, res) {
  console.log('got to put', req.body)
  if (req.isAuthenticated) {
    console.log('Got to PUT');
    // update Database
    Customer.findByIdAndUpdate({
      _id: req.body._id
    }, {
        $set: { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            orderNumber: req.body.orderNumber,
            orderDetails: req.body.orderDetails,
            dropDate: req.body.dropDate,
            pickUp: req.body.pickUp,
            paid: req.body.paid,
            complete: req.body.complete}
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