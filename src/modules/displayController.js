import { projectsArray, saveToLocalStorage } from './storageProvider';
import { addNewProject } from './createNewProject';
import { addNewTodo } from './createNewTodo';
import { isToday, isThisWeek, parseISO } from 'date-fns';

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
const formEditTodo = document.querySelector('.form-edit-todo');
const btnCancelNewProject = document.querySelector('.cancel-new-project');
const btnCancelNewTodo = document.querySelector('.cancel-new-todo');
const projectInputField = document.querySelector('.project-text-input');

const todoTitle = document.querySelector('#todo-title');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');
const description = document.querySelector('#description');

const editTodoTitle = document.querySelector('#edit-todo-title');
const editDueDate = document.querySelector('#edit-due-date');
const editPriority = document.querySelector('#edit-priority');
const editDescription = document.querySelector('#edit-description');

const modalDiv = document.querySelector('.modal-edit-todo');
const btnCancelEdit = document.querySelector('.cancel-edit-todo');

const isTodayButton = document.querySelector('.is-today');
const isThisWeekButton = document.querySelector('.is-this-week');

// placeholder for current active/selected project or todos
let activeProject = '';
let activeTodos = '';
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
  // harus di edit (bikin fungsi terpisah untuk masing-masing element yang mau di-hide)
  e1.classList.toggle('hide');
  e2.classList.toggle('hide');
};

const renderProjects = (projObj) => {
  const newProjectDiv = document.createElement('div');
  const addedProjectWrapper = document.createElement('div');
  const btnDelProject = document.createElement('span');
  newProjectDiv.classList.add('added-project');
  addedProjectWrapper.classList.add('added-project-wrapper');
  addedProjectWrapper.innerHTML = `<i class="fas fa-tasks"></i><div>${projObj.getName()}</div>`;
  btnDelProject.innerHTML = `<i class="fas fa-times-circle btn-del-project"></i>`;
  newProjectDiv.append(addedProjectWrapper, btnDelProject);
  projectsDiv.append(newProjectDiv);
  deleteProject();
  updateProjectIndex();
};

const selectActiveProject = () => {
  const addedProjectWrappers = document.querySelectorAll(
    '.added-project-wrapper'
  );
  addedProjectWrappers.forEach((project) => {
    const projectName = project.querySelector('div').textContent;
    project.addEventListener('click', () => {
      clearDisplay(todosDiv);
      activeProject = projectName;
      projectTitle.textContent = activeProject;
      section.classList.toggle('slide');
      checkIfProjectExist();
      renderTodoList();
    });
  });
};

const updateProjectIndex = () => {
  let projectIndex = 0;
  const projects = document.querySelectorAll('.added-project');
  projects.forEach((project) => {
    project.setAttribute('data-project', `${projectIndex}`);
    projectIndex++;
  });
};

const updateTodoIndex = () => {
  let todoIndex = 0;
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo) => {
    todo.setAttribute('data-todo', `${todoIndex}`);
    todoIndex++;
  });
};

const projectDataVal = (button) => {
  return button.parentElement.parentElement.getAttribute('data-project');
};

const deleteProject = () => {
  const btnDelProject = document.querySelectorAll('.btn-del-project');
  btnDelProject.forEach((button) => {
    if (!projectDataVal(button)) {
      button.addEventListener('click', () => {
        if (
          confirm("Do you want to delete this project and all of it's tasks?")
        ) {
          const projectId = projectDataVal(button);
          projectsArray.splice(projectId, 1);
          button.parentElement.parentElement.remove();
          updateProjectIndex();
          saveToLocalStorage();
          projectTitle.innerHTML = `<i class="far fa-hand-point-left"></i> choose project`;
          clearDisplay(todosDiv);
          activeProject = '';
          // selectActiveProject();
          checkIfProjectExist();
        }
      });
    } else {
      return;
    }
  });
};

const todoDataVal = (button) => {
  return button.parentElement.parentElement.getAttribute('data-todo');
};

const deleteTodo = () => {
  const btnDelTodo = document.querySelectorAll('.btn-del-todo');
  btnDelTodo.forEach((button) => {
    if (!todoDataVal(button)) {
      button.addEventListener('click', () => {
        if (confirm('Do you want to delete this task?')) {
          const todoId = todoDataVal(button);
          projectsArray.forEach((project) => {
            if (project.getName() === activeProject) {
              project.getTodos().splice(todoId, 1);
              button.parentElement.parentElement.remove();
              updateProjectIndex();
              saveToLocalStorage();
            } else {
              return;
            }
          });
        }
      });
    } else {
      return;
    }
  });
};

const editTodo = () => {
  const btnEditTodo = document.querySelectorAll('.btn-edit-todo');
  btnEditTodo.forEach((button) => {
    if (!todoDataVal(button)) {
      button.addEventListener('click', () => {
        modalDiv.classList.toggle('hide');
        const todoId = todoDataVal(button);
        activeTodos = todoDataVal(button);
        projectsArray.forEach((project) => {
          if (project.getName() === activeProject) {
            editTodoTitle.value = project.getTodos()[todoId].getTitle();
            editDueDate.value = project.getTodos()[todoId].getDueDate();
            editPriority.value = project.getTodos()[todoId].getPriority();
            editDescription.value = project.getTodos()[todoId].getDescription();
          }
        });
      });
    }
  });
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
                            <div class="todo-functions"><i class="fas fa-edit btn-edit-todo"></i>
                            <i class="fas fa-trash btn-del-todo"></i></div>`;
        todosDiv.append(todoDiv);
        editTodo();
        deleteTodo();
        updateTodoIndex();
      });
    }
  });
};

const renderCategorizedTodoList = (todo, project) => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.innerHTML = `<h2>${todo.getTitle()}</h2>
                            <p>Due date: ${todo.getDueDate()}</p>
                            <p>Priority: ${todo.getPriority()}</p>
                            <p>Description: ${todo.getDescription()}</p>
                            <div>On project: ${project.getName()}</div>`;
  todosDiv.append(todoDiv);
};

const editTodosData = () => {
  projectsArray.forEach((project) => {
    if (project.getName() === activeProject) {
      const selectedTodosObject = project.getTodos()[parseInt(activeTodos)];
      selectedTodosObject.setTitle(editTodoTitle.value);
      selectedTodosObject.setDueDate(editDueDate.value);
      selectedTodosObject.setPriority(editPriority.value);
      selectedTodosObject.setDescription(editDescription.value);
    }
  });
  modalDiv.classList.toggle('hide');
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

formNewProject.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewProject();
  saveToLocalStorage();
  clearDisplay(projectsDiv);
  displayProject();
  hideMenuButton(btnAddNewProject, formNewProject);
  clearInputs();
});

btnCancelNewProject.addEventListener('click', () => {
  clearInputs();
  hideMenuButton(btnAddNewProject, formNewProject);
});

btnAddNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

formNewTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewTodo();
  saveToLocalStorage();
  clearDisplay(todosDiv);
  renderTodoList();
  hideMenuButton(btnAddNewTodo, formNewTodo);
  clearInputs();
});

formEditTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  editTodosData();
  clearDisplay(todosDiv);
  renderTodoList();
  clearInputs();
  saveToLocalStorage();
});

btnCancelNewTodo.addEventListener('click', () => {
  clearInputs();
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

btnCancelEdit.addEventListener('click', () => {
  clearInputs();
  modalDiv.classList.toggle('hide');
});

const displayProject = () => {
  projectsArray.forEach((projObj) => {
    renderProjects(projObj);
  });
  checkIfProjectExist();
  selectActiveProject();
};

const checkIfProjectExist = () => {
  if (activeProject === '') {
    btnAddNewTodo.classList.add('hide');
  } else {
    btnAddNewTodo.classList.remove('hide');
  }
};

//date-fns function isToday isThisWeek

isTodayButton.addEventListener('click', () => {
  activeProject = '';
  checkIfProjectExist();
  clearDisplay(todosDiv);
  projectTitle.innerHTML = 'What todo today?';
  section.classList.toggle('slide');
  projectsArray.forEach((project) => {
    project.getTodos().forEach((todo) => {
      if (isToday(parseISO(todo.getDueDate()))) {
        renderCategorizedTodoList(todo, project);
      }
    });
  });
});

isThisWeekButton.addEventListener('click', () => {
  activeProject = '';
  checkIfProjectExist();
  clearDisplay(todosDiv);
  projectTitle.innerHTML = 'What todo this week?';
  section.classList.toggle('slide');
  projectsArray.forEach((project) => {
    project.getTodos().forEach((todo) => {
      if (isThisWeek(parseISO(todo.getDueDate()))) {
        renderCategorizedTodoList(todo, project);
      }
    });
  });
});

export {
  btnAddNewProject,
  formNewProject,
  btnAddNewTodo,
  formNewTodo,
  projectInputField,
  todoTitle,
  dueDate,
  priority,
  description,
  displayProject,
  activeProject,
};
