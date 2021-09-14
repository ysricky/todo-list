import projectsArray from './storageProvider';
import Project from './createNewProject';
import Todo from './createNewTodo';
import { add, isToday, isThisWeek } from 'date-fns';

const section = document.querySelector('section');
const btnMenu = document.querySelectorAll('span');
const projectsDiv = document.querySelector('.projects-div');
const todosDiv = document.querySelector('.todos-div');
const btnAddNewProject = document.querySelector('.btn-new-project');
const btnAddNewTodo = document.querySelector('.btn-new-todo');
const formNewProject = document.querySelector('.form-new-project');
const formNewTodo = document.querySelector('.form-new-todo');
const btnConfirmNewProject = document.querySelector('.confirm-new-project');
const btnConfirmNewTodo = document.querySelector('.confirm-new-todo');
const projectInputField = document.querySelector('.project-text-input');
const todoInputField = document.querySelector('.todo-text-input');
const formInputProject = document.querySelector('.project-input');
const formInputTodo = document.querySelector('.todos-input');

// placeholder for current active/selected project
let activeProject = '';

// element utilities
const clearDisplay = (e) => {
  e.innerHTML = '';
};

const hideMenuButton = (e1, e2) => {
  e1.classList.toggle('hide');
  e2.classList.toggle('hide');
};

// project list functionality
const addNewProject = () => {
  const newProject = new Project(projectInputField.value);
  projectsArray.push(newProject);
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
    });
    projectsDiv.append(newProjectDiv);
    projectIndex++;
  });
  renderProjectTitle(projectsArray[projectsArray.length-1]); //automatically render project title after create new project
  console.log(projectsArray);
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

const renderProjectTitle = (project) => {
  clearDisplay(todosDiv);
  const projectTitle = document.createElement('div');
  projectTitle.classList.add('project-title');
  projectTitle.textContent = project.getName();
  todosDiv.append(projectTitle);
  activeProject = project.getName();
  section.classList.toggle('slide');
};

// const renderTodoList = () => {
//   const divProjectTodos = document.createElement('div');
//   projectsArray.forEach((project) => {
//     console.log(project.todos);
//     if (project.title === activeProject) {
//       project.todos.forEach((todo) => {
//         const todoDiv = document.createElement('div');
//         todoDiv.innerHTML = todo.title;
//         divForProjectTodos.append(todoDiv);
//       });
//     }
//   });
//   todosDiv.append(divForProjectTodos);
// };

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
  formInputProject.reset();
});

btnAddNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

btnConfirmNewTodo.addEventListener('click', () => {
  addNewTodo();
  clearDisplay(todosDiv);
  // renderTodoList();
  hideMenuButton(btnAddNewTodo, formNewTodo);
  formInputTodo.reset();
});

export {
  btnAddNewProject,
  btnConfirmNewProject,
  btnAddNewTodo,
  btnConfirmNewTodo,
};
