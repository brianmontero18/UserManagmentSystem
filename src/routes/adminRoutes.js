var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var genres = [
    {
        name: 'Adventures',
        books: [
            {
                title: 'War and Peace',
                author: 'Lev Tolstoy',
                read: false
            },
            {
                title: 'El señor de los anillos',
                author: 'J. R. R. Tolkien',
                read: false
            }
        ]
    },
    {
        name: 'Drama',
        books: [
            {
                title: 'A Dolls House',
                author: 'Henrik Ibsen',
                read: false
            },
            {
                title: 'A Sentimental Education',
                author: 'Gustave Flaubert',
                read: false
            }
        ]
    },
];

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Tolstoy',
        read: false
    },
    {
        title: 'El señor de los anillos',
        genre: 'Historical Fiction',
        author: 'J. R. R. Tolkien',
        read: false
    },
    {
        title: 'A Dolls House',
        genre: 'Adventure',
        author: 'Henrik Ibsen',
        read: false
    },
    {
        title: 'A Sentimental Education',
        genre: 'Fiction',
        author: 'Gustave Flaubert',
        read: false
    },
    {
        title: 'The Aeneid',
        genre: 'Drama',
        author: 'Virgil',
        read: false
    },
    {
        title: 'Anna Karenina',
        genre: 'Commedy',
        author: 'Lev Tolstoy',
        read: false
    },
    {
        title: 'Berlin Alexanderplatz',
        genre: 'Adventures',
        author: 'Alfred Doblin',
        read: false
    },
];

var groups = [
    {
        genre: 'Science Fiction'
    },
    {
        genre: 'Adventures'
    },
    {
        genre: 'Drama'
    },
];

var router = function(nav) {
    var url = 'mongodb://localhost:27017/ums';

    adminRouter.route('/addBooks')
        .get(function(req, res) {
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    });
            });
            // res.send('inserting books');
        });

    adminRouter.route('/addGroups')
        .get(function(req, res) {
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('groups');
                collection.insertMany(groups,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    });
            });
        });

    adminRouter.route('/addData')
        .get(function(req, res) {
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('genres');
                collection.insertMany(genres,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    });
            });
        });
    return adminRouter;
};

module.exports = router;
