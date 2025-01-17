import express from 'express';
import user from '../models/user.js';
import recipe from '../models/recipe.js';

const router = express.Router();

// Adding Route guard 
const requireAuth = (req, res, next) => {
  // If user isn't authenticated redirect to login
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Dashboard route
router.get('/dashboard', requireAuth, async (req, res) => {
  console.log("Running dashboard route");
  // Get user's recipes
  try {
    const recipes = await recipe.findAll({
      where: {
        r_type: 'Appetizer'
      }
    });
    //renders the dashboard with the data
    return res.render('dashboard', { recipes });
  } catch (error) {
    console.error('Error fetching recipes', error);
    return res.send(`<script>alert('Error loading recipes'); window.location.href='/dashboard';</script>`);
  }
});

// Maincourses route
router.get('/dashboard/maincourse', requireAuth, async (req, res) => {
  console.log("Running main course route");
  // Get user's recipes with the Maincourse type
  try {
    const recipes = await recipe.findAll({
      where: {
        r_type: 'Main Course'
      }
    });
    return res.render('dashboard', { recipes });
  } catch (error) {
    console.error('Error fetching recipes', error);
    return res.send(`<script>alert('Error loading recipes'); window.location.href='/dashboard';</script>`);
  }
});

// Desserts route
router.get('/dashboard/dessert', requireAuth, async (req, res) => {
  console.log("Running dessert route");
  // Get user's recipes with the dessert type
  try {
    const recipes = await recipe.findAll({
      where: {
        r_type: 'Dessert'
      }
    });
    return res.render('dashboard', { recipes });
  } catch (error) {
    console.error('Error fetching recipes', error);
    return res.send(`<script>alert('Error loading recipes'); window.location.href='/dashboard';</script>`);
  }
});

// Beverage recipe route
router.get('/dashboard/beverage', requireAuth, async (req, res) => {
  console.log("Running beverage route");
  // Get user's recipes with the Beverage type
  try {
    const recipes = await recipe.findAll({
      where: {
        r_type: 'Beverage'
      }
    });
    return res.render('dashboard', { recipes });
  } catch (error) {
    console.error('Error fetching recipes', error);
    return res.send(`<script>alert('Error loading recipes'); window.location.href='/dashboard';</script>`);
  }
});

// Snack recipe route
router.get('/dashboard/snack', requireAuth, async (req, res) => {
  console.log("Running snack route");
  // Get user's recipes with the Snack type
  try {
    const recipes = await recipe.findAll({
      where: {
        r_type: 'Snack'
      }
    });
    return res.render('dashboard', { recipes });
  } catch (error) {
    console.error('Error fetching recipes', error);
    return res.send(`<script>alert('Error loading recipes'); window.location.href='/dashboard';</script>`);
  }
});

// Recipe creation route
router.post('/recipe', async (req, res) => {
  //Extracts the input data
  const { name, difficulty, ingredients, instructions, description, time, type } = req.body;

  // Validation
  if (!name || !ingredients || !instructions || !time) {
    return res.send(`<script>alert('Please provide title, ingredients, instructions, and time.'); window.location.href='/dashboard';</script>`);
  }

  try {
    // Creates a new recipe
      const newRecipe = await recipe.create({
          title: name,
          difficulty: difficulty,
          ingredients: ingredients,
          instructions: instructions,
          r_description: description,
          r_time: time,
          r_type: type
      });
      //updates the dashboard
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error creating recipe:', error);
      return res.send(`<script>alert('Error creating recipe'); window.location.href='/dashboard';</script>`);
  }
});

router.get('/recipe/details', async (req, res) => {
  // Get the recipe ID from the query string
  const id = req.query.id;
  try {
    // Find the recipe by ID
    const recipe = await recipe.findOne({ where: { id } });
    // Render the recipe details page
    res.render('dashboard', { recipe });
  }
  catch(error){
    console.error('Error fetching recipe', error);
  }
})

export default router;
