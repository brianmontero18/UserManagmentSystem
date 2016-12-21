var express = require('express');
var genreRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
    var genreController = require('../controllers/genreController')(nav);

    genreRouter.route('/')
        .get(genreController.getIndex)
        .post(genreController.addGenre);

    genreRouter.route('/:id')
        .delete(genreController.deleteGenre);

    return genreRouter;
};
module.exports = router;
