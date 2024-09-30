
const main = () => {
    const buttons = document.querySelector( "nav" ).children;
    const pages = document.querySelector( "main" ).children;

    let last_btn = pages[ 0 ];
    let last_page = buttons[ 0 ];

    for ( let i = 0; i < buttons.length; i++ ) {
        buttons[ i ].onclick = ( () => ( e ) => {
            last_btn.classList.remove( "selected" );
            last_page.classList.remove( "selected" );
            buttons[ i ].classList.add( "selected" );
            pages[ i ].classList.add( "selected" );

            last_btn = buttons[ i ];
            last_page = pages[ i ];
        } )();
    }

    // page 2 form data tracker
    ( () => {
        let value_one = "Cheese";
        let value_two = "Cheese";
        const plugs = document.getElementsByClassName( "elm_to_insert" );

        for ( const elm of pages[ 1 ].querySelector( "form" ).children ) {
            elm.onchange = ( e ) => {
                if ( e.target.name === "cheese" ) {
                    value_one = e.target.value;
                } else if ( e.target.name === "cheese_two" ) {
                    value_two = e.target.value;
                }

                for ( let i = 0; i < plugs.length; i++ ) {
                    plugs[ i ].innerHTML = `You picked ${value_one} ` + 
                                           `and ${value_two}`;
                }
            };
        }
    } )();
    //profile image thing
    const image = document.getElementById("image");
    const notification = document.getElementById("notification");
    image.onclick = () => {
        notification.style.display = "block";
    }
    window.closeNotification = () => {
        notification.style.display = "none";
    }
};

window.onload = main;
