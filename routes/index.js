const express = require('express');
const router = express();
const User = require('../models/user');
const middleware = require('../middleware');

// GET /profile
router.get('/profile', middleware.requiresLogin, (req, res, next) => {
	User.findById(req.session.userId)
		.exec( (error, user) => {
			if (error) {
				return next(error);
			} else {
				return res.render('profile', { title: 'Profile', name: user.name } );
			}
		});
});

// GET /logout
router.get('logout', (req, res, next) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

// GET /login
router.get('/login', middleware.loggedOut, (req, res, next) => {
	return res.render('login');
});

// POST /login
router.post('/login', (req, res, next) => {
	if (req.body.email && req.body.password) {
		User.authenticate(req.body.email, req.body.password, (error, user) => {
			if (error || !user) {
				const err = new Error('Wrong email or password');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				return res.redirect('/profile');
			}
		})
	} else {
		const err = new Error('Email and password are required.');
		err.status = 401;
		return next(err);
	}
});

// GET /register
router.get('/register', middleware.loggedOut, (req, res, next) => {
	return res.render('register');
});

// POST /register
router.post('/register', (req, res, next) => {
	if (req.body.email &&
		req.body.name &&
		req.body.password &&
		req.body.confirmPassword) {
			if (req.body.password !== req.body.confirmPassword) {
				const err = new Error('Passwords do not match.');
				err.status = 400;
				return next(err);
			}

			const userData = {
				email: req.body.email,
				name: req.body.name,
				password: req.body.password
			};

			// use schema CREATE method to insert document into mongo
			User.create(userData, (error, user) => {
				if (error) {
					return next(error);
				} else {
					req.session.userId = user._id;
					return res.redirect('/profile');
				}
			});

	} else {
		const err = new Error('All fields required');
		err.status = 400;
		return next(err);
	}
});

// GET /
router.get('/', (req, res, next) => {
	return res.render('index');
});

// GET /about
router.get('/about', (req, res, next) => {
	return res.render('about')
});

// // Send a GET request to READ a specific record
// router.get('/records/:id', (req, res) => {
// 	const record = data.records.find(record => record.id == req.params.id);
// 	res.json(record);
// });
// // Send a POST request to CREATE a new record
// router.post('/', (req, res) => {

// });
// // SEND a PUT request to UPDATE a specific record
// router.put('/records/:id', (req, res) => {

// });
// // SEND a DELETE request to DELETE a specific record
// router.delete('/records/:id', (req, res) => {

// });