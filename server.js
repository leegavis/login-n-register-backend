const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//const logger = require('./logger');
const morgan = require('morgan');

app.use(morgan('combined'));

// const creds = {
// 	username: 'name@hotmail.com',
// 	password: '123456'
// };


let users = [];

// app.use((req,res,next)=> {
// 	logger(req);
// 	next();
// });
//we used morgan instead of this logger

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//:-) npm install express-validator is better, but here we go:
app.post('/register',(req,res) => {

	if(req.body.gender == "" ) {

		res.send('Error, gender is a required field');
	
	}

		if(req.body.email1 == req.body.email2 && 
		req.body.email1.indexOf('@') > -1  &&
		req.body.email1.length > 5 &&
		req.body.email1.length < 66 &&
		req.body.password1 === req.body.password2 &&
		req.body.password1.length > 5 &&
		req.body.password1.length < 17 &&
		req.body.name.length >1 ) {

		
			users.push({
			name: req.body.name,
			email: req.body.email1,
			password: req.body.password1,
			gender: req.body.gender
			});
			
			console.log(users);
			res.send('You have successfully registered');

	} else {

	res.status(403).send(`
		Log in error, please verify: <br><br>
		- Email: should have '@' ,contain 6-65 characters and both fields should be identical. <br>
		- Name: must have at least 2 characters. <br>
		- Password: must have 6-16 characters and be equal to “password2" field
		`)}
});


// app.use((req,res,next) => {
// 	(console.log('1'));
// 	req.something = true;
// 	next();
// });

// app.use((req,res,next) => {
// 	(console.log('2'));
// 	next();
// });

// app.get('/', (req, res) => {
// 	console.log(req.something);
//     res.sendFile(
//     __dirname//=current folder// 
//     + '/public/login.html' 
//     );
// });

// app.post('/', ( req, res) => {
//     res.send(`${req.body.email} ${req.body.password}`);
// });

// app.post('/',(req,res) => {
// 	if(req.body.email == creds.username && 
// 		req.body.password == creds.password ) {
// 	res.send('You have successfully logged in');
// 	} else {
// 	res.status(403).send('Please correct email and password, thanks!');
// 	}
// });


 app.post('/',(req,res) => {
 	
 	users.forEach(function(user){
 		if(	user.email === req.body.email && user.password === req.body.password ) {
 			
 			res.send('You have successfully logged in');
 		
 		} else {
 			res.status(403).send('Please enter correct email and password, thanks!');
 		}
 	});
 	
 });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));






