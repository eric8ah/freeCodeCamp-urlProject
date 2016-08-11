var express = require('express');
var app = express();
var mongo_url = "mongodb://eric8ah:mySecretPass23@ds015962.mlab.com:15962/short-urls";
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var assert = require('assert');
var path = require('path');
var url = require('url');
var validator = require('validator');
var protocols = { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false };
var urlID;
var webpage;
var response;
var domain;

var insertDocument = function(db, callback) {
    db.collection('urls').insertOne( 
        {
        "_id": urlID,
        "URL": webpage
    }, function(err, result) {
        assert.equal(err, null);
        console.log('Inserted a document into the urls collection');
        callback();
    });
};

var findUrls = function(db, callback) {
    var cursor = db.collection('urls').find({ "URL": webpage});
    cursor.each(function(err, doc) {
        if (err) {
            return err;
        } else if (doc !== null) {
            console.dir(doc);
            console.log('doc was found?');
            urlID = doc._id;
            webpage = doc.URL;
        } else {
            console.log('doc was not found?');
            callback();
        }
    });
};



app.get('/*', function(req, res) {
    MongoClient.connect(mongo_url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongo_url);
    webpage = url.parse(req.url).pathname.split('/')[1];
    if (validator.isURL(webpage, protocols) !== true) {
        response = {
            "error": "Invalid URL"
        };
        res.json(response);
    } else {
    urlID = undefined;
    domain = req.get('host');
    findUrls(db, function() {
        if (urlID !== undefined) {
            console.log('Valid ID');
            response = {
                "original_url": webpage,
                "short_url": domain + '/' + urlID
            };
            res.json(response);
        } else {
            console.log('ID not Valid');
            webpage = url.parse(req.url).pathname.split('/')[1];
            urlID = Math.floor(Math.random()*1000)+ 2;
            insertDocument(db, function() {
                response = {
                    "original_url": webpage,
                    "short_url": domain + '/' + urlID
                };
                res.json(response);
            });
        }
        db.close();
    });
    }
}
});
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Server has been started');
});