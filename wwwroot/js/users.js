// let uri = '/User';
// let userRole = '';
// let usersItems = [];

// function getToken() {
//     const token = localStorage.getItem("token");
//     return token;
// }
// // פונקציה לבדוק את הרשאות המשתמש
// function checkUserRole() {
//     const token = getToken();
//     if (token) {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         userRole = payload.type;
//     }
// }
// function getItems() {
//     checkUserRole();
//     const token = getToken();
//     let userUri = userRole === 'Admin' ? '/User/GetAll' : '/User/Get';
//     if (!token || !isTokenValid(token)) {
//         window.location.href = 'login.html'; // הפניה ללוגין אם הטוקן לא תקף
//         return Promise.reject("Token expired or missing");
//     }

//     fetch(userUri, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': token
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch items. Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             _displayItems(data);
//         })
//         .catch(error => console.error(' Unable to get items.', error));
// }
// function _displayItems(data) {
//     if (userRole == "Admin")
//         document.getElementById('addButton').style.display = 'block'

//     const tBody = document.getElementById('userItems');
//     tBody.innerHTML = '';

//     const users = Array.isArray(data) ? data : [data];

//     users.forEach(item => {
//         let editButton = document.createElement('button');
//         editButton.innerText = 'Edit';
//         editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

//         let deleteButton = document.createElement('button');
//         deleteButton.innerText = 'Delete';
//         deleteButton.setAttribute('onclick', `deleteUser(${item.id})`);

//         let tr = tBody.insertRow();

//         let td1 = tr.insertCell(0);
//         td1.appendChild(document.createTextNode(item.username));

//         let td2 = tr.insertCell(1);
//         td2.appendChild(document.createTextNode(item.email));

//         let td3 = tr.insertCell(2);
//         td3.appendChild(document.createTextNode(item.password));

//         let td4 = tr.insertCell(3);
//         td4.appendChild(editButton);

//         if (userRole === 'Admin') {
//             let td5 = tr.insertCell(4);
//             td5.appendChild(deleteButton);
//         }
//     });
//     usersItems = data;
// }

// //הייתי צריכה להעביר למעלה כדי שיעבוד למה???
// const logOut = () => {
//         localStorage.removeItem("token");
//         initPage();
//     }
    
//     function initPage() {
//         const token = getToken();
//         console.log(isTokenValid(getToken()));
//         if (!token || !isTokenValid(token)) {
//             // אם אין טוקן או שפג תוקפו, הפניה לדף הלוגין
//             window.location.href = 'login.html';
//         }
//         else
//             document.body.classList.add('show');
//     }
    
// // פונקציה להצגת הטופס להוספת משתמש
// function toggleAddForm() {
//     const addForm = document.getElementById('addForm');
//     addForm.style.display = addForm.style.display === 'none' || addForm.style.display === '' ? 'block' : 'none';
// }

// // פונקציה להוספת משתמש
// function addUser() {
//     const token = getToken();
//     const addUsername = document.getElementById('add-username').value.trim();
//     const addPassword = document.getElementById('add-password').value.trim();
//     const addEmail = document.getElementById('add-email').value.trim();

//     const newUser = {
//         username: addUsername,
//         password: addPassword,
//         email: addEmail,
//         role: "User"
//     };

//     fetch(uri + "/create", {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': token
//         },
//         body: JSON.stringify(newUser)
//     })
//         .then(response => response.json())
//         .then(() => {
//             getItems();
//             document.getElementById('add-username').value = '';
//             document.getElementById('add-password').value = '';
//             document.getElementById('add-email').value = '';
//         })
//         .catch(error => console.error('Unable to add user.', error));

//     closeInputAdd();
// }

// // פונקציה לסגירת טופס ההוספה
// function closeInputAdd() {
//     document.getElementById('addForm').style.display = 'none';
// }

// // פונקציה למחיקת משתמש
// function deleteUser(id) {
//     const token = getToken();
//     fetch(`${uri}/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': token
//         }
//     })
//         .then(() => getItems())
//         .catch(error => console.error('Unable to delete user.', error));
// }

// // פונקציה להציג את טופס העריכה למשתמש
// function displayEditForm(id) {
//     const users = Array.isArray(usersItems) ? usersItems : [usersItems];
//     const item = users.find(item => item.id === id);

//     // רק משתמשים עם ID זהה יכולים לערוך את פרטיהם
//     document.getElementById('edit-username').value = item.username;
//     document.getElementById('edit-email').value = item.email;
//     document.getElementById('edit-password').value = item.password;
//     document.getElementById('edit-id').value = item.id;
//     document.getElementById('edit-password').value = item.password;
//     document.getElementById('editForm').style.display = 'block';
// }

// function getCurrentUserId() {
//     const token = getToken();
//     if (token) {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         return payload.id;
//     }
//     return null;
// }

// function updateUser() {
//     const token = getToken();
//     const itemId = document.getElementById('edit-id').value;

//     const users = Array.isArray(usersItems) ? usersItems : [usersItems];
//     const existingUser = users.find(user => user.id == itemId);
//     let userRole = existingUser ? existingUser.role : 'User';

//     if (parseInt(itemId, 10) === getCurrentUserId()) {
//         userRole = userRole;
//     }

//     const item = {
//         id: parseInt(itemId, 10),
//         username: document.getElementById('edit-username').value.trim(),
//         password: document.getElementById('edit-password').value.trim(),
//         email: document.getElementById('edit-email').value.trim(),
//         role: userRole
//     };

//     fetch(uri, {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': token
//         },
//         body: JSON.stringify(item)
//     })
//         .then(() => getItems())
//         .catch(error => console.error('Unable to update user.', error));

//     closeInput();
//     return false;
// }
// // פונקציה לסגירת טופס העריכה
// function closeInput() {
//     document.getElementById('editForm').style.display = 'none';
// }

// // function _displayItems(data) {
// //     if (userRole == "Admin")
// //         document.getElementById('addButton').style.display = 'block'

// //     const tBody = document.getElementById('userItems');
// //     tBody.innerHTML = '';

// //     const users = Array.isArray(data) ? data : [data];

// //     users.forEach(item => {
// //         let editButton = document.createElement('button');
// //         editButton.innerText = 'Edit';
// //         editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

// //         let deleteButton = document.createElement('button');
// //         deleteButton.innerText = 'Delete';
// //         deleteButton.setAttribute('onclick', `deleteUser(${item.id})`);

// //         let tr = tBody.insertRow();

// //         let td1 = tr.insertCell(0);
// //         td1.appendChild(document.createTextNode(item.username));

// //         let td2 = tr.insertCell(1);
// //         td2.appendChild(document.createTextNode(item.email));

// //         let td3 = tr.insertCell(2);
// //         td3.appendChild(document.createTextNode(item.password));

// //         let td4 = tr.insertCell(3);
// //         td4.appendChild(editButton);

// //         if (userRole === 'Admin') {
// //             let td5 = tr.insertCell(4);
// //             td5.appendChild(deleteButton);
// //         }
// //     });
// //     usersItems = data;
// // }

// function isTokenValid(token) {
//     if (!token) return false;

//     try {
//         const payload = JSON.parse(atob(token.split(".")[1])); 
//         const exp = payload.exp * 1000; 
//         return Date.now() < exp; 
//     } catch (e) {
//         return false;
//     }
// }

// // const logOut = () => {
// //     localStorage.removeItem("token");
// //     initPage();
// // }

// // function initPage() {
// //     const token = getToken();
// //     console.log(isTokenValid(getToken()));
// //     if (!token || !isTokenValid(token)) {
// //         // אם אין טוקן או שפג תוקפו, הפניה לדף הלוגין
// //         window.location.href = 'login.html';
// //     }
// //     else
// //         document.body.classList.add('show');
// // }

// // קריאה לפונקציה בעת טעינת הדף
// document.addEventListener('DOMContentLoaded', initPage);


// // קריאה לפונקציה בעת טעינת הדף
// document.addEventListener('DOMContentLoaded', initPage);

let uri = '/User';
let userRole = '';
let usersItems = [];

function getToken() {
    const token = localStorage.getItem("token");
    return token;
}
// פונקציה לבדוק את הרשאות המשתמש
function checkUserRole() {
    const token = getToken();
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userRole = payload.type;
    }
}
function getItems() {
    checkUserRole();
    const token = getToken();
    let userUri = userRole === 'Admin' ? '/User/GetAll' : '/User/Get';
    if (!token || !isTokenValid(token)) {
        window.location.href = 'login.html'; // הפניה ללוגין אם הטוקן לא תקף
        return Promise.reject("Token expired or missing");
    }

    fetch(userUri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch items. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            _displayItems(data);
        })
        .catch(error => console.error(' Unable to get items.', error));
}

// פונקציה להצגת הטופס להוספת משתמש
function toggleAddForm() {
    const addForm = document.getElementById('addForm');
    addForm.style.display = addForm.style.display === 'none' || addForm.style.display === '' ? 'block' : 'none';
}

// פונקציה להוספת משתמש
function addUser() {
    const token = getToken();
    const addUsername = document.getElementById('add-username').value.trim();
    const addPassword = document.getElementById('add-password').value.trim();
    const addEmail = document.getElementById('add-email').value.trim();

    const newUser = {
        username: addUsername,
        password: addPassword,
        email: addEmail,
        role: "User"
    };

    fetch(uri + "/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            document.getElementById('add-username').value = '';
            document.getElementById('add-password').value = '';
            document.getElementById('add-email').value = '';
        })
        .catch(error => console.error('Unable to add user.', error));

    closeInputAdd();
}

// פונקציה לסגירת טופס ההוספה
function closeInputAdd() {
    document.getElementById('addForm').style.display = 'none';
}

// פונקציה למחיקת משתמש
function deleteUser(id) {
    const token = getToken();
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete user.', error));
}

// פונקציה להציג את טופס העריכה למשתמש
function displayEditForm(id) {
    const users = Array.isArray(usersItems) ? usersItems : [usersItems];
    const item = users.find(item => item.id === id);

    // רק משתמשים עם ID זהה יכולים לערוך את פרטיהם
    document.getElementById('edit-username').value = item.username;
    document.getElementById('edit-email').value = item.email;
    document.getElementById('edit-password').value = item.password;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-password').value = item.password;
    document.getElementById('editForm').style.display = 'block';
}

function getCurrentUserId() {
    const token = getToken();
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    }
    return null;
}

function updateUser() {
    const token = getToken();
    const itemId = document.getElementById('edit-id').value;

    const users = Array.isArray(usersItems) ? usersItems : [usersItems];
    const existingUser = users.find(user => user.id == itemId);
    let userRole = existingUser ? existingUser.role : 'User';

    if (parseInt(itemId, 10) === getCurrentUserId()) {
        userRole = userRole;
    }

    const item = {
        id: parseInt(itemId, 10),
        username: document.getElementById('edit-username').value.trim(),
        password: document.getElementById('edit-password').value.trim(),
        email: document.getElementById('edit-email').value.trim(),
        role: userRole
    };

    fetch(uri, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update user.', error));

    closeInput();
    return false;
}
// פונקציה לסגירת טופס העריכה
function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayItems(data) {
    if (userRole == "Admin")
        document.getElementById('addButton').style.display = 'block'

    const tBody = document.getElementById('userItems');
    tBody.innerHTML = '';

    const users = Array.isArray(data) ? data : [data];

    users.forEach(item => {
        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteUser(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.username));

        let td2 = tr.insertCell(1);
        td2.appendChild(document.createTextNode(item.email));

        let td3 = tr.insertCell(2);
        td3.appendChild(document.createTextNode(item.password));

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        if (userRole === 'Admin') {
            let td5 = tr.insertCell(4);
            td5.appendChild(deleteButton);
        }
    });
    usersItems = data;
}

function isTokenValid(token) {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        const exp = payload.exp * 1000; 
        return Date.now() < exp; 
    } catch (e) {
        return false;
    }
}

const logOut = () => {
    localStorage.removeItem("token");
    initPage();
}

function initPage() {
    const token = getToken();
    console.log(isTokenValid(getToken()));
    if (!token || !isTokenValid(token)) {
        // אם אין טוקן או שפג תוקפו, הפניה לדף הלוגין
        window.location.href = 'login.html';
    }
    else
        document.body.classList.add('show');
}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener('DOMContentLoaded', initPage);


// קריאה לפונקציה בעת טעינת הדף
document.addEventListener('DOMContentLoaded', initPage);