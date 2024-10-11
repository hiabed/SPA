const notifDiv = document.querySelector("#notif");
let clicked = 0;
let parentDiv = null;

import { requestsFunction } from "./friends.js";

export const notificationFunction = async (username, state, image, action) => {
    // first thing is to display the parent block which will hold all the notification elementsl;
    if (!clicked) {
        clicked = 1;
        parentDiv = document.createElement("div");
        parentDiv.id = "notifications";
        // if (state === "show") {
            parentDiv.style.display = "flex";
        // }
        const homeNavbar = document.querySelector("#home-navbar");
        homeNavbar.insertAdjacentElement("afterend", parentDiv);
        // alert(action);
        if (action === "request") {
            // need name image and buttons (accept refuse);
            let htmlCode = `
                <img src="${image}" alt="user image" class="request-notif">
                <h3>${username}</h3>
                <button class="btn acc-req">accept</button>
                <button class="btn ref-req">refuse</button>
            `;
            let trimmedHTML = document.createElement("div");
            trimmedHTML.classList.add("req-notif");
            trimmedHTML.innerHTML = htmlCode.trim();
            parentDiv.append(trimmedHTML);
            console.log(parentDiv);
        } else {
            // need message told you that the user accepted your request;
        }
    } else {
        if (parentDiv) {
            parentDiv.style.display = "none";
            parentDiv.remove();
        }
        clicked = 0;
    }
}

notifDiv.addEventListener("click", () => {
    requestsFunction();
});