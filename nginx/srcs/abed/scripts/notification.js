export const notifBtn = document.querySelector("#notif");
let parentDiv = null;

import { requestsFunction, friendsFunction, sendIdToBackend } from "./friends.js";

export const notificationFunction = async (username, image) => {
    console.log("username: ", username);
    console.log("image: ", image);
    // first thing is to display the parent block which will hold all the notification elementsl;
    parentDiv = document.createElement("div");
    parentDiv.id = "notifications";
    parentDiv.style.display = "flex";
    const homeNavbar = document.querySelector("#home-navbar");
    homeNavbar.insertAdjacentElement("afterend", parentDiv);
    let htmlCode;
    let trimmedHTML = document.createElement("div");
    if (username != undefined && image != undefined) {
        htmlCode = `
            <img src="${image}" alt="user image" class="request-notif">
            <h3>${username}</h3>
            <button class="btn btn-sm acc-req">accept</button>
            <button class="btn btn-sm ref-req">refuse</button>
        `;
        trimmedHTML.classList.add("req-notif"); // style in css;
    } else {
        htmlCode = `<h3>Notifications are clear</h3>`;
        trimmedHTML.classList.add("clear-notif"); //style clear notification in css;
    }
    trimmedHTML.innerHTML = htmlCode.trim();
    parentDiv.append(trimmedHTML);
}

document.addEventListener("DOMContentLoaded", () => {
    const isNotified = localStorage.getItem("notifications") === "true";
    if (isNotified)
    {
        const bellNotif = document.createElement("div");
        bellNotif.id = "bell-notif";
        notifBtn.append(bellNotif);
    }
    notifBtn.addEventListener("click", async () => {
        if (isNotified)
        {
            localStorage.setItem("notifications", false);
            const bellNotif = document.querySelector("#bell-notif");
            if (bellNotif)
                bellNotif.remove();
        }
        const requests = await requestsFunction();
        console.log("requests: ", requests);
        if (!requests.length)
        {
            notificationFunction();
        }
        for (let i = 0; i < requests.length; i++) {
            notificationFunction(requests[i].from_user.username, requests[i].from_user.imageProfile);
        }
        const acceptBtnsNotifListen = document.querySelectorAll("#notifications .acc-req");
        for(let i = 0; i < acceptBtnsNotifListen.length; i++) {
            acceptBtnsNotifListen[i].addEventListener("click", ()=> sendIdToBackend(requests[i].id, "accept"));
        }
        const refuseBtnsNotifListen = document.querySelectorAll("#notifications .ref-req");
        for(let i = 0; i < refuseBtnsNotifListen.length; i++) {
            refuseBtnsNotifListen[i].addEventListener("click", ()=> sendIdToBackend(requests[i].id, "refuse"));
        }
    });
})
