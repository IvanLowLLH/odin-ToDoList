import * as appLogic from './appLogic.js';
import trashIcon from './imgs/trash-can-outline.svg'

function renderCurrentProjectToDos() {
    const todoListContainer = document.querySelector('#todo-card-container');
    todoListContainer.innerHTML = ''; // Clear current list

    // ADD sorting for priority and date

    const toDos = appLogic.getToDosFromCurrentProject();
    toDos.forEach((toDo, index) => {
        const toDoCard = document.createElement("div");
        toDoCard.setAttribute("id", toDo.id);
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
                 <button type="button" class="delete-btn">
                    <img class="trash-icon">
                </button>
            </div>
            <p class="toDo-due-date">Due Date: ${toDo.dueDate}</p>
            
            <div class="card-bottom">
                <div class="card-description">
                    <p>Description: ${toDo.description}</p>
                </div>

                <div class="card-bottom details-btn">
                    Details <span class="arrow">&gt;</span>
                </div>
            </div>
        `;
        const trashBtnImg = toDoCard.querySelector('.trash-icon');
        trashBtnImg.src = trashIcon;

        const detailsBtn = toDoCard.querySelector('.details-btn');
        
        detailsBtn.addEventListener('click', () => {
            // Toggle the active class on the parent card
            toDoCard.classList.toggle('active');
        });
        todoListContainer.appendChild(toDoCard);
    })
};

function setupToDoCardEventListeners() {
    const ToDoContainer = document.querySelector("#todo-card-container");
    ToDoContainer.addEventListener("click", (event) => {
        const target = event.target;
        const card = target.closest(".toDo-card");

        // Check if a card was found before trying to access its properties
        if (card) {
            const card_id = card.id;
            if (target.classList.contains("delete-btn") || target.closest(".delete-btn")) {
                const cardToRemove = document.getElementById(card_id);
                if (cardToRemove) {
                    cardToRemove.remove();
                }
                appLogic.removeToDoFromCurrentProject(card_id);
            }
        }
        else {
            return;
        }
    })
}

export function loadUI() {
    renderCurrentProjectToDos();
    setupToDoCardEventListeners()
}