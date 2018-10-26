const express = require('express');
const router = express.Router();

const Service = require('../models/Service');

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        Service.find({}).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;