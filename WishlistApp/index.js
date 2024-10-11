// Select the input field and add button elements
let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");

// Declare a variable to store the todo item input by the user
let todoList = [];

// Function to generate a unique identifier (UUID) for each todo item
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Event listener for adding a todo
addTodoButton.addEventListener("click", (e) => { 
    e.preventDefault(); // Prevent the page from refreshing when the form is submitted
    let whatTodo = todoInput.value; // Capture the value entered in the input field
    if (whatTodo.length > 0) {
        todoList.push({
            whatTodo,  // Store the todo item text
            id: uuid(), // Assign a unique ID using the uuid function
            isCompleted: false  // Mark the new todo as not completed by default
        });
        renderTodoList(todoList);                      // Render the updated todo list
        todoInput.value = '';                          // Clear the input field after adding a todo
    }
});

// Event listener for toggling the completion status
showTodos.addEventListener("click", (e) => {
    // if (e.target.type === 'checkbox') { // Check if the clicked element is a checkbox
        let key = e.target.dataset.key;                     // Get the unique ID from the data-key attribute
        let deleteTodoKey = e.target.dataset.todokey; 
        todoList = todoList.map(todo => 
            todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        
            todoList = todoList.filter(todo => todo.id!== deleteTodoKey);
        
        renderTodoList(todoList);                            // Render the updated todo list
    }
);

// Function to render the todo items in the UI
function renderTodoList(todoList) {    
    showTodos.innerHTML = todoList.map(({ id, whatTodo, isCompleted }) => `
        <div>
            <input id="item-${id}" type="checkbox" data-key="${id}" ${isCompleted ? "checked" : ""}>
            <label for="item-${id}" class="todo ${isCompleted ? "checked-todo" : ""}" data-key="${id}">${whatTodo}</label>
            <button class="dlt-btn" data-todokey="${id}">Delete</button>
        </div>
    `).join(''); // Join the array of HTML strings into one large string
}

// Initial render to show an empty list
renderTodoList(todoList);
