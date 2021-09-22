import { Project } from './createNewProject';
import { Todo } from './createNewTodo';

//get local storage from projectsArray and re-convert it into new object
const storedArray = () => JSON.parse(localStorage.getItem('array'));

let projectsArray = (storedArray() || []).map((obj) => {
  const newObjectFromStorage = new Project(obj.name);
  const projectTodos = obj.todos;
  projectTodos.forEach((todoFromObj) => {
    const newTodoFromObj = new Todo(
      todoFromObj.title,
      todoFromObj.dueDate,
      todoFromObj.priority,
      todoFromObj.description
    );
    newObjectFromStorage.addTodo(newTodoFromObj);
  });
  return newObjectFromStorage;
});

const saveToLocalStorage = () => {
  localStorage.setItem('array', JSON.stringify(projectsArray));
};

export { projectsArray, saveToLocalStorage };
