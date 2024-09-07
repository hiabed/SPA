import { get_csrf_token } from "./register.js";
import { reloadFunction } from "../script.js";
import { dataObject } from "./login.js";

export let updatedData = dataObject;

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
                // document.querySelector("#welcome > h1").innerHTML = `Welcome ${jsonResponse.data.firstname} ${jsonResponse.data.lastname}!`;
                // alert(jsonResponse.data.firstname);
                updatedData = jsonResponse.data;
                // reloadFunction(jsonResponse.data);
                document.querySelector("#update-alert").style.display = "block";    
            }
            return jsonResponse.data;
        }
    };
    updateForm.addEventListener("submit", update);
// })