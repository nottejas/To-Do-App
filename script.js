// Get DOM elements
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const doneList = document.getElementById('done-list');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="done-button">Done</button>
        `;
        taskList.appendChild(li);

        // Save the task to localStorage
        saveTaskToLocalStorage(taskText);

        // Clear the input field
        taskInput.value = '';

        // Add event listener to "Done" button
        const doneButton = li.querySelector('.done-button');
        doneButton.addEventListener('click', () => {
            markTaskAsDone(li);
        });
    }
}

// Function to mark a task as done
function markTaskAsDone(li) {
    const taskText = li.querySelector('span').textContent;
    const doneLi = document.createElement('li');
    doneLi.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-button">Delete</button>
    `;
    doneList.appendChild(doneLi);
    taskList.removeChild(li);

    // Remove the task from localStorage and update completed tasks
    removeTaskFromLocalStorage(taskText);
    updateCompletedTasksInLocalStorage(taskText);

    // Add event listener to delete button
    const deleteButton = doneLi.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        doneList.removeChild(doneLi);
        removeCompletedTaskFromLocalStorage(taskText);
    });
}

// Event listener for adding a task
addTaskButton.addEventListener('click', addTask);

// Event listener for Enter key press in the input field
taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Function to save a task to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = tasks.filter(task => task !== taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update completed tasks in localStorage
function updateCompletedTasksInLocalStorage(taskText) {
    let completedTasks;
    if (localStorage.getItem('completedTasks') === null) {
        completedTasks = [];
    } else {
        completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }

    completedTasks.push(taskText);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to remove a completed task from localStorage
function removeCompletedTaskFromLocalStorage(taskText) {
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks'));

    completedTasks = completedTasks.filter(task => task !== taskText);

    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to load tasks from localStorage on page load
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks !== null) {
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="done-button">Done</button>
            `;
            taskList.appendChild(li);

            // Add event listener to "Done" button
            const doneButton = li.querySelector('.done-button');
            doneButton.addEventListener('click', () => {
                markTaskAsDone(li);
            });
        });
    }
}

// Function to load completed tasks from localStorage on page load
function loadCompletedTasksFromLocalStorage() {
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks'));

    if (completedTasks !== null) {
        completedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="delete-button">Delete</button>
            `;
            doneList.appendChild(li);

            // Add event listener to delete button
            const deleteButton = li.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                doneList.removeChild(li);
                removeCompletedTaskFromLocalStorage(taskText);
            });
        });
    }
}

// Load tasks and completed tasks from localStorage on page load
loadTasksFromLocalStorage();
loadCompletedTasksFromLocalStorage();
a