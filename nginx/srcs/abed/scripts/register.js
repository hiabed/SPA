// export let dataObjectt = null;

import { showLogin } from "./logout.js";
import { createRequestCards, createSuggestionCard, createFriendCards, friendsFunction,  sendIdToBackend, friendsLoaded } from "./friends.js";
import { navigateTo } from "../script.js";

export const get_csrf_token = async () => {
    const response = await fetch('/get_csrf_token/');
    const jsonResponse = await response.json();
    document.querySelector('.csrf_token').value = jsonResponse.csrfToken;
    // console.log("TOKENNN: " + jsonResponse.csrfToken);
    return jsonResponse.csrfToken;
}

const registerForm = document.querySelector("#register-form");
const usernameError = document.getElementById("username-error");
const passwordError = document.querySelector("#password-error");
const emailError = document.querySelector("#email-error");

const registrationFunction = async (event) => {
    event.preventDefault();
    const token =  await get_csrf_token();
    const formData = new FormData(registerForm);
    const response = await fetch('/register/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': token
        },
        body: formData
    });
    const jsonResponse = await response.json();
    if (response.ok) {
        if (jsonResponse.status === "success") {
            showLogin();
        }
        return jsonResponse;
    }
    else {
        // in case of error.
        if (response.status === 400) {
            const existingErrors = document.querySelectorAll(".error");
            existingErrors.forEach(error => {
                error.remove();
            });
            if (jsonResponse.error.username) {
                const userError = document.createElement("div");
                userError.classList.add("error");
                userError.innerHTML = `${jsonResponse.error.username}`; // Insert the error message
                userError.style.color = "red";
                usernameError.insertAdjacentElement("afterend", userError);
            }
            if (jsonResponse.error.password2) {
                const userError = document.createElement("div");
                userError.classList.add("error");
                jsonResponse.error.password2.forEach(element => {
                    userError.innerHTML += `${element}<br>`;
                });
                userError.style.color = "red";
                passwordError.insertAdjacentElement("afterend", userError);
            }
            if (jsonResponse.error.email) {
                const userError = document.createElement("div");
                userError.classList.add("error");
                userError.innerHTML = `${jsonResponse.error.email}`; // Insert the error message
                userError.style.color = "red";
                emailError.insertAdjacentElement("afterend", userError);
            }
            console.log("Register Error: ", jsonResponse.error);
        }
    }
}
registerForm.addEventListener("submit", registrationFunction);

export const showHome = async (dataObj)=> {
    // navigateTo("current");
    document.querySelector("#full-container").style.display = "flex";
    document.querySelector("#login-parent").style.display = "none";
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#main").style.display = "flex";
    document.querySelector("#us h3").innerHTML = `${dataObj.username}`;
    document.querySelector("#welcome > h1").innerHTML = `Welcome ${dataObj.firstname} ${dataObj.lastname}!`;
}
