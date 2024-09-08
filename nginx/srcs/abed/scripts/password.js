import { reloadFunction } from "../script.js";
import { get_csrf_token } from "./register.js";

const updatePasswordForm = document.querySelector("#password-form");

export const updatePassword = async (event)=> {
    event.preventDefault();
    const formData = new FormData(updatePasswordForm);
    const token = await get_csrf_token();
    const response = await fetch('/user/ChangePass/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': token,
        },
        body: formData
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status === "success") {
            //update profile infos:
            // document.querySelector("#update-alert").style.display = "block";
            //update setting infos:
            reloadFunction(jsonResponse.data);
            // document.querySelector("#update-alert-failed").style.display = "block"; if failed;
            // clearInputs();
            // setTimeout(() => profileAlert("success"), 3000);
        }
        return jsonResponse.data;
    }
};

updatePasswordForm.addEventListener("submit", updatePassword);