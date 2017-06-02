var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout: 'main', extname: '.hbs'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('hsz-home');
});

app.get('/about', function(req, res){
	res.type('text/plain');
	res.send('hsz-about');
});

//404
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found')
});

//500
app.use(function(err, req, res, next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log('Express started in'+app.get('env')+'mode on http://localhost:'+app.get('port')+ ';press Ctrl-c to terminate');
});