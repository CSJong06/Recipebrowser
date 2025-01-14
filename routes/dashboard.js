import express from 'express';
import user from '../models/user.js';
import recipe from '../models/recipe.js';


const router = express.Router();


// Adding Route guard 
const requireAuth = (req, res, next) => {

  //if user isn't authenticated redirect to login
  if (!req.session.user) {
  
    return res.redirect('/login');

  }
  next();
};


router.get('/dashboard', requireAuth, async (req, res) => {

  console.log("Runnning dashboard route");

  try {
    const recipes = await recipe.findAll({
        where: {
            r_type: 'Appetizer'
        }
    });
    return res.render('dashboard',  {recipes} );
    
  } catch (error) {
    console.error('Error fetching recipes', error);
    req.flash('error', 'Error loading recipes');
  }
  
});

router.get('/dashboard/maincourse', async (req, res) => {
    console.log('getting main course recipes');
    try {
        const recipes = await recipe.findAll({
            where: {
                r_type: 'Main Course'
            }
        });
        return res.render('dashboard',  {recipes} );
        
      } catch (error) {
        console.error('Error fetching recipes', error);
        req.flash('error', 'Error loading recipes');
    }
});

router.get('/recipes', async (req, res) => {
    // try {
    //     const recipes = await recipe.findAll({
    //         order: [['timestamp', 'DESC']]
    //     })
    //     return res.render('dashboard',  {recipes} );

    // } catch (error) {
    //     console.error('Error fetching recipes:', error);
    //     req.flash('error', 'Error loading recipes');
    // }
});

export default router;