const main = () => {
  const login_page = document.getElementsByClassName("login-page")[ 0 ];
  const signup_page = document.getElementsByClassName("sign-up-page")[ 0 ];
  const forgot_page = document.getElementsByClassName("forgot-page")[ 0 ];
  const fg_sub_page = document.getElementsByClassName("forgot-submit-page")[ 0 ];

  const toggle_btn = Array.from( 
    document.getElementsByClassName('sign-log-toggle-btn') );
  const forgot_btn = Array.from( 
    document.getElementsByClassName('forgot-btn') );
  const forgot_sub = document.querySelector('.forgot-page form');

  let cur_page = login_page;

  toggle_btn.forEach( ( e ) => { e.addEventListener( 'click', () => {
    console.log( 'toggle' );
    forgot_page.classList.remove( 'selected' );
    fg_sub_page.classList.remove( 'selected' );
    cur_page.classList.remove( 'selected' );
    cur_page = cur_page === login_page ? signup_page : login_page;
    toggle_btn.forEach( e => {
      e.innerHTML = cur_page === login_page ? 'Sign Up' : 'Login';
    } );
    console.log( cur_page === login_page );
    cur_page.classList.add( 'selected' );
  } ); } );
  forgot_sub.addEventListener( 'submit', ( e ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log( 'forgot sub' );
    login_page.classList.remove( 'selected' );
    signup_page.classList.remove( 'selected' );
    forgot_page.classList.remove( 'selected' );
    toggle_btn.forEach( e => { e.innerHTML = 'Login'; } );
    cur_page = signup_page;
    fg_sub_page.classList.add( 'selected' );
  } );
  forgot_btn.forEach( ( e ) => { e.addEventListener( 'click', () => {
    console.log( 'forgot btn' );
    login_page.classList.remove( 'selected' );
    signup_page.classList.remove( 'selected' );
    fg_sub_page.classList.remove( 'selected' );
    toggle_btn.forEach( e => { e.innerHTML = 'Login'; } );
    cur_page = signup_page;
    forgot_page.classList.add( 'selected' );
  } ); } );
};

window.onload = main;
