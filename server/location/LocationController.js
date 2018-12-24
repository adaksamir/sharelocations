const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('../user/User');
var Location = require('./Location');
var VerifyToken = require('../auth/VerifyToken');

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/lists/:userid', function (req, res) {
    const user_id = req.params.userid;
    console.log('email id : ', user_id);
    if(!!user_id) {        
        User.findOne({ email: user_id }, function (err, user) {        
            if (err) console.log('Error on the server: ', err);
            if (!user) console.log('No user found.');
            if(!!user) {
                const who = user._id;
                console.log('Found Who: ', who);
                Location.find({
                    $and: [{who: who}, {whom: {$exists: false}}]
                }, function (err, locations) {
                    console.log('PUblic locations: ', locations, err);
                    if (err) return res.status(500).send("There was a problem finding the locations.");
                    res.status(200).send(locations);
                });
            }
        });
    } else {
        console.log('WHEREERERERERERER here');
    } 
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/lists', VerifyToken, function (req, res) {
    const who = req.userId;
    console.log('Logged in user id : ', who);
    Location.find({
        $or: [{who: who}, {whom: {$regex: who}}]
    }, function (err, locations) {
        console.log('PUblic & private locations: ', locations, err);
        if (err) return res.status(500).send("There was a problem finding the locations.");
        res.status(200).send(locations);
    });
});



// GETS A SINGLE USER FROM THE DATABASE
router.post('/share', VerifyToken, function (req, res) {
    console.log('Location body: ', req.body);
    Location.create({
        who: req.userId, //req.body.who,
        whom: req.body.whom,
        when: req.body.when,
        type: req.body.type,
        name: req.body.name,
        lng: req.body.lng,
        lat: req.body.lat
    }, function (err, location) {
        if (err) return res.status(500).send("There was a problem sharing/adding the location.")        
        res.status(200).send({ location: location });
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', VerifyToken, function (req, res) {
    Location.findByIdAndRemove(req.params.id, function (err, location) {
        if (err) return res.status(500).send("There was a problem deleting the location.");
        res.status(200).send("Location of id " + location.who + " was deleted.");
    });
});

module.exports = router;