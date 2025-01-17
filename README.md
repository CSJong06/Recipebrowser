# Recipe App

## Description
A web application for managing and sharing recipes.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd recipeApp`
3. Install dependencies: `npm install`
4. Set up the database connection in `.env` file.

## Usage
Start the application: `npm start`

## Features
- User authentication
- Recipe management
- Dashboard for users

## Sample Recipe Data
```sql
INSERT INTO recipe (title, difficulty, ingredients, instructions, r_description, r_time, r_type) 
VALUES 
(
    'Spaghetti Bolognese', 
    'Easy', 
    'Spaghetti, Ground Beef, Tomato Sauce', 
    'Cook spaghetti, brown beef, mix with sauce.', 
    'A classic Italian dish.', 
    '30 minutes', 
    'Main Course'
),
(
    'Chocolate Cake', 
    'Medium', 
    'Flour, Sugar, Cocoa Powder, Eggs', 
    'Mix ingredients, bake for 30 minutes.', 
    'A rich and moist chocolate cake.', 
    '1 hour', 
    'Dessert'
);
```

## Technologies Used
- Node.js
- Express
- Sequelize
- EJS

## Contact
[LinkedIn](www.linkedin.com/in/jamir-ong-4823912b4)
<p align="right">(<a href="#readme-top">back to top</a>)</p>
