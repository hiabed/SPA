// let username = '';
// let defaultName = username || 'Stranger';
// console.log(defaultName); // Prints: Stranger

import { homeButton, mainFunction } from "./scripts/home.js";
import { profileButton, profileFunction } from "./scripts/profile.js";
import { friendsBtn, friendsFunc } from "./scripts/friends.js";
import { rankBtn, rankFunct } from "./scripts/rank.js";
import { chatButton, chatFunction } from "./scripts/chat.js";
import { settingButton, settingFunction} from "./scripts/setting.js";
import { logoutBtn, showLogin } from "./scripts/logout.js";

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

const navigateTo = (path) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (path != "forback" && path != "current")
        history.pushState(null, null, path);
    else {
        document.querySelector("#nav").style.display = "flex";
        document.querySelector("#login-parent").style.display = "none";
    }
    console.log("the path is: ", location.pathname);
    if (isLoggedIn)
    {
        if (location.pathname === "/home" || location.pathname === "/") {
            mainFunction();
        } else if (location.pathname === "/profile") {
            profileFunction();
        } else if (location.pathname === "/friends") {
            friendsFunc();
        } else if (location.pathname === "/rank") {
            rankFunct();
        } else if (location.pathname === "/chat") {
            chatFunction();
        } else if (location.pathname === "/setting") {
            settingFunction();
        } else {
            showError() // need to be implemented
        }
    }
    else {
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

window.addEventListener('popstate', ()=> navigateTo("forback"));
document.addEventListener("DOMContentLoaded", () => navigateTo("current"));


// add styled class to the clicked button (.nav-button) in #nav
const sideBtns = document.querySelectorAll(".nav-button");
sideBtns[0].classList.add('link');

sideBtns.forEach ((sideBtn)=> {
    sideBtn.addEventListener("click", (event)=> {
        sideBtns.forEach (sideBtn => {sideBtn.classList.remove('link')});
        sideBtn.classList.add('link');
    })
});

// switch from login to home page.
// const loginBtn = document.querySelector(".login-btn");
// const loginPart = document.querySelector("#login-parent");
// const navBar = document.querySelector("#nav");
// const mainPart = document.querySelector("#main");
// const profilePart = document.querySelector("#profile-part");
// const chatPart = document.querySelector("#chat-part");
// const setting = document.querySelector("#setting-part");
// const friends = document.querySelector("#friends-part");

// loginBtn.addEventListener("click", ()=> {
//     navBar.style.display = "flex";
//     mainPart.style.display = "block";
//     loginPart.style.display = "none";
// })

// // switch from home to login page.
// const logoutBtn = document.querySelector("#logout");
// logoutBtn.addEventListener("click", ()=> {
//     setting.style.display = "none";
//     chatPart.style.display = "none";
//     profilePart.style.display = "none";
//     navBar.style.display = "none";
//     mainPart.style.display = "none";
//     friends.style.display = "none";
//     loginPart.style.display = "flex";
// })