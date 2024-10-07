// export let dataObjectt = null;

import { showLogin } from "./logout.js";
import { createRequestCards, createSuggestionCard, createFriendCards, friendsFunction,  sendIdToBackend, friendsLoaded } from "./friends.js";

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

export const showHome = (dataObj)=> {
    // localStorage.setItem(dataObj.username);
    document.querySelector("#full-container").style.display = "flex";
    document.querySelector("#login-parent").style.display = "none";
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#main").style.display = "flex";
    document.querySelector("#us h3").innerHTML = `${dataObj.username}`;
    document.querySelector("#welcome > h1").innerHTML = `Welcome ${dataObj.firstname} ${dataObj.lastname}!`;
    const socket = new WebSocket('wss://localhost/wss/friend_requests/');
    socket.onopen = function() {
        console.log('WebSocket connection established');
    };
    socket.onerror = function(error) {
        console.log(' ---| WEBSOCKET IS NOT CONNECTE |----------', error);
        console.error('WebSocket error:', error);
    };
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.status === 'success') {
            if (data.option === 'receive_frd_req'){
                createRequestCards(data.data.from_user.username, data.data.from_user.imageProfile)
                const acceptBtnsListen = document.querySelectorAll(".add .accept");
                for(let i = 0; i < acceptBtnsListen.length; i++) {
                    acceptBtnsListen[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "accept"));
                }
                const refuseBtnsListen = document.querySelectorAll(".delete .refuse");
                for(let i = 0; i < refuseBtnsListen.length; i++) {
                    refuseBtnsListen[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "refuse"));
                }
            }
            if (data.option === 'accepte_request'){
                console.log('data : ', data.data)
                createFriendCards(data.data.username, data.data.imageProfile);
                const unfriendBtns = document.querySelectorAll(".delete .unfriendd");
                for(let i = 0; i < unfriendBtns.length; i++) {
                    unfriendBtns[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "unfriend"));
                }
            }
            if (data.option === 'refuse_frd_req'){
                createSuggestionCard(data.data.username, data.data.imageProfile);
                const addBtnsListen = document.querySelectorAll(".add .btn");
                for(let i = 0; i < addBtnsListen.length; i++) {
                    addBtnsListen[i].addEventListener("click", ()=> sendIdToBackend(data.data.from_user_id, "add"));
                }
            }
            if (data.option === 'unfriend'){
                friendsFunction();
                console.log('data222 : ', data.data)
                const unfriendBtns = document.querySelectorAll(".delete .unfriendd");
                for(let i = 0; i < unfriendBtns.length; i++) {
                    unfriendBtns[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "unfriend"));
                }
            }
            if (data.option === 'is_online') {
                friendsFunction();
                if (friendsLoaded) {
                    const onlineIcon = document.querySelector(`#online-icon-${data.data.id}`);
                    console.log("loginnnnn online icon: ", onlineIcon);
                    if (onlineIcon && data.data.online_status) {
                        alert("connected");
                        onlineIcon.style.color = "green";
                        onlineIcon.style.filter = "drop-shadow(0 0 1px green)";
                    } else if (onlineIcon && !data.data.online_status) {
                        alert("disconnected");
                        onlineIcon.style.color = "red";
                    }
                }
            }
        }
    };
    socket.onclose = function() {
        console.log('WebSocket connection closed');
    }
}
