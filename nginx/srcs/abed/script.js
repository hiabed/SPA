// let username = '';
// let defaultName = username || 'Stranger';
// console.log(defaultName); // Prints: Stranger

import { friendsBtn, friendsFunc, createRequestCards, createSuggestionCard, createFriendCards, friendsFunction,  sendIdToBackend } from "./scripts/friends.js";
import { homeButton, mainFunction } from "./scripts/home.js";
import { profileButton, profileFunction } from "./scripts/profile.js";
import { rankBtn, rankFunct } from "./scripts/rank.js";
import { chatButton, chatFunction } from "./scripts/chat.js";
import { settingButton, settingFunction} from "./scripts/setting.js";
import { logoutBtn, showLogin } from "./scripts/logout.js";
import { dataObject } from "./scripts/login.js";


export const newDataFunc = async ()=> {
    const response = await fetch('/user/get_user_info/');
    if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status === "success") {
            return jsonResponse.data;
        }
    }
}

const loginBtn = document.querySelector(".login-btn");

const errorPage = document.querySelector("#error")

const showError = ()=> {
    errorPage.style.display = "block";
    document.querySelector("#login-parent").style.display = "none";
    document.querySelector("#nav").style.display = "none";
    document.querySelector("#main").style.display = "none";
    document.querySelector("#profile-part").style.display = "none";
    document.querySelector("#chat-part").style.display = "none";
    document.querySelector("#setting-part").style.display = "none";
    document.querySelector("#friends-part").style.display = "none";
    document.querySelector("#rank-part").style.display = "none";
}

const sideBtns = document.querySelectorAll(".nav-button");

export const reloadFunction = async ()=> {
    document.querySelector("#full-container").style.display = "flex";
    sideBtns.forEach (sideBtn => {sideBtn.classList.remove('link')});
    if (location.pathname === "/home" || location.pathname === "/") {
        sideBtns[0].classList.add('link');
        mainFunction();
    } else if (location.pathname === "/profile") {
        const updateDataObj = await newDataFunc();
        sideBtns[1].classList.add('link');
        profileFunction(updateDataObj);
    } else if (location.pathname === "/friends") {
        sideBtns[2].classList.add('link');
        friendsFunc();
    } else if (location.pathname === "/rank") {
        sideBtns[3].classList.add('link');
        rankFunct();
    } else if (location.pathname === "/chat") {
        sideBtns[4].classList.add('link');
        chatFunction();
    } else if (location.pathname === "/setting") {
        const updateDataObj = await newDataFunc();
        sideBtns[5].classList.add('link');
        settingFunction(updateDataObj);
    } else {
        showError() // need to implemet better front.
    }
}

export const navigateTo = (path) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (path != "forback" && path != "current")
    {
        history.pushState(null, null, path);
    }
    else {
        console.log("enter here please..");
    }
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#login-parent").style.display = "none";
    if (isLoggedIn) {
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
                    setTimeout(() => {
                        const onlineIcon = document.querySelector(`#online-icon-${data.data.id}`);
                        console.log(`online icon for ${data.data.username}: `, onlineIcon);
                        if (onlineIcon && data.data.online_status) {
                            alert(`${data.data.username} is online.`);
                            onlineIcon.style.color = "green";
                            onlineIcon.style.filter = "drop-shadow(0 0 1px green)";
                        } else if (onlineIcon && !data.data.online_status) {
                            alert(`${data.data.username} is offline.`);
                            onlineIcon.style.color = "red";
                        }
                    }, 1000); // 100ms delay to allow the DOM to render
                }
            }
        };
        socket.onclose = function() {
            console.log('WebSocket connection closed');
        };
        reloadFunction();
    } else {
        showLogin();
    }
}

homeButton.addEventListener("click", () => {
    navigateTo("/home");
});
profileButton.addEventListener("click", () => {
    navigateTo("/profile");
});
friendsBtn.addEventListener("click", () => {
    navigateTo("/friends");
});
rankBtn.addEventListener("click", () => {
    navigateTo("/rank");
});
chatButton.addEventListener("click", () => {
    navigateTo("/chat");
});
settingButton.addEventListener("click", () => {
    navigateTo("/setting");
});
logoutBtn.addEventListener("click", ()=> {
    navigateTo("/");
});
loginBtn.addEventListener("click", ()=> {
    navigateTo("/home");
});

// const onlineColor = document.querySelector(".frd-sug-img i");

window.addEventListener('popstate', ()=> navigateTo("forback"));
document.addEventListener("DOMContentLoaded", () => {
    navigateTo("current")
});

// add styled class to the clicked button (.nav-button) in #nav

// sideBtns[0].classList.add('link');

// sideBtns.forEach ((sideBtn)=> {
//     sideBtn.addEventListener("click", (event)=> {
//         sideBtns.forEach (sideBtn => {sideBtn.classList.remove('link')});
//         sideBtn.classList.add('link');
//     })
// });
