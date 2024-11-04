const main = () => {
    const names = ['main', 'user', 'activity', 'nutrition'];

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

    for (const name of names) {
        buttons[name].onclick = () => {
            console.log(name);

            last_btn.classList.remove("selected");
            last_page.classList.remove("selected");
            buttons[name].classList.add("selected");
            pages[name].classList.add("selected");

            last_btn = buttons[name];
            last_page = pages[name];
        };
    }

    // display main page
    buttons['main'].onclick();

    // customizing bar width to match bar amt
    const bars = document.querySelectorAll('.bar');
    for (const bar of bars) {
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

    // user
    const pf_name = document.querySelector( '.user-page .profile-name' );
    const pf_name_icon = document.querySelector( '.user-page .profile-name svg' );
    const pf_name_p = pf_name.getElementsByTagName( 'p' )[ 0 ];
    const pf_edit = document.querySelector( '.user-page .pf-name-edit' );
    const pf_edit_inp = pf_edit.children[ 0 ];

    pf_name.addEventListener( 'click', ( e ) => {
        console.log( 'name click' );
        if ( pf_edit.style.display === '' ) {
            pf_edit.style.display = 'inline';
            pf_edit_inp.value = pf_name_p.innerHTML;
            pf_edit_inp.focus();
            pf_edit_inp.select();
            e.stopPropagation();
        }
    } );
    pf_name_icon.addEventListener( 'click', ( e ) => {
        console.log( 'icon click' );
        if ( pf_edit.style.display === 'inline' ) {
            pf_name_p.innerHTML = pf_edit_inp.value;
            pf_edit.style.display = '';
            e.stopPropagation();
        }
    } );
    pages['user'].addEventListener( 'click', () => {
        console.log( 'page click' );
        if ( pf_edit.style.display === 'inline' ) {
            pf_edit.style.display = '';
        }
    } );
    pf_edit_inp.addEventListener( 'keydown', ( e ) => { 
        if ( e.code === 'Enter' ) {
            pf_name_p.innerHTML = pf_edit_inp.value;
            pf_edit.style.display = '';
        }
    } );
};

window.onload = main;
