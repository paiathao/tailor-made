const express = require('express');
const router = express.Router();

const Service = require('../models/Service');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('got to service GET');
        Service.find({}).then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log('error on Get', err);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403)
    }
});



/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;