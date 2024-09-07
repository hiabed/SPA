import { get_csrf_token } from "./register.js";
import { reloadFunction } from "../script.js";
import { dataObject } from "./login.js";

export let updatedData = dataObject;

const profileAlert = (status)=> {
    if (status === "success")
        document.querySelector("#update-alert").style.display = "none";
    else {
        document.querySelector("#update-alert-failed").style.display = "none";
    }
}

// document.addEventListener("DOMContentLoaded", ()=> {
        const updateForm = document.querySelector("#update-form");
        const update = async (event)=> {
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
                updatedData = jsonResponse.data;
                document.querySelector("#update-alert").style.display = "block";
                // document.querySelector("#update-alert-failed").style.display = "block"; if failed;
                setTimeout(profileAlert, 3000);
            }
            return jsonResponse.data;
        }
    };
    updateForm.addEventListener("submit", update);
// })