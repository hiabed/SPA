let csrfToken;
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and set the CSRF token
    get_csrf_token();

    // Function to fetch and set the CSRF token
    function get_csrf_token() {
        fetch('/get_csrf_token/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('csrf_token').value = data.csrfToken;
            csrfToken = data.csrfToken;
        })
        .catch(error => console.error('Error fetching CSRF token:', error));
    }

    const registerForm = document.querySelector("#register-form");
    const signUpBtn = document.querySelector("#sign-up");

    const registrationFunction = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(registerForm);
            console.log(typeof formData);
            const response = await fetch('/register/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token
                },
                body: formData
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Json response: " + jsonResponse.data.username);
                if (jsonResponse.status === "success") {
                    showHome(jsonResponse.data);
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

