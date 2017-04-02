'use strict';
const MongoClient  = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

/**
 * @class
 * class connects to the database and sets up the models
 */
class Database {
    // for this class to be generic we will need to have the follwing outside of this class
    // connection string
    // collection names
    constructor(config) {
        this.collectionNames = config.collections;
        this.url = config.url;
        this.collectionsDict = {};
        return this;
    }

    //this method call allows us to connect to the database
    connect(cb) {
        MongoClient.connect(this.url, (err , db) => {
            if(err) throw new Error('DB connection error here');
            this.initCollections(db);
            console.log('connected baby');
            return cb(null, this);
        });
    }

    // this method initializes the collection names from the config object
    // passed in through the constructor
    initCollections(db) {
        this.collectionNames.forEach((name) => {
            this.collectionsDict[name] = db.collection(name);
        });
    }

    // this returns the collection reference for this name
    model(name) {
        if(!this.collectionsDict[name]){
            throw new Error('The model or collection required does not exists');
        }
        return this.collectionsDict[name];
    }
}

module.exports = Database;

