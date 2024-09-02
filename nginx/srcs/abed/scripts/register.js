// Function to fetch and set the CSRF token
export const get_csrf_token = () => {
    let csrfToken;
    fetch('/get_csrf_token/')
    .then(response => response.json())
    .then(data => {
        document.getElementById('csrf_token').value = data.csrfToken;
        // csrfToken = data.csrfToken;
        return csrfToken;
    })
    .catch(error => console.error('Error fetching CSRF token:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and set the CSRF token
    let csrfToken = get_csrf_token();
    const registerForm = document.querySelector("#register-form");
    
    const registrationFunction = async (event) => {
        console.log("this is it: " + csrfToken);
        event.preventDefault();
        try {
            const formData = new FormData(registerForm);
            const response = await fetch('/register/', { // /login/, /user/update/
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token
                },
                body: formData
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Json response: " + jsonResponse);
                if (jsonResponse.status === "success") {
                    const dataObj = Object.fromEntries(formData);
                    console.log("dataObj type is: " + typeof dataObj);
                    showHome(dataObj);
                }
                return jsonResponse;
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    registerForm.addEventListener("submit", registrationFunction);
});

const showHome = (dataObj)=> {
    document.querySelector("#login-parent").style.display = "none";
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#main").style.display = "block";
    document.querySelector("#us h3").innerHTML = `${dataObj.username}`;
    document.querySelector("#welcome > h1").innerHTML = `Welcome ${dataObj.firstname} ${dataObj.lastname}!`;
}

