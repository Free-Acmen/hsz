var webpack = require('webpack');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

//视图模版引擎
var handlebars = require('express3-handlebars').create({
    partialsDir: 'views/partials', //默认也是这个目录
    layoutsDir: 'views/layouts/', //默认也是这个目录
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

//监听端口设置\json和url解析中间件
app.set('port', process.env.PORT || 3000);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// local variables for all views
app.use(function(req, res, next) {
    if (!res.locals.env) {
        res.locals.env = process.env.NODE_ENV || 'dev';
    }
    if (!res.locals.reload) {
        res.locals.reload = true;
    }
    next();
});

var isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
    //webpack构建
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackDevConfig = require('./build/webpack.dev.conf');

    var compiler = webpack(webpackDevConfig);
    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {
        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    //路由
    app.use(function(req, res, next) {
        if (!res.locals.partials) {
            res.locals.partials = {};
        }
        res.locals.partials.date = new Date();
        next();
    });

    app.use(function(req, res, next) {
        res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
        next();
    });

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/about', function(req, res) {
        res.render('about', {
            pageTestScript: '/qa/test-about.js'
        });
    });

    //404
    app.use(function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });

    //500
    app.use(function(err, req, res, next) {
        console.log(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });

    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);

    server.listen(app.get('port'), function() {
        console.log('Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') + ';press Ctrl-c to terminate');
    });
} else {

    //静态中间件
    app.use(express.static(__dirname + '/public'));

    //路由
    app.use(function(req, res, next) {
        if (!res.locals.partials) {
            res.locals.partials = {};
        }
        res.locals.partials.date = new Date();
        next();
    });

    app.use(function(req, res, next) {
        res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
        next();
    });

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/about', function(req, res) {
        res.render('about', {
            pageTestScript: '/qa/test-about.js'
        });
    });

    //404
    app.use(function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });

    //500
    app.use(function(err, req, res, next) {
        console.log(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });

    app.listen(app.get('port'), function() {
        console.log('Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') + ';press Ctrl-c to terminate');
    });
}