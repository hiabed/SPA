// let username = '';
// let defaultName = username || 'Stranger';
// console.log(defaultName); // Prints: Stranger

import { homeButton, mainFunction } from "./scripts/home.js";
import { profileButton, profileFunction } from "./scripts/profile.js";
import { friendsBtn, friendsFunc } from "./scripts/friends.js";
import { rankBtn, rankFunct } from "./scripts/rank.js";
import { chatButton, chatFunction } from "./scripts/chat.js";
import { settingButton, settingFunction} from "./scripts/setting.js";
import { logoutBtn } from "./scripts/logout.js";
const loginBtn = document.querySelector(".login-btn");

const navigateTo = () => {
    console.log("history state", history.state);
    if (history.state === "home") {
        mainFunction();
    } else if (history.state === "profile") {
        profileFunction();
    } else if (history.state === "friends") {
        friendsFunc();
    } else if (history.state === "rank") {
        rankFunct();
    } else if (history.state === "chat") {
        chatFunction();
    } else if (history.state === "setting") {
        settingFunction();
    }
}

homeButton.addEventListener("click", () => {
    history.pushState("home", '', "/?page=home");
    navigateTo();
});
profileButton.addEventListener("click", () => {
    history.pushState("profile", '', "/?page=profile");
    navigateTo();
});
friendsBtn.addEventListener("click", () => {
    history.pushState("friends", '', "/?page=friends");
    navigateTo();
});
rankBtn.addEventListener("click", () => {
    history.pushState("rank", '', "/?page=rank");
    navigateTo();
});
chatButton.addEventListener("click", () => {
    history.pushState("chat", '', "/?page=chat");
    navigateTo();
});
settingButton.addEventListener("click", () => {
    history.pushState("setting", '', "/?page=setting");
    navigateTo();
});
logoutBtn.addEventListener("click", ()=> {
    history.pushState("/", '', "/");
    navigateTo();
});
loginBtn.addEventListener("click", ()=> {
    history.pushState("home", '', "/?page=home");
    navigateTo();
});

window.addEventListener('popstate', navigateTo);


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