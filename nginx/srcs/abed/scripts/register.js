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

const registrationFunction = async (event) => {
    event.preventDefault();
    const token =  await get_csrf_token();
    // console.log("++++" + token + "+++++");
    try {
        const formData = new FormData(registerForm);
        const response = await fetch('/register/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': token, // Include the CSRF token
            },
            body: formData
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log("Json response: " + jsonResponse.data.username);
            if (jsonResponse.status === "success") {
                showLogin();
            }
            else {
                console.log(jsonResponse.error);
            }
            return jsonResponse;
        }
        else {
            alert("error happened");
        }
    }
    catch(err) {
        console.error(err);
    }
}
registerForm.addEventListener("submit", registrationFunction);

const onlineStatFunc = async () => {
    
}

export const showHome = async (dataObj)=> {
    navigateTo("current");
}
