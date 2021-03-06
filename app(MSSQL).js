var express = require('express');
var sql = require('mssql');

var config = {
    user: 'kambigadmin',
    password: 'Admin1234',
    server: 'kambig.database.windows.net',
    database: 'registroacademico',
    options: {
        encrypt: 'true'
    }
};

sql.conect(config, function(err) {
    console.log(err);
});

var app = express();
var port = process.env.PORT || 3000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes.js')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'My site',
        nav: nav
    });
});

app.listen(port, function() {
    console.log('running server on port ' + port);
});
