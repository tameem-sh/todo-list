let taskToDo = document.querySelector("#inputtask");
let add = document.querySelector("#addBtn");
let tasksContainer = document.querySelector("#todo-container");

// array which stores every task
let tasks = [];

add.addEventListener("click", () => {
    if (taskToDo.value !== '') {
        // Make Task Object
        const todo = {
            id: Date.now(),
            name: taskToDo.value,
            completed: false
        }
        // Add Task Object To Tasks Array
        tasks.push(todo);
        // Render Tasks Array To Screen
        addToLocalStorage(tasks);
        // Empty Input Field
        taskToDo.value = "";
    }
})


// Function To Render Tasks To Screen
function renderTodos(tasks) {
    // Empty Tasks Container
    tasksContainer.innerHTML = '';

    // Run Through Each Item Inside Tasks Array
    tasks.forEach((item) => {
        // Create Task Element
        let task = document.createElement("li");
        task.className = 'task';
        task.setAttribute('data-key', item.id);
        task.setAttribute('data-completed', item.completed);

        if (item.completed == true) {
            task.classList.add('done');
        }
        task.innerHTML = `
                ${item.name}
                <span>
                    <i class="fa-solid fa-check"></i>
                    <i class="fa-solid fa-trash-can"></i>
                </span>
                `;
        // Add Task To Tasks List
        tasksContainer.appendChild(task);
    });
}


// Function To Add Tasks To LocalStorage
function addToLocalStorage(tasks) {
    // conver the array to string then store it.
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // render them to screen
    renderTodos(tasks);
}


// function To Get Everything From LocalStorage
function getFromLocalStorage() {
    let savedTasks = localStorage.getItem('tasks');
    // If There Is Saved Tasks
    if (savedTasks) {
        // Convert Tasks Back To Array & render them to screen
        let saved = JSON.parse(savedTasks);
        renderTodos(saved);
    }
}
// Initially Get Everything From LocalStorage
getFromLocalStorage();



// Delete & Done Tasks
tasksContainer.addEventListener('click', (event) => {
    // Get Task Id
    let taskId = event.target.parentElement.parentElement.getAttribute('data-key');

    // Check If That Is Delete
    if (event.target.classList.contains('fa-trash-can')) {
        // Get Saved Tasks
        let savedTasks = localStorage.getItem('tasks');
        // Convert Tasks Back To Array & render them to screen
        let saved = JSON.parse(savedTasks);
        // Rebuld Tasks Array Whiout Task That Have This Id
        tasks = saved.filter((ele) => {
            return ele.id != taskId;
        })
        // Update LoclStorage 
        addToLocalStorage(tasks);
    }

    // Check If That Is Done
    if (event.target.classList.contains('fa-check')) {
        // Get Saved Tasks
        let savedTasks = localStorage.getItem('tasks');
        // Convert Tasks Back To Array & render them to screen
        let saved = JSON.parse(savedTasks);
        // Rebuld Tasks Array Whiout Task That Have This Id
        saved.forEach((ele) => {
            if (ele.id == taskId) {
                ele.completed === false ? ele.completed = true : ele.completed = false;
            }
        })
        // Update LoclStorage
        addToLocalStorage(saved);
    }
})