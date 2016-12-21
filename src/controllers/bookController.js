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
            var collectionBooks = [];
            mongodb.connect(url, function(err, db) {
                db.collection('books').find({}).toArray(
                    function(err, results) {
                        collectionBooks = results;
                    }
                );
                db.collection('groups').find({}).toArray(
                    function(err, results) {
                        var collectionGroups = results;
                        res.render('bookListView', {
                            title: 'Books',
                            nav: nav,
                            books: collectionBooks,
                            groups: results
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
            var collection = db.collection('groups');
            var book = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                read: false
            };

            collection.insert(book,
                function(err, results) {
                    res.redirect('/Books');
                });
        });
    };

    var deleteBook = function(req, res) {
        var id = new ObjectId(req.params.id);
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.remove({_id: id});
            res.redirect('/Books');
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
