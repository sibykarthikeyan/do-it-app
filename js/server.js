var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({'extended':'false'}));
app.use(bodyparser.json());
app.use(bodyparser.json({type:'application/vnd.api+json'}));

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
    next();
});
console.log('above post');
app.post('/',function(req,res){
	console.log('in todo');
	var info = req.body.params;
	console.log('info is ' + info);
	console.log('info body is ' + req.body);
	var db;
	MongoClient.connect('mongodb://siby.karthii:English%40123@ds121222.mlab.com:21222/star-wars',function(err,database){
		db = database;
		db.collection('Todo').save(req.body,function(err,todos){
			if(err){
				res.send(err);
				console.log('error ' +err);
			}
			console.log('inserted into db ...' );
		});
		
	});
	
});

app.get('*',function(req,res){
	console.log('in get todo');
	var db;
	MongoClient.connect('mongodb://siby.karthii:English%40123@ds121222.mlab.com:21222/star-wars',function(err,database){
		db = database;
		db.collection('Todo').find().toArray(function(err,todos){
			if(err){
				res.send(err);
				console.log('error ' +err);
			}
			var responseData = JSON.stringify(todos);
			res.json(responseData);
			console.log('get data from mlab and sending data to angular ');
		});
		
	});
	
});


app.listen(8080);
console.log('listening to port ....')