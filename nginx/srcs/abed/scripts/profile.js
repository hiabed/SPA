const profileButton = document.querySelector("#profile");
const profileId = document.querySelector("#profile-part");

const profile = () => {
    main.style.display = "none";
    settingPage.style.display = "none";
    chatPage.style.display = "none";
    rankPart.style.display = "none";
    friendsPart.style.display = "none";
    profileId.style.display = "flex";
    // document.querySelector("#profile-img").style.display = "none";
}

profileButton.addEventListener("click", profile);