const main = () => {
    const names = ['main', 'user', 'activity',
        'dashboard', 'nutrition'];

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

    // display main page
    buttons['main'].onclick();

    // customizing bar width to match bar amt
    const bars = document.querySelectorAll('.bar');
    for (bar of bars) {
        bar.style.width = ((200 / 3) / bars.length).toString() + '%';
    }

    //nutriition
    const addCalorieBtn = document.getElementById('add-calorie-btn');
    const foodInput = document.getElementById('food');
    const caloriesInput = document.getElementById('calories');
    const calorieList = document.getElementById('calorie-list');
    const totalCaloriesDisplay = document.getElementById('total-calories');

    let totalCalories = 0;

    addCalorieBtn.onclick = () => {
        const food = foodInput.value;
        const calories = parseInt(caloriesInput.value);

        if (food && calories > 0) {
            // Add food and calorie entry to the list
            const li = document.createElement('li');
            li.textContent = `${food}: ${calories} calories`;
            calorieList.appendChild(li);

            // Update total calories
            totalCalories += calories;
            totalCaloriesDisplay.textContent = totalCalories.toString();

            // Clear inputs
            foodInput.value = '';
            caloriesInput.value = '';
        }
    };
};

window.onload = main;
