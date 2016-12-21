var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var genreController = function(nav) {
    var url = 'mongodb://localhost:27017/ums';

    var getIndex = function(req, res) {
            mongodb.connect(url, function(err, db) {
                var collectionBooks = [];
                db.collection('books').find({}).toArray(
                    function(err, results) {
                        collectionBooks = results;
                    }
                );
                db.collection('genres').find({}).toArray(
                    function(err, results) {
                        res.render('genreListView', {
                            title: 'Genres',
                            nav: nav,
                            genres: results,
                            books: collectionBooks
                        });
                    });
            });
        };

    var addGenre = function(req, res) {
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('genres');
            var genre = {
                name: req.body.name,
                books: []
            };

            collection.insert(genre,
                function(err, results) {
                    res.redirect('/Genres');
                });
        });
    };

    var deleteGenre = function(req, res) {
        var id = new ObjectId(req.params.id);
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('groups');
            collection.remove({_id: id});
            res.redirect('/Genres');
        });
    };

    return {
        getIndex: getIndex,
        addGenre: addGenre,
        deleteGenre: deleteGenre
    };
};

module.exports = genreController;
