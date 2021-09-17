import { projectsArray } from './storageProvider';
import {
  todoTitle,
  dueDate,
  priority,
  description,
  activeProject,
} from './displayController';

//, dueDate, priority
class Todo {
  constructor(title, dueDate, priority, description) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
  }

  getTitle() {
    return this.title;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.priority;
  }

  getDescription() {
    return this.description;
  }
}

const addNewTodo = () => {
  const newTodo = new Todo(
    todoTitle.value,
    dueDate.value,
    priority.value,
    description.value
  );
  projectsArray.forEach((project) => {
    if (project.name === activeProject) {
      project.addTodo(newTodo);
    }
  });
};

export { Todo, addNewTodo };
