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

const projectDataVal = (button) => {
  return button.parentElement.parentElement.getAttribute('data-project');
};

const deleteProject = () => {
  const btnDelProject = document.querySelectorAll('.btn-del-project');
  btnDelProject.forEach((button) => {
    if (!projectDataVal(button)) {
      button.addEventListener('click', () => {
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
                            <div class="todo-functions"><i class="fas fa-edit"></i>
                            <i class="fas fa-trash"></i></div>`;
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
  console.log(_storageProvider__WEBPACK_IMPORTED_MODULE_0__.projectsArray);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtEO0FBQ007O0FBRXhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsdUVBQXVCO0FBQ3hELEVBQUUsZ0VBQWtCO0FBQ3BCOztBQUVrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JnQjtBQU9yQjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwrREFBZTtBQUNuQixJQUFJLDZEQUFhO0FBQ2pCLElBQUksOERBQWM7QUFDbEIsSUFBSSxpRUFBaUI7QUFDckI7QUFDQSxFQUFFLG1FQUFxQjtBQUN2Qix5QkFBeUIsNkRBQWE7QUFDdEM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRDBDO0FBQ25CO0FBQ047QUFDYzs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxrQkFBa0I7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxhQUFhO0FBQ3pEO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtFQUFvQjtBQUM1QjtBQUNBO0FBQ0EsUUFBUSxvRUFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEVBQUUsbUVBQXFCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCwyQ0FBMkMsa0JBQWtCO0FBQzdELDJDQUEyQyxtQkFBbUI7QUFDOUQsOENBQThDLHNCQUFzQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSxnRUFBYTtBQUNmLEVBQUUsb0VBQWtCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSwwREFBVTtBQUNaLEVBQUUsb0VBQWtCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsbUVBQXFCO0FBQ3ZCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLDJEQUFhO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBY0U7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZNMkM7QUFDTjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHNEQUFPO0FBQzFDO0FBQ0EsK0JBQStCLGdEQUFJO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRTZDOzs7Ozs7O1VDdEI3QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDO0FBT0o7O0FBRXJDLDBFQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTmV3UHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdUb2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvamVjdHNBcnJheSB9IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCB7IHByb2plY3RJbnB1dEZpZWxkIH0gZnJvbSAnLi9kaXNwbGF5Q29udHJvbGxlcic7XG5cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRUb2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfVxuXG4gIGFkZFRvZG8odG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG8oZGF0YWxpc3QpIHtcbiAgICB0aGlzLnRvZG9zLnNwbGljZShkYXRhbGlzdCwgMSk7XG4gIH1cbn1cblxuY29uc3QgYWRkTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RJbnB1dEZpZWxkLnZhbHVlKTtcbiAgcHJvamVjdHNBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xufTtcblxuZXhwb3J0IHsgUHJvamVjdCwgYWRkTmV3UHJvamVjdCB9O1xuIiwiaW1wb3J0IHsgcHJvamVjdHNBcnJheSB9IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCB7XG4gIHRvZG9UaXRsZSxcbiAgZHVlRGF0ZSxcbiAgcHJpb3JpdHksXG4gIGRlc2NyaXB0aW9uLFxuICBhY3RpdmVQcm9qZWN0LFxufSBmcm9tICcuL2Rpc3BsYXlDb250cm9sbGVyJztcblxuLy8sIGR1ZURhdGUsIHByaW9yaXR5XG5jbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbikge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxuXG4gIGdldER1ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgfVxuXG4gIGdldFByaW9yaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICB9XG5cbiAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIH1cbn1cblxuY29uc3QgYWRkTmV3VG9kbyA9ICgpID0+IHtcbiAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKFxuICAgIHRvZG9UaXRsZS52YWx1ZSxcbiAgICBkdWVEYXRlLnZhbHVlLFxuICAgIHByaW9yaXR5LnZhbHVlLFxuICAgIGRlc2NyaXB0aW9uLnZhbHVlXG4gICk7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgIHByb2plY3QuYWRkVG9kbyhuZXdUb2RvKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgVG9kbywgYWRkTmV3VG9kbyB9O1xuIiwiaW1wb3J0IHsgcHJvamVjdHNBcnJheSwgc2F2ZVRvTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHsgYWRkTmV3UHJvamVjdCB9IGZyb20gJy4vY3JlYXRlTmV3UHJvamVjdCc7XG5pbXBvcnQgeyBhZGROZXdUb2RvIH0gZnJvbSAnLi9jcmVhdGVOZXdUb2RvJztcbmltcG9ydCB7IGFkZCwgaXNUb2RheSwgaXNUaGlzV2VlaywgcGFyc2UgfSBmcm9tICdkYXRlLWZucyc7XG5cbmNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uJyk7XG5jb25zdCBidG5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuY29uc3QgZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LXRpdGxlJyk7XG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1kaXYnKTtcbmNvbnN0IHRvZG9zRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zLWRpdicpO1xuY29uc3QgYnRuQWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbmV3LXByb2plY3QnKTtcbmNvbnN0IGJ0bkFkZE5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLW5ldy10b2RvJyk7XG5jb25zdCBmb3JtTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBmb3JtTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy10b2RvJyk7XG5jb25zdCBidG5DYW5jZWxOZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbC1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ2FuY2VsTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbmV3LXRvZG8nKTtcbmNvbnN0IHByb2plY3RJbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGV4dC1pbnB1dCcpO1xuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbmNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlLWRhdGUnKTtcbmNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuXG4vLyBwbGFjZWhvbGRlciBmb3IgY3VycmVudCBhY3RpdmUvc2VsZWN0ZWQgcHJvamVjdFxubGV0IGFjdGl2ZVByb2plY3QgPSAnJztcblxuLy8gZWxlbWVudCB1dGlsaXRpZXNcbmNvbnN0IGNsZWFySW5wdXRzID0gKCkgPT4ge1xuICBmb3JtSW5wdXRzLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBmb3JtLnJlc2V0KCk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xlYXJEaXNwbGF5ID0gKGUpID0+IHtcbiAgZS5pbm5lckhUTUwgPSAnJztcbn07XG5cbmNvbnN0IGhpZGVNZW51QnV0dG9uID0gKGUxLCBlMikgPT4ge1xuICAvLyBoYXJ1cyBkaSBlZGl0IChiaWtpbiBmdW5nc2kgdGVycGlzYWggdW50dWsgbWFzaW5nLW1hc2luZyBlbGVtZW50IHlhbmcgbWF1IGRpLWhpZGUpXG4gIGUxLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZTIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufTtcblxuY29uc3QgcmVuZGVyUHJvamVjdHMgPSAocHJvak9iaikgPT4ge1xuICBjb25zdCBuZXdQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGFkZGVkUHJvamVjdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgYnRuRGVsUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdhZGRlZC1wcm9qZWN0Jyk7XG4gIGFkZGVkUHJvamVjdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnYWRkZWQtcHJvamVjdC13cmFwcGVyJyk7XG4gIGFkZGVkUHJvamVjdFdyYXBwZXIuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRhc2tzXCI+PC9pPjxkaXY+JHtwcm9qT2JqLmdldE5hbWUoKX08L2Rpdj5gO1xuICBidG5EZWxQcm9qZWN0LmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGUgYnRuLWRlbC1wcm9qZWN0XCI+PC9pPmA7XG4gIG5ld1Byb2plY3REaXYuYXBwZW5kKGFkZGVkUHJvamVjdFdyYXBwZXIsIGJ0bkRlbFByb2plY3QpO1xuICBwcm9qZWN0c0Rpdi5hcHBlbmQobmV3UHJvamVjdERpdik7XG4gIGRlbGV0ZVByb2plY3QoKTtcbiAgdXBkYXRlUHJvamVjdEluZGV4KCk7XG59O1xuXG5jb25zdCBzZWxlY3RBY3RpdmVQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCBhZGRlZFByb2plY3RXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJy5hZGRlZC1wcm9qZWN0LXdyYXBwZXInXG4gICk7XG4gIGFkZGVkUHJvamVjdFdyYXBwZXJzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QucXVlcnlTZWxlY3RvcignZGl2JykudGV4dENvbnRlbnQ7XG4gICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNsZWFyRGlzcGxheSh0b2Rvc0Rpdik7XG4gICAgICBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdE5hbWU7XG4gICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBhY3RpdmVQcm9qZWN0O1xuICAgICAgc2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xuICAgICAgY2hlY2tJZlByb2plY3RFeGlzdCgpO1xuICAgICAgcmVuZGVyVG9kb0xpc3QoKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGVQcm9qZWN0SW5kZXggPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0SW5kZXggPSAwO1xuICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZGRlZC1wcm9qZWN0Jyk7XG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0JywgYCR7cHJvamVjdEluZGV4fWApO1xuICAgIHByb2plY3RJbmRleCsrO1xuICB9KTtcbn07XG5cbmNvbnN0IHByb2plY3REYXRhVmFsID0gKGJ1dHRvbikgPT4ge1xuICByZXR1cm4gYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcpO1xufTtcblxuY29uc3QgZGVsZXRlUHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgYnRuRGVsUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tZGVsLXByb2plY3QnKTtcbiAgYnRuRGVsUHJvamVjdC5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBpZiAoIXByb2plY3REYXRhVmFsKGJ1dHRvbikpIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdElkID0gcHJvamVjdERhdGFWYWwoYnV0dG9uKTtcbiAgICAgICAgcHJvamVjdHNBcnJheS5zcGxpY2UocHJvamVjdElkLCAxKTtcbiAgICAgICAgYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlUHJvamVjdEluZGV4KCk7XG4gICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFyIGZhLWhhbmQtcG9pbnQtbGVmdFwiPjwvaT4gY2hvb3NlIHByb2plY3RgO1xuICAgICAgICBjbGVhckRpc3BsYXkodG9kb3NEaXYpO1xuICAgICAgICBhY3RpdmVQcm9qZWN0ID0gJyc7XG4gICAgICAgIC8vIHNlbGVjdEFjdGl2ZVByb2plY3QoKTtcbiAgICAgICAgY2hlY2tJZlByb2plY3RFeGlzdCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVuZGVyVG9kb0xpc3QgPSAoKSA9PiB7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGlmIChwcm9qZWN0LmdldE5hbWUoKSA9PT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgcHJvamVjdC5nZXRUb2RvcygpLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RvRGl2LmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcbiAgICAgICAgdG9kb0Rpdi5pbm5lckhUTUwgPSBgPGgyPiR7dG9kby5nZXRUaXRsZSgpfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RHVlIGRhdGU6ICR7dG9kby5nZXREdWVEYXRlKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlByaW9yaXR5OiAke3RvZG8uZ2V0UHJpb3JpdHkoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RGVzY3JpcHRpb246ICR7dG9kby5nZXREZXNjcmlwdGlvbigpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1mdW5jdGlvbnNcIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoXCI+PC9pPjwvZGl2PmA7XG4gICAgICAgIHRvZG9zRGl2LmFwcGVuZCh0b2RvRGl2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmJ0bk1lbnUuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlJyk7XG4gIH0pO1xufSk7XG5cbmJ0bkFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1Byb2plY3QsIGZvcm1OZXdQcm9qZWN0KTtcbn0pO1xuXG5mb3JtTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGFkZE5ld1Byb2plY3QoKTtcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gIGNsZWFyRGlzcGxheShwcm9qZWN0c0Rpdik7XG4gIGRpc3BsYXlQcm9qZWN0KCk7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1Byb2plY3QsIGZvcm1OZXdQcm9qZWN0KTtcbiAgY2xlYXJJbnB1dHMoKTtcbn0pO1xuXG5idG5DYW5jZWxOZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdQcm9qZWN0LCBmb3JtTmV3UHJvamVjdCk7XG59KTtcblxuYnRuQWRkTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3VG9kbywgZm9ybU5ld1RvZG8pO1xufSk7XG5cbmZvcm1OZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgYWRkTmV3VG9kbygpO1xuICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgY2xlYXJEaXNwbGF5KHRvZG9zRGl2KTtcbiAgcmVuZGVyVG9kb0xpc3QoKTtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3VG9kbywgZm9ybU5ld1RvZG8pO1xuICBjbGVhcklucHV0cygpO1xufSk7XG5cbmJ0bkNhbmNlbE5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbn0pO1xuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9ICgpID0+IHtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qT2JqKSA9PiB7XG4gICAgcmVuZGVyUHJvamVjdHMocHJvak9iaik7XG4gIH0pO1xuICBjaGVja0lmUHJvamVjdEV4aXN0KCk7XG4gIHNlbGVjdEFjdGl2ZVByb2plY3QoKTtcbiAgY29uc29sZS5sb2cocHJvamVjdHNBcnJheSk7XG59O1xuXG5jb25zdCBjaGVja0lmUHJvamVjdEV4aXN0ID0gKCkgPT4ge1xuICBpZiAoYWN0aXZlUHJvamVjdCA9PT0gJycpIHtcbiAgICBidG5BZGROZXdUb2RvLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBidG5BZGROZXdUb2RvLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgZm9ybU5ld1Byb2plY3QsXG4gIGJ0bkFkZE5ld1RvZG8sXG4gIGZvcm1OZXdUb2RvLFxuICBwcm9qZWN0SW5wdXRGaWVsZCxcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGRpc3BsYXlQcm9qZWN0LFxuICBhY3RpdmVQcm9qZWN0LFxufTtcbiIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL2NyZWF0ZU5ld1Byb2plY3QnO1xuaW1wb3J0IHsgVG9kbyB9IGZyb20gJy4vY3JlYXRlTmV3VG9kbyc7XG5cbi8vZ2V0IGxvY2FsIHN0b3JhZ2UgZnJvbSBwcm9qZWN0c0FycmF5IGFuZCByZS1jb252ZXJ0IGl0IGludG8gbmV3IG9iamVjdFxuY29uc3Qgc3RvcmVkQXJyYXkgPSAoKSA9PiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcnJheScpKTtcbmxldCBwcm9qZWN0c0FycmF5ID0gKHN0b3JlZEFycmF5KCkgfHwgW10pLm1hcCgob2JqKSA9PiB7XG4gIGNvbnN0IG5ld09iamVjdEZyb21TdG9yYWdlID0gbmV3IFByb2plY3Qob2JqLm5hbWUpO1xuICBvYmoudG9kb3MuZm9yRWFjaCgodG9kb0Zyb21PYmopID0+IHtcbiAgICBjb25zdCBuZXdUb2RvRnJvbU9iaiA9IG5ldyBUb2RvKFxuICAgICAgdG9kb0Zyb21PYmoudGl0bGUsXG4gICAgICB0b2RvRnJvbU9iai5kdWVEYXRlLFxuICAgICAgdG9kb0Zyb21PYmoucHJpb3JpdHksXG4gICAgICB0b2RvRnJvbU9iai5kZXNjcmlwdGlvblxuICAgICk7XG4gICAgbmV3T2JqZWN0RnJvbVN0b3JhZ2UuYWRkVG9kbyhuZXdUb2RvRnJvbU9iaik7XG4gIH0pO1xuICByZXR1cm4gbmV3T2JqZWN0RnJvbVN0b3JhZ2U7XG59KTtcbmNvbnN0IHNhdmVUb0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FycmF5JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSkpO1xufTtcblxuZXhwb3J0IHsgcHJvamVjdHNBcnJheSwgc2F2ZVRvTG9jYWxTdG9yYWdlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG1vbnRoc1RvWWVhcnMgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBmb3JtTmV3UHJvamVjdCxcbiAgYnRuQWRkTmV3VG9kbyxcbiAgZm9ybU5ld1RvZG8sXG4gIGRpc3BsYXlQcm9qZWN0LFxufSBmcm9tICcuL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXInO1xuXG5kaXNwbGF5UHJvamVjdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9