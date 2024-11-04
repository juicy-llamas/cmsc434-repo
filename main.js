document.addEventListener("DOMContentLoaded", () => {
    const mealButtons = document.querySelectorAll(".nutrition-add-food-btn");
    const modal = document.getElementById("add-food-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const saveFoodBtn = document.getElementById("save-food-btn");

    const totalCaloriesDisplay = document.getElementById("total-calories");
    const totalCarbsDisplay = document.getElementById("total-carbs");
    const totalProteinDisplay = document.getElementById("total-protein");
    const totalFatsDisplay = document.getElementById("total-fats");

    const goalCalories = 2000; // Replace with user-set goal if needed
    const exerciseCalories = 0; // Default value

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;
    let currentMealList;

    mealButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            currentMealList = document.getElementById(`${e.target.dataset.meal}-list`);
            clearModalInputs(); // Clear previous input values
            modal.style.display = "block";
        });
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    saveFoodBtn.addEventListener("click", () => {
        const foodName = document.getElementById("food-name").value;
        const carbs = parseInt(document.getElementById("carbs").value) || 0;
        const protein = parseInt(document.getElementById("protein").value) || 0;
        const fats = parseInt(document.getElementById("fats").value) || 0;
        const calories = parseInt(document.getElementById("modal-calories").value) || 0;

        if (foodName && calories > 0) {
            const li = document.createElement("li");
            li.textContent = `${foodName} - Carbs: ${carbs}g, Protein: ${protein}g, Fats: ${fats}g, Calories: ${calories}`;
            currentMealList.appendChild(li);

            totalCalories += calories;
            totalCarbs += carbs;
            totalProtein += protein;
            totalFats += fats;

            totalCaloriesDisplay.textContent = totalCalories;
            totalCarbsDisplay.textContent = totalCarbs;
            totalProteinDisplay.textContent = totalProtein;
            totalFatsDisplay.textContent = totalFats;

            modal.style.display = "none"; // Close modal after saving
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    function clearModalInputs() {
        document.getElementById("food-name").value = "";
        document.getElementById("carbs").value = "";
        document.getElementById("protein").value = "";
        document.getElementById("fats").value = "";
        document.getElementById("modal-calories").value = "";
    }
});
