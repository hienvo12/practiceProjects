var express = require('express');
const os = require('os');
var app = express();


var path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
let host = '192.168.1.69'; // Choose a different loopback address
let port = '9373'; // Last digits of your NetID
let myName = 'Hien Vo';

//
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
//
let networkInterfaces = os.networkInterfaces();
str = JSON.stringify(networkInterfaces);
let ipv4 = Object.entries(networkInterfaces)[0][1][4].address;
let mac = Object.entries(networkInterfaces)[0][1][4].mac;

today = mm + '/' + dd + '/' + yyyy;
dt = "Date and Time";
style1 = "main{background-color: salmon;}body{border-style: solid;}h1 {color: blue;}";
let data = {head1: dt, name: myName, info:today, style: style1}


app.get('/date', (req, res) =>{
	res.render('8-1temp.njk', data);
	//res.send('It is ' + today + ', Hien Vo');
});
dt = "Server and Mac address";
addresses = "This computers active external interface has IPv4 address: " + ipv4 + ", and Mac address is " + mac;
style2 = "main{background-color: lightblue;}body{border-style: solid;}h1 {color: Crimson;}";
let data2 = {head1: dt, name: myName, info: addresses, style: style2}
app.get('/address', (req,res) =>{
	//res.send('This computers active external interface has IPv4 address: ' + ipv4 + ', and Mac address is ' + mac + ', Hien Vo');
	res.render('8-1temp.njk', data2);
});
app.listen(9373, function(){
console.log('app listening to port 9373');
});
