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