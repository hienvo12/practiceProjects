var events = require('./events.json');
var students = require('./students1.json');
var studentsHash = require('./secStudents.json');
var bcrypt = require('bcryptjs');
var express = require('express');
var app = express();
app.use(express.static('public'));
let urlencodedParser = express.urlencoded({extended: true});
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

let headerMain = "Boxing Club ";
let header1 = "Members";
let info = "<table><tr><td>Matt Ashely</td><td>dy2646</td></tr><tr><td>Delmer Atkinson</td><td>ks2604</td></tr><tr><td>Gween Barnes</td><td>bb3289</td></tr><tr><td>Rubin Cherry</td><td>ww7319<td><tr><td>John Jay</td><td>123491</td></tr></tr><tr><td>Roger Rogers</td><td>123481</td></tr><tr><td>Bob Smith</td><td>123461</td></tr><tr><td>J. Turner</td><td>123451</td></tr><tr><td>Billy Thornton</td><td>123471</td></tr></table>";
let data = {headerMain: headerMain, header1: header1, info: info}

app.get('/users', (req,res) =>{
	res.render('users.njk', data);
});

let header2 = "Club Events";
let info2 = events[0].name + " | " + events[0].day + " | " + events[0].date + "<br/>" 
	+ events[1].name + " | " + events[1].day + " | " + events[1].date
	+ "<br/>" + events[2].name + " | " + events[2].day + " | " + events[2].date + "<br/>";
let data2 = {headerMain: headerMain, header1: header2, info: info2};
app.get('/events', (req, res) =>{
	/*res.send(events[0].name + " " + events[0].day + " " + events[0].date + "<br/>" 
	+ events[1].name + " " + events[1].day + " " + events[1].date
	+ "<br/>" + events[2].name + " " + events[2].day + " " + events[2].date);*/
	res.render('events.njk', data2);
});
//Forms
app.get('/', function (req, res) {
    res.render('addEvents.html');
});
app.get('/addEvent', function(req, res){
	let temp = req.query;
	let info3 = info2 + temp.eName + " | " + temp.eDay +" | " + temp.eDate + "<br/>";
	let data3 = {headerMain: headerMain, header1: header2, info: info3};
	res.render('events.njk', data3);
}); 
//Logon
app.get('/', function (req, res){
	res.render('logon.html');
});

var found = false; var studentName = ""; var studentNetid = ""; var passCheck = "";
app.post('/logon', urlencodedParser, function(req, res){
	let temp2 = req.body;
	for(let student of students){
		if(student.email === temp2.email){
			if(student.password === temp2.pword){
				found = true;
				studentName = student.firstName + " " + student.lastName;
				studentNetid = student.netid;
			}
		}
		
	}
	if(found === false){
		res.render('loginError.html');
	}else{
		let data4 = {name: studentName, netid: studentNetid};
		res.render('welcome.njk', data4);
	}
	found = false;
});



app.listen(9373,function(){
	console.log("listening to port 9373");
});

