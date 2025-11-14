class ToDo {
    constructor(title, description, dueDate, priority, dateAdded = null) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;

        this.id = crypto.randomUUID();
        this.dateAdded = dateAdded ? new Date(dateAdded) : new Date();
    }
}

export default ToDo;