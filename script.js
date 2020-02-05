alert('Баг с удалением// Баг с дубликатами действий')


let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    dlt = document.querySelector('.dlt');
let todoList = [];


if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
}

addButton.addEventListener('click', function () {
    if (!addMessage.value) return alert('Ваше действие не может быть пустой строкой, у вас же не лапки !');
    const newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }
    addMessage.value = '';
    todoList.push(newTodo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessage() {
    let displayMessage = '';
    if (todoList.length === 0) {
        todo.innerHTML = '';
    }

    todoList.forEach(function (item, index) {
        displayMessage += `
        <li class='li'>
        <input type="checkbox" id="item_${index}" class="checkbox" ${item.checked ? 'checked' : ''}>
        <label for='item_${index}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('click', function(event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            let yesNo = confirm('Точно хочешь удалить ?')
            if(yesNo === true) todoList.splice(i, 1);
            else return;
            displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('change', function (e) {
    let idInput = e.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;
    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
});