var express = require('express');
var genreRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
    var genreController = require('../controllers/genreController')(nav);

    genreRouter.route('/')
        .get(genreController.getIndex)
        .post(genreController.addGenre);

    genreRouter.route('/:id/')
        .delete(genreController.deleteGenre);

    genreRouter.route('/:idGenre/:idBook')
        .put(genreController.unlinkBook);

    return genreRouter;
};
module.exports = router;
