import projectsArray from './storageProvider';
import addNewProject from './createNewProject';
import addNewTodo from './createNewTodo';
import { add, isToday, isThisWeek } from 'date-fns';

const section = document.querySelector('section');
const btnMenu = document.querySelectorAll('span');
const formInputs = document.querySelectorAll('form');
const projectTitle = document.querySelector('.project-title');
const projectsDiv = document.querySelector('.projects-div');
const todosDiv = document.querySelector('.todos-div');
const btnAddNewProject = document.querySelector('.btn-new-project');
const btnAddNewTodo = document.querySelector('.btn-new-todo');
const formNewProject = document.querySelector('.form-new-project');
const formNewTodo = document.querySelector('.form-new-todo');
const btnConfirmNewProject = document.querySelector('.confirm-new-project');
const btnConfirmNewTodo = document.querySelector('.confirm-new-todo');
const projectInputField = document.querySelector('.project-text-input');
const todoTitle = document.querySelector('#todo-title');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const description = document.querySelector('#description');

// placeholder for current active/selected project
let activeProject = '';

// element utilities
const clearInputs = () => {
  formInputs.forEach((form) => {
    form.reset();
  });
};

const clearDisplay = (e) => {
  e.innerHTML = '';
};

const hideMenuButton = (e1, e2) => {
  e1.classList.toggle('hide');
  e2.classList.toggle('hide');
};

const renderProjects = () => {
  let projectIndex = 0;
  projectsArray.forEach((project) => {
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('added-project');
    newProjectDiv.dataset.projectId = `${projectIndex}`;
    newProjectDiv.innerHTML = `<i class="fas fa-tasks"></i><div>${project.getName()}</div><i class="fas fa-times-circle"></i>`;
    newProjectDiv.addEventListener('click', () => {
      renderProjectTitle(project);
      renderTodoList();
    });
    projectsDiv.append(newProjectDiv);
    projectIndex++;
  });
  renderProjectTitle(projectsArray[projectsArray.length - 1]); //automatically render project title after create new project
  console.log(projectsArray);
};

const renderProjectTitle = (project) => {
  clearDisplay(todosDiv);
  projectTitle.textContent = `${project.getName()}:`;
  activeProject = project.getName();
  section.classList.toggle('slide');
};

const renderTodoList = () => {
  projectsArray.forEach((project) => {
    if (project.getName() === activeProject) {
      project.getTodos().forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.innerHTML = `<h2>${todo.getTitle()}</h2>
                            <p>Due date: ${todo.getDueDate()}</p>
                            <p>Priority: ${todo.getPriority()}</p>
                            <p>Description: ${todo.getDescription()}</p>
                            <div class="todo-functions"><i class="fas fa-edit"></i>
                            <i class="fas fa-trash"></i></div>`;
        // todoDiv.textContent = todo.getTitle();
        todosDiv.append(todoDiv);
      });
    }
  });
};

// event listeners
btnMenu.forEach((btn) => {
  btn.addEventListener('click', () => {
    section.classList.toggle('slide');
  });
});

btnAddNewProject.addEventListener('click', () => {
  hideMenuButton(btnAddNewProject, formNewProject);
});

btnConfirmNewProject.addEventListener('click', () => {
  addNewProject();
  clearDisplay(projectsDiv);
  renderProjects();
  hideMenuButton(btnAddNewProject, formNewProject);
  clearInputs();
});

btnAddNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

btnConfirmNewTodo.addEventListener('click', () => {
  addNewTodo();
  clearDisplay(todosDiv);
  renderTodoList();
  hideMenuButton(btnAddNewTodo, formNewTodo);
  clearInputs();
});

export {
  btnAddNewProject,
  btnConfirmNewProject,
  btnAddNewTodo,
  btnConfirmNewTodo,
  projectInputField,
  todoTitle,
  dueDate,
  priority,
  description,
  activeProject,
};
