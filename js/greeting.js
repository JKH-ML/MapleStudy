const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'userName';
const savedUserName = localStorage.getItem(USERNAME_KEY);

function loginFormSubmited(event) {
    event.preventDefault(); // stop the page from refreshing
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName);
    paintGreetings()
}

function paintGreetings(){
    const userName = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `hello ${userName}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

if(savedUserName === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', loginFormSubmited);
} else {
    paintGreetings()
}

