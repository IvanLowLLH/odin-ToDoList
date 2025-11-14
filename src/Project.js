class Project {
    constructor(name) {
        this.name = name;
        this.toDos = [];

        this.id = crypto.randomUUID();
    }

    addToDo(toDo) {
        this.toDos.push(toDo);
    }
}

export default Project;