const singUp = document.querySelector("#signup");
const singIn = document.querySelector("#signin")
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");

function singUp_function(event)
{
    event.preventDefault();
    one.style.display = "none";
    three.style.display = "block";
}

function singIn_function(event)
{
    event.preventDefault();
    // add class so the transition can work probably;
    three.style.display = "none";
    one.style.display = "block";
}

singUp.addEventListener("click", singUp_function);
singIn.addEventListener("click", singIn_function);

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

    const loginForm = document.querySelector("#login-form");

    const loginFunction = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(loginForm);
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token
                },
                body: formData
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.status === "success") {
                    showHome(jsonResponse.data);
                }
                return jsonResponse.data;
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    loginForm.addEventListener("submit", loginFunction);
});

const showHome = (dataObj)=> {
    document.querySelector("#login-parent").style.display = "none";
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#main").style.display = "block";
    document.querySelector("#us h3").innerHTML = `${dataObj.username}`;
    document.querySelector("#welcome > h1").innerHTML = `Welcome ${dataObj.firstname} ${dataObj.lastname}!`;
}