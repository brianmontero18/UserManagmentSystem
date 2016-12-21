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
            var collection = db.collection('genres');
            collection.remove({_id: id});
            res.redirect('/Genres');
        });
    };

    var unlinkBook = function(req, res) {
        var idGenre = new ObjectId(req.params.idGenre);
        var idBook = new ObjectId(req.params.idBook);
        mongodb.connect(url, function(err, db) {
            var collectionGenres = db.collection('genres');
            var collectionBooks = db.collection('books');
            collectionGenres.update({_id: idGenre},
                {$pull: {books: idBook}},
                function(err, results) {
                    collectionBooks.update({_id: idBook},
                        {$pull: {genre: collectionGenres.name}}
                    );
                    res.redirect('/Genres');
                });
        });
    };

    return {
        getIndex: getIndex,
        addGenre: addGenre,
        deleteGenre: deleteGenre,
        unlinkBook: unlinkBook
    };
};

module.exports = genreController;
