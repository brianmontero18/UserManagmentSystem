var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 3000;
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Genres',
    Text: 'Genres'
}];

var bookRouter = require('./src/routes/bookRoutes.js')(nav);
var genreRouter = require('./src/routes/genreRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
var authRouter = require('./src/routes/authRoutes.js')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }

));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Genres', genreRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'My site',
        nav: nav
    });
});

app.listen(port, function() {
    console.log('running server on port ' + port);
});
