/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/createNewProject.js":
/*!*****************************************!*\
  !*** ./src/modules/createNewProject.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "addNewProject": () => (/* binding */ addNewProject)
/* harmony export */ });
/* harmony import */ var _storageProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageProvider */ "./src/modules/storageProvider.js");
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayController */ "./src/modules/displayController.js");



class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  getName() {
    return this.name;
  }

  getTodos() {
    return this.todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(datalist) {
    this.todos.splice(datalist, 1);
  }
}

const addNewProject = () => {
  const newProject = new Project(_displayController__WEBPACK_IMPORTED_MODULE_1__.projectInputField.value);
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray.push(newProject);
};




/***/ }),

/***/ "./src/modules/createNewTodo.js":
/*!**************************************!*\
  !*** ./src/modules/createNewTodo.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todo": () => (/* binding */ Todo),
/* harmony export */   "addNewTodo": () => (/* binding */ addNewTodo)
/* harmony export */ });
/* harmony import */ var _storageProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageProvider */ "./src/modules/storageProvider.js");
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayController */ "./src/modules/displayController.js");



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
    _displayController__WEBPACK_IMPORTED_MODULE_1__.todoTitle.value,
    _displayController__WEBPACK_IMPORTED_MODULE_1__.dueDate.value,
    _displayController__WEBPACK_IMPORTED_MODULE_1__.priority.value,
    _displayController__WEBPACK_IMPORTED_MODULE_1__.description.value
  );
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray.forEach((project) => {
    if (project.name === _displayController__WEBPACK_IMPORTED_MODULE_1__.activeProject) {
      project.addTodo(newTodo);
    }
  });
};




/***/ }),

/***/ "./src/modules/displayController.js":
/*!******************************************!*\
  !*** ./src/modules/displayController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "btnAddNewProject": () => (/* binding */ btnAddNewProject),
/* harmony export */   "formNewProject": () => (/* binding */ formNewProject),
/* harmony export */   "btnAddNewTodo": () => (/* binding */ btnAddNewTodo),
/* harmony export */   "formNewTodo": () => (/* binding */ formNewTodo),
/* harmony export */   "projectInputField": () => (/* binding */ projectInputField),
/* harmony export */   "todoTitle": () => (/* binding */ todoTitle),
/* harmony export */   "dueDate": () => (/* binding */ dueDate),
/* harmony export */   "priority": () => (/* binding */ priority),
/* harmony export */   "description": () => (/* binding */ description),
/* harmony export */   "displayProject": () => (/* binding */ displayProject),
/* harmony export */   "activeProject": () => (/* binding */ activeProject)
/* harmony export */ });
/* harmony import */ var _storageProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageProvider */ "./src/modules/storageProvider.js");
/* harmony import */ var _createNewProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNewProject */ "./src/modules/createNewProject.js");
/* harmony import */ var _createNewTodo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createNewTodo */ "./src/modules/createNewTodo.js");





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
const btnCancelNewProject = document.querySelector('.cancel-new-project');
const btnCancelNewTodo = document.querySelector('.cancel-new-todo');
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
          _storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray.splice(projectId, 1);
          button.parentElement.parentElement.remove();
          updateProjectIndex();
          (0,_storageProvider__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
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
          _storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray.forEach((project) => {
            if (project.getName() === activeProject) {
              project.getTodos().splice(todoId, 1);
              button.parentElement.parentElement.remove();
              updateProjectIndex();
              (0,_storageProvider__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
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

const renderTodoList = () => {
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray.forEach((project) => {
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
        deleteTodo();
        updateTodoIndex();
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

formNewProject.addEventListener('submit', (e) => {
  e.preventDefault();
  (0,_createNewProject__WEBPACK_IMPORTED_MODULE_1__.addNewProject)();
  (0,_storageProvider__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
  clearDisplay(projectsDiv);
  displayProject();
  hideMenuButton(btnAddNewProject, formNewProject);
  clearInputs();
});

btnCancelNewProject.addEventListener('click', () => {
  hideMenuButton(btnAddNewProject, formNewProject);
});

btnAddNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

formNewTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  (0,_createNewTodo__WEBPACK_IMPORTED_MODULE_2__.addNewTodo)();
  (0,_storageProvider__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
  clearDisplay(todosDiv);
  renderTodoList();
  hideMenuButton(btnAddNewTodo, formNewTodo);
  clearInputs();
});

btnCancelNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

const displayProject = () => {
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray.forEach((projObj) => {
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




/***/ }),

/***/ "./src/modules/storageProvider.js":
/*!****************************************!*\
  !*** ./src/modules/storageProvider.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectsArray": () => (/* binding */ projectsArray),
/* harmony export */   "saveToLocalStorage": () => (/* binding */ saveToLocalStorage)
/* harmony export */ });
/* harmony import */ var _createNewProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNewProject */ "./src/modules/createNewProject.js");
/* harmony import */ var _createNewTodo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNewTodo */ "./src/modules/createNewTodo.js");



//get local storage from projectsArray and re-convert it into new object
const storedArray = () => JSON.parse(localStorage.getItem('array'));
let projectsArray = (storedArray() || []).map((obj) => {
  const newObjectFromStorage = new _createNewProject__WEBPACK_IMPORTED_MODULE_0__.Project(obj.name);
  obj.todos.forEach((todoFromObj) => {
    const newTodoFromObj = new _createNewTodo__WEBPACK_IMPORTED_MODULE_1__.Todo(
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/displayController */ "./src/modules/displayController.js");



(0,_modules_displayController__WEBPACK_IMPORTED_MODULE_0__.displayProject)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG9FQUFrQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxFQUFFLG1FQUFxQjtBQUN2QjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFjRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbFAyQztBQUNOOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsc0RBQU87QUFDMUM7QUFDQSwrQkFBK0IsZ0RBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFNkM7Ozs7Ozs7VUN0QjdDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7QUFPSjs7QUFFckMsMEVBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU5ld1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZVByb3ZpZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0c0FycmF5IH0gZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHsgcHJvamVjdElucHV0RmllbGQgfSBmcm9tICcuL2Rpc3BsYXlDb250cm9sbGVyJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcmVtb3ZlVG9kbyhkYXRhbGlzdCkge1xuICAgIHRoaXMudG9kb3Muc3BsaWNlKGRhdGFsaXN0LCAxKTtcbiAgfVxufVxuXG5jb25zdCBhZGROZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdElucHV0RmllbGQudmFsdWUpO1xuICBwcm9qZWN0c0FycmF5LnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5leHBvcnQgeyBQcm9qZWN0LCBhZGROZXdQcm9qZWN0IH07XG4iLCJpbXBvcnQgeyBwcm9qZWN0c0FycmF5IH0gZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGFjdGl2ZVByb2plY3QsXG59IGZyb20gJy4vZGlzcGxheUNvbnRyb2xsZXInO1xuXG4vLywgZHVlRGF0ZSwgcHJpb3JpdHlcbmNsYXNzIFRvZG8ge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gIH1cblxuICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5jb25zdCBhZGROZXdUb2RvID0gKCkgPT4ge1xuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oXG4gICAgdG9kb1RpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHkudmFsdWUsXG4gICAgZGVzY3JpcHRpb24udmFsdWVcbiAgKTtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgaWYgKHByb2plY3QubmFtZSA9PT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgcHJvamVjdC5hZGRUb2RvKG5ld1RvZG8pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBUb2RvLCBhZGROZXdUb2RvIH07XG4iLCJpbXBvcnQgeyBwcm9qZWN0c0FycmF5LCBzYXZlVG9Mb2NhbFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2VQcm92aWRlcic7XG5pbXBvcnQgeyBhZGROZXdQcm9qZWN0IH0gZnJvbSAnLi9jcmVhdGVOZXdQcm9qZWN0JztcbmltcG9ydCB7IGFkZE5ld1RvZG8gfSBmcm9tICcuL2NyZWF0ZU5ld1RvZG8nO1xuaW1wb3J0IHsgYWRkLCBpc1RvZGF5LCBpc1RoaXNXZWVrLCBwYXJzZSB9IGZyb20gJ2RhdGUtZm5zJztcblxuY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24nKTtcbmNvbnN0IGJ0bk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuJyk7XG5jb25zdCBmb3JtSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKTtcbmNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWRpdicpO1xuY29uc3QgdG9kb3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MtZGl2Jyk7XG5jb25zdCBidG5BZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQWRkTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbmV3LXRvZG8nKTtcbmNvbnN0IGZvcm1OZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbmV3LXByb2plY3QnKTtcbmNvbnN0IGZvcm1OZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbmV3LXRvZG8nKTtcbmNvbnN0IGJ0bkNhbmNlbE5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBidG5DYW5jZWxOZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbC1uZXctdG9kbycpO1xuY29uc3QgcHJvamVjdElucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10ZXh0LWlucHV0Jyk7XG5jb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZScpO1xuY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWUtZGF0ZScpO1xuY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcbmNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG5cbi8vIHBsYWNlaG9sZGVyIGZvciBjdXJyZW50IGFjdGl2ZS9zZWxlY3RlZCBwcm9qZWN0XG5sZXQgYWN0aXZlUHJvamVjdCA9ICcnO1xuXG4vLyBlbGVtZW50IHV0aWxpdGllc1xuY29uc3QgY2xlYXJJbnB1dHMgPSAoKSA9PiB7XG4gIGZvcm1JbnB1dHMuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjbGVhckRpc3BsYXkgPSAoZSkgPT4ge1xuICBlLmlubmVySFRNTCA9ICcnO1xufTtcblxuY29uc3QgaGlkZU1lbnVCdXR0b24gPSAoZTEsIGUyKSA9PiB7XG4gIC8vIGhhcnVzIGRpIGVkaXQgKGJpa2luIGZ1bmdzaSB0ZXJwaXNhaCB1bnR1ayBtYXNpbmctbWFzaW5nIGVsZW1lbnQgeWFuZyBtYXUgZGktaGlkZSlcbiAgZTEuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBlMi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59O1xuXG5jb25zdCByZW5kZXJQcm9qZWN0cyA9IChwcm9qT2JqKSA9PiB7XG4gIGNvbnN0IG5ld1Byb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgYWRkZWRQcm9qZWN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBidG5EZWxQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdQcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ2FkZGVkLXByb2plY3QnKTtcbiAgYWRkZWRQcm9qZWN0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdhZGRlZC1wcm9qZWN0LXdyYXBwZXInKTtcbiAgYWRkZWRQcm9qZWN0V3JhcHBlci5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdGFza3NcIj48L2k+PGRpdj4ke3Byb2pPYmouZ2V0TmFtZSgpfTwvZGl2PmA7XG4gIGJ0bkRlbFByb2plY3QuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBidG4tZGVsLXByb2plY3RcIj48L2k+YDtcbiAgbmV3UHJvamVjdERpdi5hcHBlbmQoYWRkZWRQcm9qZWN0V3JhcHBlciwgYnRuRGVsUHJvamVjdCk7XG4gIHByb2plY3RzRGl2LmFwcGVuZChuZXdQcm9qZWN0RGl2KTtcbiAgZGVsZXRlUHJvamVjdCgpO1xuICB1cGRhdGVQcm9qZWN0SW5kZXgoKTtcbn07XG5cbmNvbnN0IHNlbGVjdEFjdGl2ZVByb2plY3QgPSAoKSA9PiB7XG4gIGNvbnN0IGFkZGVkUHJvamVjdFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAnLmFkZGVkLXByb2plY3Qtd3JhcHBlcidcbiAgKTtcbiAgYWRkZWRQcm9qZWN0V3JhcHBlcnMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdC5xdWVyeVNlbGVjdG9yKCdkaXYnKS50ZXh0Q29udGVudDtcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY2xlYXJEaXNwbGF5KHRvZG9zRGl2KTtcbiAgICAgIGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0TmFtZTtcbiAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IGFjdGl2ZVByb2plY3Q7XG4gICAgICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlJyk7XG4gICAgICBjaGVja0lmUHJvamVjdEV4aXN0KCk7XG4gICAgICByZW5kZXJUb2RvTGlzdCgpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZVByb2plY3RJbmRleCA9ICgpID0+IHtcbiAgbGV0IHByb2plY3RJbmRleCA9IDA7XG4gIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkZGVkLXByb2plY3QnKTtcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIHByb2plY3Quc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCBgJHtwcm9qZWN0SW5kZXh9YCk7XG4gICAgcHJvamVjdEluZGV4Kys7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlVG9kb0luZGV4ID0gKCkgPT4ge1xuICBsZXQgdG9kb0luZGV4ID0gMDtcbiAgY29uc3QgdG9kb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kbycpO1xuICB0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgdG9kby5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9kbycsIGAke3RvZG9JbmRleH1gKTtcbiAgICB0b2RvSW5kZXgrKztcbiAgfSk7XG59O1xuXG5jb25zdCBwcm9qZWN0RGF0YVZhbCA9IChidXR0b24pID0+IHtcbiAgcmV0dXJuIGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcbn07XG5cbmNvbnN0IGRlbGV0ZVByb2plY3QgPSAoKSA9PiB7XG4gIGNvbnN0IGJ0bkRlbFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWRlbC1wcm9qZWN0Jyk7XG4gIGJ0bkRlbFByb2plY3QuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgaWYgKCFwcm9qZWN0RGF0YVZhbChidXR0b24pKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb25maXJtKFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvamVjdCBhbmQgYWxsIG9mIGl0J3MgdGFza3M/XCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHByb2plY3RJZCA9IHByb2plY3REYXRhVmFsKGJ1dHRvbik7XG4gICAgICAgICAgcHJvamVjdHNBcnJheS5zcGxpY2UocHJvamVjdElkLCAxKTtcbiAgICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgIHVwZGF0ZVByb2plY3RJbmRleCgpO1xuICAgICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICAgIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXIgZmEtaGFuZC1wb2ludC1sZWZ0XCI+PC9pPiBjaG9vc2UgcHJvamVjdGA7XG4gICAgICAgICAgY2xlYXJEaXNwbGF5KHRvZG9zRGl2KTtcbiAgICAgICAgICBhY3RpdmVQcm9qZWN0ID0gJyc7XG4gICAgICAgICAgLy8gc2VsZWN0QWN0aXZlUHJvamVjdCgpO1xuICAgICAgICAgIGNoZWNrSWZQcm9qZWN0RXhpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgdG9kb0RhdGFWYWwgPSAoYnV0dG9uKSA9PiB7XG4gIHJldHVybiBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10b2RvJyk7XG59O1xuXG5jb25zdCBkZWxldGVUb2RvID0gKCkgPT4ge1xuICBjb25zdCBidG5EZWxUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1kZWwtdG9kbycpO1xuICBidG5EZWxUb2RvLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGlmICghdG9kb0RhdGFWYWwoYnV0dG9uKSkge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoY29uZmlybSgnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdGFzaz8nKSkge1xuICAgICAgICAgIGNvbnN0IHRvZG9JZCA9IHRvZG9EYXRhVmFsKGJ1dHRvbik7XG4gICAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5nZXROYW1lKCkgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgICAgICAgICAgcHJvamVjdC5nZXRUb2RvcygpLnNwbGljZSh0b2RvSWQsIDEpO1xuICAgICAgICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgICB1cGRhdGVQcm9qZWN0SW5kZXgoKTtcbiAgICAgICAgICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlclRvZG9MaXN0ID0gKCkgPT4ge1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBpZiAocHJvamVjdC5nZXROYW1lKCkgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgIHByb2plY3QuZ2V0VG9kb3MoKS5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9kb0Rpdi5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG4gICAgICAgIHRvZG9EaXYuaW5uZXJIVE1MID0gYDxoMj4ke3RvZG8uZ2V0VGl0bGUoKX08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkR1ZSBkYXRlOiAke3RvZG8uZ2V0RHVlRGF0ZSgpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Qcmlvcml0eTogJHt0b2RvLmdldFByaW9yaXR5KCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkRlc2NyaXB0aW9uOiAke3RvZG8uZ2V0RGVzY3JpcHRpb24oKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZnVuY3Rpb25zXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBidG4tZWRpdC10b2RvXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoIGJ0bi1kZWwtdG9kb1wiPjwvaT48L2Rpdj5gO1xuICAgICAgICB0b2Rvc0Rpdi5hcHBlbmQodG9kb0Rpdik7XG4gICAgICAgIGRlbGV0ZVRvZG8oKTtcbiAgICAgICAgdXBkYXRlVG9kb0luZGV4KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gZXZlbnQgbGlzdGVuZXJzXG5idG5NZW51LmZvckVhY2goKGJ0bikgPT4ge1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgc2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xuICB9KTtcbn0pO1xuXG5idG5BZGROZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdQcm9qZWN0LCBmb3JtTmV3UHJvamVjdCk7XG59KTtcblxuZm9ybU5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGROZXdQcm9qZWN0KCk7XG4gIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICBjbGVhckRpc3BsYXkocHJvamVjdHNEaXYpO1xuICBkaXNwbGF5UHJvamVjdCgpO1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdQcm9qZWN0LCBmb3JtTmV3UHJvamVjdCk7XG4gIGNsZWFySW5wdXRzKCk7XG59KTtcblxuYnRuQ2FuY2VsTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xufSk7XG5cbmJ0bkFkZE5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbn0pO1xuXG5mb3JtTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGFkZE5ld1RvZG8oKTtcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gIGNsZWFyRGlzcGxheSh0b2Rvc0Rpdik7XG4gIHJlbmRlclRvZG9MaXN0KCk7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbiAgY2xlYXJJbnB1dHMoKTtcbn0pO1xuXG5idG5DYW5jZWxOZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG59KTtcblxuY29uc3QgZGlzcGxheVByb2plY3QgPSAoKSA9PiB7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvak9iaikgPT4ge1xuICAgIHJlbmRlclByb2plY3RzKHByb2pPYmopO1xuICB9KTtcbiAgY2hlY2tJZlByb2plY3RFeGlzdCgpO1xuICBzZWxlY3RBY3RpdmVQcm9qZWN0KCk7XG59O1xuXG5jb25zdCBjaGVja0lmUHJvamVjdEV4aXN0ID0gKCkgPT4ge1xuICBpZiAoYWN0aXZlUHJvamVjdCA9PT0gJycpIHtcbiAgICBidG5BZGROZXdUb2RvLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBidG5BZGROZXdUb2RvLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgZm9ybU5ld1Byb2plY3QsXG4gIGJ0bkFkZE5ld1RvZG8sXG4gIGZvcm1OZXdUb2RvLFxuICBwcm9qZWN0SW5wdXRGaWVsZCxcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGRpc3BsYXlQcm9qZWN0LFxuICBhY3RpdmVQcm9qZWN0LFxufTtcbiIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL2NyZWF0ZU5ld1Byb2plY3QnO1xuaW1wb3J0IHsgVG9kbyB9IGZyb20gJy4vY3JlYXRlTmV3VG9kbyc7XG5cbi8vZ2V0IGxvY2FsIHN0b3JhZ2UgZnJvbSBwcm9qZWN0c0FycmF5IGFuZCByZS1jb252ZXJ0IGl0IGludG8gbmV3IG9iamVjdFxuY29uc3Qgc3RvcmVkQXJyYXkgPSAoKSA9PiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcnJheScpKTtcbmxldCBwcm9qZWN0c0FycmF5ID0gKHN0b3JlZEFycmF5KCkgfHwgW10pLm1hcCgob2JqKSA9PiB7XG4gIGNvbnN0IG5ld09iamVjdEZyb21TdG9yYWdlID0gbmV3IFByb2plY3Qob2JqLm5hbWUpO1xuICBvYmoudG9kb3MuZm9yRWFjaCgodG9kb0Zyb21PYmopID0+IHtcbiAgICBjb25zdCBuZXdUb2RvRnJvbU9iaiA9IG5ldyBUb2RvKFxuICAgICAgdG9kb0Zyb21PYmoudGl0bGUsXG4gICAgICB0b2RvRnJvbU9iai5kdWVEYXRlLFxuICAgICAgdG9kb0Zyb21PYmoucHJpb3JpdHksXG4gICAgICB0b2RvRnJvbU9iai5kZXNjcmlwdGlvblxuICAgICk7XG4gICAgbmV3T2JqZWN0RnJvbVN0b3JhZ2UuYWRkVG9kbyhuZXdUb2RvRnJvbU9iaik7XG4gIH0pO1xuICByZXR1cm4gbmV3T2JqZWN0RnJvbVN0b3JhZ2U7XG59KTtcbmNvbnN0IHNhdmVUb0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FycmF5JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSkpO1xufTtcblxuZXhwb3J0IHsgcHJvamVjdHNBcnJheSwgc2F2ZVRvTG9jYWxTdG9yYWdlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG1vbnRoc1RvWWVhcnMgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBmb3JtTmV3UHJvamVjdCxcbiAgYnRuQWRkTmV3VG9kbyxcbiAgZm9ybU5ld1RvZG8sXG4gIGRpc3BsYXlQcm9qZWN0LFxufSBmcm9tICcuL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXInO1xuXG5kaXNwbGF5UHJvamVjdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9