let tasks = [];

function renderTasks(filteredTasks = tasks) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'todo-item';

        if (task.isEditing) {
            taskItem.innerHTML = `
                <input class="edit-input" type="text" value="${task.text}" onkeyup="updateTaskText(event, ${index})">
                <button onclick="saveTask(${index})">Save</button>
            `;
        } else {
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
        }

        todoList.appendChild(taskItem);
    });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, isEditing: false });
        newTaskInput.value = '';
        renderTasks();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function editTask(index) {
    tasks[index].isEditing = true;
    renderTasks();
}

function updateTaskText(event, index) {
    tasks[index].text = event.target.value;
}

function saveTask(index) {
    tasks[index].isEditing = false;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function searchTask() {
    const searchInput = document.getElementById('search-task').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchInput));
    renderTasks(filteredTasks);
}

renderTasks();
