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

    // const loginForm = document.querySelector("#login-form");
    const logoutBtn = document.querySelector("#logout button");

    const logoutFuntion = async (event) => {
        event.preventDefault();
        try {
            console.log("clicked2");
            console.log("token : ", csrfToken);
            const response = await fetch('/logout/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token
                },
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.status === "success") {
                    showLogin(jsonResponse.data);
                }
                return jsonResponse;
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    logoutBtn.addEventListener("click", logoutFuntion);
});

const showLogin = ()=> {
    document.querySelector("#login-parent").style.display = "none";
    document.querySelector("#nav").style.display = "flex";
    document.querySelector("#main").style.display = "none";
    document.querySelector("#profile-part").style.display = "none";
    document.querySelector("#chat-part").style.display = "none";
    document.querySelector("#setting-part").style.display = "none";
    document.querySelector("#friends-part").style.display = "none";
    document.querySelector("#rank-part").style.display = "none";
}