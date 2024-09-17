export const homeButton = document.querySelector("#home");
export const main = document.querySelector("#main");

import { profileId } from "./profile.js";
import {settingPage} from "./setting.js";
import { chatPage } from "./chat.js";
import { rankPart } from "./rank.js";
import { friendsPart, friendsFunction } from "./friends.js";

export const mainFunction = () => {
    profileId.style.display = "none";
    settingPage.style.display = "none";
    chatPage.style.display = "none";
    rankPart.style.display = "none";
    friendsPart.style.display = "none";
    main.style.display = "flex";
    document.querySelector("#full-container").style.display = "flex";
    // document.querySelector("#online-friends").style.display = "flex";
}

// homeButton.addEventListener("click", mainFunction);

const searchInput = document.querySelector("#search-bar input");

let flag = 0;
let matchBlock = document.createElement("div");
const homeNav = document.querySelector("#home-navbar");

const lookForUsers = async ()=> {
    document.querySelectorAll(".match-element").forEach(el => {
        el.remove();
    })
    if (searchInput.value === "") {
        matchBlock.remove();
        flag = 0;
    }
    const data = await friendsFunction();
    data.forEach(element => {
        if (element.username.includes(searchInput.value.toLowerCase()) && searchInput.value != "") {
            if (flag === 0) {
                matchBlock.classList.add("match-block");
                document.querySelector("#main").append(matchBlock);
                homeNav.insertAdjacentElement("afterend", matchBlock);
                flag++;
            }
            const matchElement = document.createElement("div");
            matchElement.classList.add("match-element");
            matchElement.innerHTML = element.username;
            matchBlock.append(matchElement);
        }
    });
    // console.log(data);
}

searchInput.addEventListener("keyup", lookForUsers);