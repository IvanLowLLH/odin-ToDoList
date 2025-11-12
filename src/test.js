import {initialiseApp, getProjects, addToDoToCurrentProject} from "./appLogic.js"

initialiseApp();
const projects = getProjects();
console.log(projects);

const toDoData = {
    title: "Test",
    description: "Test to-do item",
    dueDate: "Jan",
    priority: "Urgent"
};

addToDoToCurrentProject(toDoData);
const projects_1 = getProjects();
console.log(projects_1);