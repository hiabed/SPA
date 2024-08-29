const rankBtn = document.querySelector("#rank");
const rankPart = document.querySelector("#rank-part");

const rankFunct = () => {
    main.style.display = "none";
    settingPage.style.display = "none";
    chatPage.style.display = "none";
    profileId.style.display = "none";
    friendsPart.style.display = "none";
    rankPart.style.display = "flex";
}

rankBtn.addEventListener("click", rankFunct);