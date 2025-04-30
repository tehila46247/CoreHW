
const uri = '/NewbornAccessories';
let newbornAccessories = [];
function getToken() {
    return localStorage.getItem("token");
}

// פונקציה להחזרת פריטים מהממשק
function getItems() {
    const token = getToken();
    fetch(uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            return response.json();
        })
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

// פונקציה להוספת פריט חדש
function addItem() {
    const token = getToken();  // קבלת ה-token
    const addNameTextbox = document.getElementById('add-name');
    const addPriceTextbox = document.getElementById('add-price');
    const addquetionTimeTextbox = document.getElementById('add-quetionTime');

    const item = {
        name: addNameTextbox.value.trim(),
        price: parseFloat(addPriceTextbox.value),
        quetionTime: addquetionTimeTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addPriceTextbox.value = '';
            addquetionTimeTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
    closeInputAdd()

}
function toggleAddForm() {
    const addForm = document.getElementById('addForm');
    if (addForm.style.display === 'none' || addForm.style.display === '') {
        addForm.style.display = 'block';
    } else {
        addForm.style.display = 'none';
    }
}

// פונקציה למחיקת פריט
function deleteItem(id) {
    const token = getToken();
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

// פונקציה להציג את טופס העריכה
function displayEditForm(id) {
    const item = NewbornAccessoriesItems.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-price').value = item.price;
    document.getElementById('edit-quetionTime').value = item.quetionTime;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('editForm').style.display = 'block';
}

// פונקציה לעדכון פריט
function updateItem() {
    const token = getToken();
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-name').value.trim(),
        price: parseFloat(document.getElementById('edit-price').value),
        quetionTime: document.getElementById('edit-quetionTime').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();
    return false;
}

// פונקציה לסגירת טופס העריכה
function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}
function closeInputAdd() {
    document.getElementById('addForm').style.display = 'none';
}

// פונקציה לעדכון מונה הפריטים
function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'NewbornService item' : 'NewbornService items';
}

// פונקציה להצגת המוצרים בטבלה
function _displayItems(data) {
    const tBody = document.getElementById('NewbornAccessoriesItem');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.name));

        let td2 = tr.insertCell(1);
        td2.appendChild(document.createTextNode(item.price));

        let td3 = tr.insertCell(2);
        td3.appendChild(document.createTextNode(item.quetionTime));

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    NewbornAccessoriesItems = data;
}
const logOut = () => {
    localStorage.removeItem("token");
    initPage();
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
function initPage() {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
        // אם אין טוקן, הפניה לדף הלוגין
        window.location.href = 'login.html';
    }
    else
        document.body.classList.add('show');

}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener('DOMContentLoaded', initPage);