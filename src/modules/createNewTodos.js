import { toDate, isToday, isThisWeek } from 'date-fns';

class Todos {
  constructor(title, description, dueDate, priority, checklist = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  getTitle() {
    return this.title;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getDescription() {
    return this.description;
  }
}

export default Todos;
