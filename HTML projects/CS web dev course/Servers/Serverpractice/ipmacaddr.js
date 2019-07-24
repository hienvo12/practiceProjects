var express = require('express');
const os = require('os');
var app = express();

let networkInterfaces = os.networkInterfaces();
str = JSON.stringify(networkInterfaces);
let ipv4 = Object.entries(networkInterfaces)[0][1][4].address;
let mac = Object.entries(networkInterfaces)[0][1][4].mac;

app.get('/address', (req,res) =>{
	res.send('This computers active external interface has IPv4 address: ' + ipv4 +
 ', and Mac address is ' + mac + ', Hien Vo');
});
app.listen(5001, function(){
console.log('app listening to port 5001');
});