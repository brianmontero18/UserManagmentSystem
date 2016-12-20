var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/ums';
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
    return adminRouter;
};

module.exports = router;
