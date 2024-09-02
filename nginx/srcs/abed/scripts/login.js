const singUpBtn = document.querySelector("#signup");
const singInBtn = document.querySelector("#signin")
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");

function singUp_function(event)
{
    event.preventDefault();
    one.style.display = "none";
    three.style.display = "block";
}

function singIn_function(event)
{
    event.preventDefault();
    // add class so the transition can work probably;
    three.style.display = "none";
    one.style.display = "block";
}

singUpBtn.addEventListener("click", singUp_function);
singInBtn.addEventListener("click", singIn_function);

import { get_csrf_token } from './register.js';

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and set the CSRF token
    let csrfToken = get_csrf_token();
    const loginForm = document.querySelector("#login-form");
    
    const loginFunction = async (event)=> {
        console.log("------------------------------------------------------------------hellow world");
        console.log("++++++token is : +++++++" + csrfToken);
        event.preventDefault();
        const data = new FormData(loginForm);
        const response = await fetch("/login/", {
            method: "POST",
            headers: {
                'X-CSRFToken': csrfToken, // Include the CSRF token
            },
            body: data
        });
    }


    loginForm.addEventListener("submit", loginFunction);

});