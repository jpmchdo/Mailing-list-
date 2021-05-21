//create package.json file 
npm init 

//installations
npm install express -- save 
npm install mysql -- save 
npm install faker -- save 
npm install ejs -- save 
npm install body-parser -- save 

//load package
var express = require('express'); //web development package (contains HTML and CSS connection packages)
var mysql = require('mysql'); //NodeJS and MySQL connection package
var bodyParser = require('body-parser'); //web development package (useful for post requests)
var faker = require('faker');

//Configure packages  
var app = express();
app.set("view engine", "ejs"); //NodeJS and HTML connection
app.use(bodyParser.urlencoded({extended: true})); //parses information extracted from forms
app.use(express.static(__dirname + "/public")); //NodeJS and CSS connection

Establish connnection with database 
var connection = mysql.createConnection ({
	host : 'localhost', 
	user: 'root',
	database: 'mailing'
});

//Data insertion in database 
var data = [];

for(var i = 0; i < 500; i++){
	data.push([
		faker.internet.email(),
		faker.date.past()
	]);	
}
var q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], function(error, result) {
	console.log(error);
	console.log(result);
});

connection.end();

//Run server 
app.listen(3000, function() {
	console.log("Server running on 3000")
});

//Main webpage 
app.get("/", function(req, res) {
	var q = 'SELECT COUNT(*) AS count FROM users';
	connection.query(q, function(error, result){
		if(error) throw error;
		var count = result[0].count;
		res.render('page_content', {count: count});
	});
});


//Post to database from webpage 
app.post('/register', function(req, res){
	var person = {email: req.body.email};
	connection.query('INSERT INTO users SET ?', person, function(error, result){
		if(error) throw error;
		res.redirect('/');
	});
});
