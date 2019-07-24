var express = require('express');
var app = express();

//
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
app.get('/date', (req, res) =>{
	res.send('It is ' + today + ', Hien Vo');
});
app.listen(5000, function(){
console.log('app listening to port 5000');
});