import ToDo from "./Todo.js"
import Project from "./Project.js"

const projects = [];
let currentProject = null;

function _createDefaultProject() {
    const project = new Project("Default");
    projects.push(project);
    currentProject = project;
}

export function initialiseApp() {
    if (projects.length == 0) {
        console.log("Init App with Default");
        _createDefaultProject();
    }
}

export function initialiseAppWithDummy() {
    // Placeholder to-dos
    _createDefaultProject();
    const toDoData = {
        title: "Finish Odin Project",
        description: "Continue JavaScript training",
        dueDate: "2025-12-15",
        priority: "3"
    };

    const toDoData2 = {
        title: "Read documentation on JS classes",
        description: "",
        dueDate: "2025-11-30",
        priority: "1"
    };
    addToDoToCurrentProject(toDoData);
    addToDoToCurrentProject(toDoData2);
}

export function addProject(name) {
    const project = new Project(name);
    projects.push(project);
}

export function addToDoToCurrentProject(todoData) {
    const newTodo = new ToDo(
    todoData.title, 
    todoData.description, 
    todoData.dueDate, 
    todoData.priority
  );
  currentProject.addToDo(newTodo);
}

export function getProjects() {
    return projects;
}

export function getToDosFromCurrentProject() {
    return currentProject.toDos;
}

export function removeToDoFromCurrentProject(toDo_id) {
    const projectToDos = currentProject.toDos;
    const toDoIndex = projectToDos.findIndex(toDo => toDo.id === toDo_id);
    if (toDoIndex > -1) {
        currentProject.toDos.splice(toDoIndex, 1);
    };
}