import express from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import user from '../models/user.js';

const router = express.Router();

//route to login
router.get('/login', (req, res) => {
  res.render('login'); //on request => respond with rendering login page
});

//Login attempt
router.post('/login', async (req, res) => {
  const { email, password } = req.body; //extracts email and password from request body

  try{
    //attempts to find a user with the given email
    const existingUser = await user.findOne({
      where: {
        [Op.or]: [
          { email: email}
        ]
      }
    });
    
    //returns error and redirects if the user isn't found
    if (!existingUser){
      req.flash('error', 'User does not exist.');
      return res.redirect('/login');
    }

    //compares inputted password with the stored password if user exists
    const isValid = await bcrypt.compare(password, existingUser.password_hash);

    //returns error if it comes back false
    if (!isValid){
      req.flash('error', 'Invalid password.');
      res.redirect('/login');
    }
    
    //assigns the session and redirects to dashboard once everything is true
    else {
      req.session.user = existingUser;
      return res.redirect('/dashboard');
    }
  } catch(e){
    console.log(e);
  }
  
});

//route to register
router.get('/register', (req, res) => {
  res.render('register'); //on request => respond with rendering register page
});

//Register attempt
router.post('/register', async (req, res) => {
  // Extract user inputs
  const { username, email, password } = req.body;
  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    //looks for an account with the given email
    const existingUser = await user.findOne({
      where: {
        [Op.or]: [
          { email: email},
          { username: username }
        ]
      }
    });

    //returns an error if the user already exists
    if (existingUser) {
      req.flash('error', 'User with this email already exists.');
      return res.redirect('/register');
    }

    //if the user doesn't exist, this creates a new user
    const newUser = await user.create({
      username,
      email,
      password_hash: passwordHash,
    });

    //redirects them to dashboard
    return res.redirect('/dashboard');
  } catch(error) {
    console.error(error);
  }
  req.flash('error', 'Registration failed. Please try again.');
  return res.redirect('/register');
});


router.get('/logout', (req, res) => {

  //destroys session
  req.session.destroy((err) => {
  
    if (err) {
      console.error('Logout error:', err);
    }

    res.redirect('/');

  });
});

export default router