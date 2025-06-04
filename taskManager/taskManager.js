document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const logoutButton = document.getElementById('logoutButton');
    const authDiv = document.getElementById('auth');
    const taskManagerDiv = document.getElementById('taskManager');

    let currentUser = null;

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username !== '' && password !== '') {
            loginUser(username, password);
        }
    });

    registerButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username !== '' && password !== '') {
            registerUser(username, password);
        }
    });

    logoutButton.addEventListener('click', () => {
        logoutUser();
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const descriptionText = descriptionInput.value.trim();
        if (taskText !== '' && descriptionText !== '') {
            addTask(taskText, descriptionText);
            taskInput.value = '';
            descriptionInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const action = e.target.dataset.action;
            const taskItem = e.target.parentElement;

            if (action === 'delete') {
                taskList.removeChild(taskItem);
                saveTasks();
            } else if (action === 'edit') {
                editTask(taskItem);
            }
        }
    });

    function registerUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            alert('User already exists');
        } else {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            alert('User registered successfully');
        }
    }

    function loginUser(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username] === password) {
            currentUser = username;
            authDiv.style.display = 'none';
            taskManagerDiv.style.display = 'block';
            loadTasks();
        } else {
            alert('Invalid username or password');
        }
    }

    function logoutUser() {
        currentUser = null;
        authDiv.style.display = 'flex';
        taskManagerDiv.style.display = 'none';
        taskList.innerHTML = '';
    }

    function addTask(taskText, descriptionText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span><strong>Task:</strong> ${taskText}</span>
            <span><strong>Description:</strong> ${descriptionText}</span>
            <button data-action="edit">Edit</button>
            <button data-action="delete">Delete</button>
        `;
        taskList.appendChild(taskItem);
        saveTasks();
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('span:nth-child(1)').textContent.replace('Task: ', '');
        const descriptionText = taskItem.querySelector('span:nth-child(2)').textContent.replace('Description: ', '');
        const newTaskText = prompt('Edit your task:', taskText);
        const newDescriptionText = prompt('Edit your description:', descriptionText);
        if (newTaskText !== null && newTaskText.trim() !== '' && newDescriptionText !== null && newDescriptionText.trim() !== '') {
            taskItem.querySelector('span:nth-child(1)').textContent = `Task: ${newTaskText.trim()}`;
            taskItem.querySelector('span:nth-child(2)').textContent = `Description: ${newDescriptionText.trim()}`;
            saveTasks();
        }
    }

    function saveTasks() {
        if (currentUser) {
            const tasks = [];
            taskList.querySelectorAll('.task-item').forEach(taskItem => {
                const taskText = taskItem.querySelector('span:nth-child(1)').textContent.replace('Task: ', '');
                const descriptionText = taskItem.querySelector('span:nth-child(2)').textContent.replace('Description: ', '');
                tasks.push({ taskText, descriptionText });
            });
            localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        if (currentUser) {
            const tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
            taskList.innerHTML = '';
            tasks.forEach(task => addTask(task.taskText, task.descriptionText));
        }
    }
});