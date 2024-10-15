const main = () => {
    const names = [ 'main', 'user', 'activity', 
                    'dashboard', 'nutrition' ];

    const buttons = names.reduce( ( obj, e ) => {
        obj[ e ] = document.querySelector( "." + e + '-btn' );
        return obj;
    }, {} );
    const pages   = names.reduce( ( obj, e ) => {
        obj[ e ] = document.querySelector( "." + e + '-page' );
        return obj;
    }, {} );

    let last_btn = buttons[ 'user' ];
    let last_page = pages[ 'user' ];

    for ( let name of names ) {
        buttons[name].onclick = (() => (e) => {
            console.log( name );

            last_btn.classList.remove( "selected" );
            last_page.classList.remove( "selected" );
            buttons[ name ].classList.add( "selected" );
            pages[ name ].classList.add( "selected" );

            last_btn = buttons[ name ];
            last_page = pages[ name ];
        })();
    }

    // display main page
    buttons[ 'main' ].onclick();
    
    // customizing bar width to match bar amt
    const bars = document.querySelectorAll( '.bar' );
    for ( bar of bars ) {
        bar.style.width = ( (200/3) / bars.length ).toString() + '%';
    }
};

window.onload = main;
