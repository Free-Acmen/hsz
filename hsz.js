var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({
    partialsDir: 'views/partials', //默认也是这个目录
    layoutsDir: "views/layouts/", //默认也是这个目录
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs'); //修改视图引擎配置
app.set('port', process.env.PORT || 3000);


// app.use(function(req, res, next) {
//     res.locals.partials.date = new Date();
//     next();
// })

app.get('/', function(req, res) {
    // res.type('text/plain');
    res.render('index');
});

app.get('/about', function(req, res) {
    res.type('text/plain');
    res.send('hsz-about');
});

//404
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found')
});

//500
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express started in' + app.get('env') + 'mode on http://localhost:' + app.get('port') + ';press Ctrl-c to terminate');
});