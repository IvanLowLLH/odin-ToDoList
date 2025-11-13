class Project {
    constructor(name) {
        this.name = name;
        this.toDos = [];
    }

    addToDo(toDo) {
        this.toDos.push(toDo);
    }
}

export default Project;