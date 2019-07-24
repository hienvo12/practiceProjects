var bcrypt = require('bcryptjs');
var students =require('./students1.json');
var fs = require('fs');
//


for(let student of students){
	let salt = bcrypt.genSaltSync(10);
	let passHash = bcrypt.hashSync(student.password, salt);
	//
	student.password = passHash;
	//console.log(student);
}
//console.log(students);
fs.writeFileSync('secStudents2.json', JSON.stringify(students,null,2));
console.log('wrote file!');