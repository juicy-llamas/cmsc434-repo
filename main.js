const main = () => {
    const names = ['main', 'user', 'activity', 'dashboard', 'nutrition'];

    const buttons = names.reduce((obj, e) => {
        obj[e] = document.querySelector("." + e + '-btn');
        return obj;
    }, {});
    const pages = names.reduce((obj, e) => {
        obj[e] = document.querySelector("." + e + '-page');
        return obj;
    }, {});

    let last_btn = buttons['user'];
    let last_page = pages['user'];

    for (let name of names) {
        buttons[name].onclick = (() => (e) => {
            console.log(name);

            last_btn.classList.remove("selected");
            last_page.classList.remove("selected");
            buttons[name].classList.add("selected");
            pages[name].classList.add("selected");

            last_btn = buttons[name];
            last_page = pages[name];
        })();
    }

    buttons['main'].onclick();

    const bars = document.querySelectorAll('.bar');
    for (let bar of bars) {
        bar.style.width = ((200 / 3) / bars.length).toString() + '%';
    }

    // Nutrition code
    const mealButtons = document.querySelectorAll(".add-food-btn");
    const modal = document.getElementById("add-food-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const saveFoodBtn = document.getElementById("save-food-btn");
    const totalCaloriesDisplay = document.getElementById("total-calories");
    const totalCarbsDisplay = document.getElementById("total-carbs");
    const totalProteinDisplay = document.getElementById("total-protein");
    const totalFatsDisplay = document.getElementById("total-fats");


    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFats = 0;
    let currentMealList;

    mealButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            currentMealList = document.getElementById(`${e.target.dataset.meal}-list`);
            clearModalInputs();
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
            li.textContent = `${foodName} -> Carbs: ${carbs}g, Protein: ${protein}g, Fats: ${fats}g, Calories: ${calories}`;
            currentMealList.appendChild(li);

            totalCalories += calories;
            totalCarbs += carbs;
            totalProtein += protein;
            totalFats += fats;

            totalCaloriesDisplay.textContent = totalCalories;
            totalCarbsDisplay.textContent = totalCarbs;
            totalProteinDisplay.textContent = totalProtein;
            totalFatsDisplay.textContent = totalFats;

            modal.style.display = "none";
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
};

window.onload = main;
