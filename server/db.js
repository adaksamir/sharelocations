var config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(config.mongodburi, { useNewUrlParser: true })
    .then(
        () => { 
            console.log('Ready to use mlab connection ...') 
        }, err => { 
            console.log(err.errmsg) 
        }
    );