import { toDate, isToday, isThisWeek } from 'date-fns';

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(datalist) {
    this.todos.splice(datalist, 1);
  }
}

export default Project;
