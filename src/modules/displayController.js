import projectsArray from './storageProvider';
import Project from './createNewProject';
import Todo from './createNewTodo';
import { add, isToday, isThisWeek } from 'date-fns';

const sideBar = document.querySelector('section');
const btnMenu = document.querySelectorAll('span');
const formNewProject = document.querySelector('.form-new-project');
const formInput = document.querySelector('.project-input');
const btnAddNewProject = document.querySelector('.btn-new-project');
const btnConfirmNewProject = document.querySelector('.confirm-new-project');
const projectsDiv = document.querySelector('.projects');
const projectInputField = document.querySelector('.project-text-input');
const btnAddTodos = document.querySelector('.addTodos');
const todosDiv = document.querySelector('.todosDiv');
const formNewTodo = document.querySelector('.form-new-todo');
const btnConfirmNewTodo = document.querySelector('.confirm-new-todo');
const todoInputField = document.querySelector('.todo-text-input');
const formInputTodo = document.querySelector('.todos-input');

// variables for current active/selected project
let activeProject = '';

// project list functionality
const addNewProject = () => {
  const newProject = new Project(projectInputField.value);
  projectsArray.push(newProject);
};

const removeProjects = () => {
  projectsDiv.innerHTML = '';
};

const renderProjects = () => {
  let projectIndex = 0;
  projectsArray.forEach((project) => {
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('added-project');
    newProjectDiv.dataset.projectId = `${projectIndex}`;
    newProjectDiv.innerHTML = `<i class="fas fa-tasks"></i><div>${project.name}</div><i class="fas fa-times-circle"></i>`;
    newProjectDiv.addEventListener('click', () => {
      renderTodos(project);
    });
    projectsDiv.append(newProjectDiv);
    renderTodos(project);
    projectIndex++;
  });
  console.log(projectsArray);
};

const hideProjectMenuBtn = () => {
  btnAddNewProject.classList.toggle('hide');
  formNewProject.classList.toggle('hide');
};

// todo list functionality
const addNewTodo = () => {
  const newTodo = new Todo(todoInputField.value);
  projectsArray.forEach((project) => {
    if (project.name === activeProject) {
      project.addTodo(newTodo);
    }
  });
};

const removeTodos = () => {
  todosDiv.innerHTML = '';
};

const renderTodos = (project) => {
  removeTodos();
  const todoTitles = document.createElement('div');
  const divForProjectTodos = document.createElement('div');
  todoTitles.classList.add('todo-titles');
  todoTitles.textContent = project.name;
  todosDiv.append(todoTitles);
  activeProject = project.name;
  sideBar.classList.toggle('slide');
  project.todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.innerHTML = todo.title;
    divForProjectTodos.append(todoDiv);
  });
  todosDiv.append(divForProjectTodos);
};

const hideTodoMenuBtn = () => {
  btnAddTodos.classList.toggle('hide');
  formNewTodo.classList.toggle('hide');
};

const renderTodoList = () => {
  const divForProjectTodos = document.createElement('div');
  projectsArray.forEach((project) => {
    console.log(project.todos);
    if (project.title === activeProject) {
      project.todos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.innerHTML = todo.title;
        divForProjectTodos.append(todoDiv);
      });
    }
  });
  todosDiv.append(divForProjectTodos);
};

// event listeners
btnMenu.forEach((btn) => {
  btn.addEventListener('click', () => {
    sideBar.classList.toggle('slide');
  });
});

btnAddNewProject.addEventListener('click', hideProjectMenuBtn);

btnConfirmNewProject.addEventListener('click', () => {
  addNewProject();
  removeProjects();
  renderProjects();
  hideProjectMenuBtn();
  formInput.reset();
});

btnAddTodos.addEventListener('click', hideTodoMenuBtn);

btnConfirmNewTodo.addEventListener('click', () => {
  addNewTodo();
  // removeTodos();
  renderTodoList();
  hideTodoMenuBtn();
  formInputTodo.reset();
});

export {
  btnAddNewProject,
  btnConfirmNewProject,
  btnAddTodos,
  btnConfirmNewTodo,
};
