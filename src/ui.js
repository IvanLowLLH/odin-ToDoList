import * as appLogic from './appLogic.js';
import trashIcon from './imgs/trash-can-outline.svg'

const todoListContainer = document.querySelector('#todo-card-container');

function renderCurrentProjectToDos() {
    todoListContainer.innerHTML = ''; // Clear current list

    // ADD sorting for priority and date

    const toDos = appLogic.getToDosFromCurrentProject();
    toDos.forEach((toDo, index) => {
        renderNewToDo(toDo)
    })
};

function renderNewToDo(toDo) {
    const toDoCard = document.createElement("div");
    toDoCard.setAttribute("id", toDo.id);
    toDoCard.classList.add("toDo-card");

    //Format date
    const date = new Date(toDo.dueDate); // Or your specific date object
    const formattedDueDateDate = date.toLocaleDateString('en-GB'); 
    const formattedDateAdded = toDo.dateAdded.toLocaleDateString('en-GB'); 

    toDoCard.innerHTML = `
        <div 
            class="priority-bar" 
            style="--priority-color: ${
            toDo.priority === "3" ? '#ff6961' : 
            toDo.priority === "2" ? '#ffb347' : 
            '#77dd77'
            }"
        ></div>
        <div class="card-top">
            <h1 class="toDo-title">${toDo.title}</h1>
                <button type="button" class="delete-btn">
                <img class="trash-icon">
            </button>
        </div>
        <p class="toDo-due-date">Due Date: ${formattedDueDateDate}</p>
        <p class="toDo-due-date">Date Added: ${formattedDateAdded}</p>
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
    todoListContainer.appendChild(toDoCard);
}

function setupToDoCardEventListeners() {
    todoListContainer.addEventListener("click", (event) => {
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
            } else if (target.classList.contains("details-btn") || target.closest(".details-btn")) {
                const cardToExpand = document.getElementById(card_id);
                cardToExpand.classList.toggle('active');
            }
        }
        else {
            return;
        }
    })
}

function setupAddToDoEvent() {
    const addToDoBtn = document.querySelector("#add-todo-btn");
    const dialog = document.querySelector("dialog");
    addToDoBtn.addEventListener("click", () => {
        dialog.showModal();
    })

    const confirmBtn = document.querySelector("#confirm-btn");
    const toDoTitleInput = document.querySelector("#todo-title-form");
    const toDoDueDateInput = document.querySelector("#todo-due-date-form");
    const toDoDescriptionInput = document.querySelector("#todo-description-form");
    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const priorityInput = document.querySelector('input[name="todo-priority"]:checked');
        const toDoData = {
            title: toDoTitleInput.value,
            description: toDoDescriptionInput.value,
            dueDate: toDoDueDateInput.value,
            priority: priorityInput.value
        };
        appLogic.addToDoToCurrentProject(toDoData);
        renderNewToDo(appLogic.getToDosFromCurrentProject().at(-1));

        // Clear form fields
        const inputElements = dialog.querySelectorAll('input, textarea, select');
        inputElements.forEach(element => {
            if (element.type !== 'submit' && element.type !== 'button' && element.type !== 'radio') {
                element.value = '';
            }
        });

        dialog.close();
    })
}

export function loadUI() {
    renderCurrentProjectToDos();
    setupToDoCardEventListeners();
    setupAddToDoEvent();
}