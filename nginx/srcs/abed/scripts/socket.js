export let flag = 0;

export const socketFunction = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && !flag) {
        const socket = new WebSocket('wss://localhost/wss/friend_requests/');
        socket.onopen = function() {
                console.log('WebSocket connection established');
            };
            socket.onerror = function(error) {
                console.log(' ---| WEBSOCKET IS NOT CONNECTE |----------', error);
                console.error('WebSocket error:', error);
        };
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            if (data.status === 'success') {
                if (data.option === 'receive_frd_req'){
                    createRequestCards(data.data.from_user.username, data.data.from_user.imageProfile)
                    const acceptBtnsListen = document.querySelectorAll(".add .accept");
                    for(let i = 0; i < acceptBtnsListen.length; i++) {
                        acceptBtnsListen[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "accept"));
                    }
                    const refuseBtnsListen = document.querySelectorAll(".delete .refuse");
                    for(let i = 0; i < refuseBtnsListen.length; i++) {
                        refuseBtnsListen[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "refuse"));
                    }
                }
                if (data.option === 'accepte_request'){
                    console.log('data : ', data.data)
                    createFriendCards(data.data.username, data.data.imageProfile);
                    const unfriendBtns = document.querySelectorAll(".delete .unfriendd");
                    for(let i = 0; i < unfriendBtns.length; i++) {
                        unfriendBtns[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "unfriend"));
                    }
                }
                if (data.option === 'refuse_frd_req'){
                    createSuggestionCard(data.data.username, data.data.imageProfile);
                    const addBtnsListen = document.querySelectorAll(".add .btn");
                    for(let i = 0; i < addBtnsListen.length; i++) {
                        addBtnsListen[i].addEventListener("click", ()=> sendIdToBackend(data.data.from_user_id, "add"));
                    }
                }
                if (data.option === 'unfriend'){
                    friendsFunction();
                    console.log('data222 : ', data.data)
                    const unfriendBtns = document.querySelectorAll(".delete .unfriendd");
                    for(let i = 0; i < unfriendBtns.length; i++) {
                        unfriendBtns[i].addEventListener("click", ()=> sendIdToBackend(data.data.id, "unfriend"));
                    }
                }
                if (data.option === 'is_online') {
                    const onlineIcon = document.querySelector(`#online-icon-${data.data.id}`);
                    const status = localStorage.getItem(`online_status_${data.data.id}`);
                    console.log(`online icon for ${data.data.username}: `, onlineIcon);
                    if (onlineIcon && data.data.online_status) {
                        alert(`${data.data.username} is online.`);
                        onlineIcon.style.color = "green";
                        onlineIcon.style.filter = "drop-shadow(0 0 1px green)";
                        localStorage.setItem(`online_status_${data.data.id}`, 'online');  // Store online status
                    } else if (onlineIcon && !data.data.online_status) {
                        alert(`${data.data.username} is offline.`);
                        onlineIcon.style.color = "red";
                        onlineIcon.style.filter = "drop-shadow(0 0 1px red)";
                        localStorage.setItem(`online_status_${data.data.id}`, 'offline');  // Store offline status
                    }
                }
            }
        };
        socket.onclose = function() {
            console.log('WebSocket connection closed');
        };
        flag++;
    }
}