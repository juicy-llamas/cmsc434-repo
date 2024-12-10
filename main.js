const main = () => {
    const names = ["main", "user", "activity", "nutrition", "explore"];
    const buttons = names.reduce((obj, e) => {
        obj[e] = document.querySelector(`.${e}-btn`);
        return obj;
    }, {});
    const pages = names.reduce((obj, e) => {
        obj[e] = document.querySelector(`.${e}-page`);
        return obj;
    }, {});

    let lastBtn = buttons["user"];
    let lastPage = pages["user"];

    for (const name of names) {
        buttons[name].onclick = () => {
            lastBtn.classList.remove("selected");
            lastPage.classList.remove("selected");
            buttons[name].classList.add("selected");
            pages[name].classList.add("selected");

            lastBtn = buttons[name];
            lastPage = pages[name];
        };
    }

    buttons["main"].onclick();

    /*  Nutrition  */

    const nutritionData = {
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFats: 0,
        dailyCalorieGoal: 2000,
    };

    const nutritionElements = {
        calories: document.getElementById("total-calories"),
        carbs: document.getElementById("total-carbs"),
        protein: document.getElementById("total-protein"),
        fats: document.getElementById("total-fats"),
        progress: document.getElementById("calories-progress"),
        progressText: document.getElementById("progress-text"),
        mealLists: document.querySelectorAll(".nutrition-meal-list"),
    };

    const nutritionModal = document.getElementById("add-food-modal");
    const closeNutritionModalBtn = document.getElementById("close-modal-btn");
    const saveFoodBtn = document.getElementById("save-food-btn");
    let currentMealList;

    document.querySelectorAll(".nutrition-add-food-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            currentMealList = document.getElementById(`${e.target.dataset.meal}-list`);
            clearNutritionModal();
            nutritionModal.style.display = "block";
        });
    });

    closeNutritionModalBtn.addEventListener("click", () => {
        nutritionModal.style.display = "none";
    });

    saveFoodBtn.addEventListener("click", () => {
        const foodName = document.getElementById("food-name").value;
        const carbs = parseInt(document.getElementById("carbs").value) || 0;
        const protein = parseInt(document.getElementById("protein").value) || 0;
        const fats = parseInt(document.getElementById("fats").value) || 0;
        const calories = parseInt(document.getElementById("modal-calories").value) || 0;

        if (foodName && calories > 0) {
            addNutritionEntry(currentMealList, foodName, carbs, protein, fats, calories);
            nutritionModal.style.display = "none";
        }
    });

    const addNutritionEntry = (mealList, foodName, carbs, protein, fats, calories) => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${foodName}: Carbs: ${carbs}g, Protein: ${protein}g, Fats: ${fats}g, Calories: ${calories}
        <button class="delete-btn">🗑️</button>
      `;
        mealList.appendChild(li);

        updateNutritionTotals(carbs, protein, fats, calories);

        li.querySelector(".delete-btn").addEventListener("click", () => {
            mealList.removeChild(li);
            updateNutritionTotals(-carbs, -protein, -fats, -calories);
        });
    };

    const updateNutritionTotals = (carbs, protein, fats, calories) => {
        nutritionData.totalCalories += calories;
        nutritionData.totalCarbs += carbs;
        nutritionData.totalProtein += protein;
        nutritionData.totalFats += fats;

        nutritionElements.calories.textContent = nutritionData.totalCalories;
        nutritionElements.carbs.textContent = nutritionData.totalCarbs;
        nutritionElements.protein.textContent = nutritionData.totalProtein;
        nutritionElements.fats.textContent = nutritionData.totalFats;

        const progressPercentage = Math.min(
            (nutritionData.totalCalories / nutritionData.dailyCalorieGoal) * 100,
            100
        );
        nutritionElements.progress.style.width = `${progressPercentage}%`;
        nutritionElements.progressText.textContent = `${Math.round(progressPercentage)}%`;
    };

    const clearNutritionModal = () => {
        document.getElementById("food-name").value = "";
        document.getElementById("carbs").value = "";
        document.getElementById("protein").value = "";
        document.getElementById("fats").value = "";
        document.getElementById("modal-calories").value = "";
    };

    /*  Fitness Tracker */

    const activityData = {
        totalCalories: 0,
        totalTime: 0,
        totalDistance: 0,
        dailyCalorieGoal: 500,
    };

    const activityElements = {
        calories: document.getElementById("total-activity-calories"),
        time: document.getElementById("total-activity-time"),
        distance: document.getElementById("total-activity-distance"),
        progress: document.getElementById("activity-progress-fill"),
        progressText: document.getElementById("activity-progress-text"),
        activityList: document.getElementById("activity-list"),
    };

    const activityModal = document.getElementById("add-activity-modal");
    const closeActivityModalBtn = document.getElementById("close-activity-modal-btn");
    const saveActivityBtn = document.getElementById("save-activity-btn");

    document.querySelector(".activity-add-btn").addEventListener("click", () => {
        activityModal.style.display = "block";
        clearActivityModal();
    });

    closeActivityModalBtn.addEventListener("click", () => {
        activityModal.style.display = "none";
    });

    saveActivityBtn.addEventListener("click", () => {
        const type = document.getElementById("activity-type").value;
        const time = parseFloat(document.getElementById("activity-time").value) || 0;
        const distance = parseFloat(document.getElementById("activity-distance").value) || 0;
        const difficulty = document.getElementById("activity-difficulty").value;
        const calories = parseInt(document.getElementById("activity-calories").value) || 0;

        if (type && time > 0 && distance > 0 && calories > 0) {
            addActivityEntry(type, time, distance, difficulty, calories);
            activityModal.style.display = "none";
        }
    });

    const addActivityEntry = (type, time, distance, difficulty, calories) => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${type}: ${time} hrs, ${distance} miles, ${difficulty}, ${calories} cal
        <button class="delete-btn">🗑️</button>
      `;
        activityElements.activityList.appendChild(li);

        updateActivityTotals(time, distance, calories);

        li.querySelector(".delete-btn").addEventListener("click", () => {
            activityElements.activityList.removeChild(li);
            updateActivityTotals(-time, -distance, -calories);
        });
    };

    const updateActivityTotals = (time, distance, calories) => {
        activityData.totalCalories += calories;
        activityData.totalTime += time;
        activityData.totalDistance += distance;

        activityElements.calories.textContent = activityData.totalCalories;
        activityElements.time.textContent = activityData.totalTime.toFixed(1);
        activityElements.distance.textContent = activityData.totalDistance.toFixed(1);

        const progressPercentage = Math.min(
            (activityData.totalCalories / activityData.dailyCalorieGoal) * 100,
            100
        );
        activityElements.progress.style.width = `${progressPercentage}%`;
        activityElements.progressText.textContent = `${Math.round(progressPercentage)}%`;
    };

    const clearActivityModal = () => {
        document.getElementById("activity-type").value = "";
        document.getElementById("activity-time").value = "";
        document.getElementById("activity-distance").value = "";
        document.getElementById("activity-difficulty").value = "";
        document.getElementById("activity-calories").value = "";
    };
};

window.onload = main;
