document.addEventListener('DOMContentLoaded', function() {
    const formBtn = document.getElementById('formBtn');
    const overlay = document.createElement('div');
    overlay.className = 'overlay'; // Create overlay element
    document.body.appendChild(overlay); // Append overlay to body

    // Form Viewing
    formBtn.addEventListener('click', function() {
        const recipeForm = document.getElementById('recipeForm');
        if (recipeForm.style.display === 'none' || recipeForm.style.display === '') {
            recipeForm.style.display = 'block';
            overlay.style.display = 'block'; // Show overlay
        } else {
            recipeForm.style.display = 'none';
            overlay.style.display = 'none'; // Hide overlay
        }
        console.log(recipeForm.style.display);
    });

    // Closing Form
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', function() {
        const recipeForm = document.getElementById('recipeForm');
        recipeForm.style.display = 'none'; // Hide the recipe form
        overlay.style.display = 'none'; // Hide the overlay
    });

    // Function to show recipe details
    window.showRecipeDetails = function(title, difficulty, ingredients, instructions, description, time) {
        //grab the elements from the page
        document.querySelector('#name').textContent = title;
        document.querySelector('#difficulty').textContent = difficulty;
        document.querySelector('#ingredients').textContent = ingredients;
        document.querySelector('#instructions').textContent = instructions;
        document.querySelector('#description').textContent = description;
        document.querySelector('#time').textContent = time;

        const recipeDetailSection = document.querySelector('.recipe-container');
        recipeDetailSection.style.display = 'block'; // Show the recipe detail section
        overlay.style.display = 'block'; // Show overlay

        // Close button logic for the recipe detail section
        const closeDetailBtn = recipeDetailSection.querySelector('.close-btn');
        closeDetailBtn.addEventListener('click', function() {
            recipeDetailSection.style.display = 'none'; // Hide the recipe detail section
            overlay.style.display = 'none'; // Hide the overlay
        });
    };

});