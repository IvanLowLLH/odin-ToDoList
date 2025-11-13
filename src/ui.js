import * as appLogic from './appLogic.js';

function renderCurrentProjectToDos() {
    const todoListContainer = document.querySelector('#todo-card-container');
    todoListContainer.innerHTML = ''; // Clear current list

    // ADD sorting for priority and date

    const toDos = appLogic.getToDosFromCurrentProject();
    toDos.forEach((toDo, index) => {
        const toDoCard = document.createElement("div");
        toDoCard.dataset.id = index;
        toDoCard.classList.add("toDo-card");
        
        // ADD card expansion and delete button
        toDoCard.innerHTML = `
            <div 
                class="priority-bar" 
                style="--priority-color: ${
                toDo.priority === 3 ? '#ff6961' : 
                toDo.priority === 2 ? '#ffb347' : 
                '#77dd77'
                }"
            ></div>
            <div class="card-top">
                <h1 class="toDo-title">${toDo.title}</h1>
                <p class="toDo-due-date">Due Date: ${toDo.dueDate}</p>
            </div>
            <div class="card-bottom">
                <p>Placeholder for more details.</p>
            </div>
        `;
        todoListContainer.appendChild(toDoCard);
    })
};

export function loadUI() {
    renderCurrentProjectToDos();
}