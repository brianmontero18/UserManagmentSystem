var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
    var url = 'mongodb://localhost:27017/ums';

    var middleware = function(req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };

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
                        res.render('bookListView', {
                            title: 'Books',
                            nav: nav,
                            genres: results,
                            books: collectionBooks
                        });
                    });
            });
        };

    var getById = function(req, res) {
            var id = new ObjectId(req.params.id);
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({_id: id},
                    function(err, results) {
                        bookService.getBookById(results.bookId,
                        function(err, book) {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Books',
                                nav: nav,
                                book: results
                            });
                        });
                    }
                );
            });
        };

    var addBook = function(req, res) {
        mongodb.connect(url, function(err, db) {
            var collectionGenres = db.collection('genres');
            var collectionBooks = db.collection('books');
            var book = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                read: false
            };

            collectionBooks.insert(book,
                function(err, resultsBook) {
                    collectionGenres.update(
                        {name: req.body.genre},
                        {$push: {'books': resultsBook.ops[0]._id}},
                        function(err, results) {
                            res.redirect('/Books');
                        }
                    );
                });

        });
    };

    var deleteBook = function(req, res) {
        var id = new ObjectId(req.params.id);
        mongodb.connect(url, function(err, db) {
            var collectionBooks = db.collection('books');
            var collectionGenres = db.collection('genres');
            collectionBooks.remove({_id: id},
                function(err, results) {
                    collectionGenres.update({name: collectionBooks.genre},
                        {$pull: {books: id}}
                    );
                    res.redirect('/Genres');
                }
            );
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        addBook: addBook,
        deleteBook: deleteBook,
        middleware: middleware
    };
};

module.exports = bookController;
