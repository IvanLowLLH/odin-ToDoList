class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addToDo(toDo) {
        this.todos.push(toDo);
    }
}

export default Project;