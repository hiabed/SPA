import { get_csrf_token } from "./register.js";
// import { reloadFunction } from "../script.js";
import { dataObject } from "./login.js";
import { settingFunction } from "./setting.js";

const profileAlert = (status)=> {
    if (status === "success")
    {
        document.querySelector("#update-alert").style.display = "none";
    }
    else {
        document.querySelector("#update-alert-failed").style.display = "none";
    }
}

const updateForm = document.querySelector("#update-form");

export const update = async (event)=> {
    event.preventDefault();
    const formData = new FormData(updateForm);
    const token = await get_csrf_token();
    const response = await fetch('/user/update/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': token,
        },
        body: formData
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status === "success") {
            settingFunction(jsonResponse.data);
            document.querySelector("#update-alert").style.display = "block";
            // document.querySelector("#update-alert-failed").style.display = "block"; if failed;
            setTimeout(() => profileAlert("success"), 3000);
        }
        return jsonResponse.data;
    }
};

updateForm.addEventListener("submit", update);