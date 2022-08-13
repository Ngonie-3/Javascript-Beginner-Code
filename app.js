
const todoInput = document.querySelector('.todo-input'); 
const todoButton = document.querySelector('.todo-button'); 
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', retainPage);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(Event){
    Event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveToLocalStorage(todoInput.value);
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i/>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"><i/>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
    todoInput.value="";
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'delete-btn'){
        item.parentElement.classList.add("fall");
        removeLocalStorageTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove(); 
        });
    }
    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(actionEvent){
    const todoItems = todoList.childNodes;
    todoItems.forEach(function(todo){
        console.log(todo);
        switch(actionEvent.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!(todo.classList.contains("completed"))){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }  
    });
}
 
function saveToLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function retainPage(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i/>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"><i/>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
    });
}

function removeLocalStorageTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todo.childNodes[0].innerText);
    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem('todos', JSON.stringify(todos));
}