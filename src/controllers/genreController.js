var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var genreController = function(nav) {
    var url = 'mongodb://localhost:27017/ums';

    var getIndex = function(req, res) {
            var collectionGenres = [];
            mongodb.connect(url, function(err, db) {
                db.collection('groups').find({}).toArray(
                    function(err, results) {
                        collectionGenres = results;
                    }
                );
                db.collection('books').find({}).toArray(
                    function(err, results) {
                        var collectionGroups = results;
                        res.render('genreListView', {
                            title: 'Genres',
                            nav: nav,
                            genres: collectionGenres,
                            books: results
                        });
                    });
            });
        };

    var addGenre = function(req, res) {
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('groups');
            var genre = {
                genre: req.body.genre,
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
