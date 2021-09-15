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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].push(newProject);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addNewProject);


/***/ }),

/***/ "./src/modules/createNewTodo.js":
/*!**************************************!*\
  !*** ./src/modules/createNewTodo.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
    if (project.name === _displayController__WEBPACK_IMPORTED_MODULE_1__.activeProject) {
      project.addTodo(newTodo);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addNewTodo);


/***/ }),

/***/ "./src/modules/displayController.js":
/*!******************************************!*\
  !*** ./src/modules/displayController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "btnAddNewProject": () => (/* binding */ btnAddNewProject),
/* harmony export */   "btnConfirmNewProject": () => (/* binding */ btnConfirmNewProject),
/* harmony export */   "btnAddNewTodo": () => (/* binding */ btnAddNewTodo),
/* harmony export */   "btnConfirmNewTodo": () => (/* binding */ btnConfirmNewTodo),
/* harmony export */   "projectInputField": () => (/* binding */ projectInputField),
/* harmony export */   "todoTitle": () => (/* binding */ todoTitle),
/* harmony export */   "dueDate": () => (/* binding */ dueDate),
/* harmony export */   "priority": () => (/* binding */ priority),
/* harmony export */   "description": () => (/* binding */ description),
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
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
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
  renderProjectTitle(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"][_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1]); //automatically render project title after create new project
  console.log(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

const renderProjectTitle = (project) => {
  clearDisplay(todosDiv);
  projectTitle.textContent = `${project.getName()}:`;
  activeProject = project.getName();
  section.classList.toggle('slide');
};

const renderTodoList = () => {
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
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
  (0,_createNewProject__WEBPACK_IMPORTED_MODULE_1__["default"])();
  clearDisplay(projectsDiv);
  renderProjects();
  hideMenuButton(btnAddNewProject, formNewProject);
  clearInputs();
});

btnAddNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
});

btnConfirmNewTodo.addEventListener('click', () => {
  (0,_createNewTodo__WEBPACK_IMPORTED_MODULE_2__["default"])();
  clearDisplay(todosDiv);
  renderTodoList();
  hideMenuButton(btnAddNewTodo, formNewTodo);
  clearInputs();
});




/***/ }),

/***/ "./src/modules/storageProvider.js":
/*!****************************************!*\
  !*** ./src/modules/storageProvider.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const projectsArray = [];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectsArray);


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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7QUFDVTs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyx1RUFBdUI7QUFDeEQsRUFBRSw2REFBa0I7QUFDcEI7O0FBRUEsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9CaUI7QUFPakI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksK0RBQWU7QUFDbkIsSUFBSSw2REFBYTtBQUNqQixJQUFJLDhEQUFjO0FBQ2xCLElBQUksaUVBQWlCO0FBQ3JCO0FBQ0EsRUFBRSxnRUFBcUI7QUFDdkIseUJBQXlCLDZEQUFhO0FBQ3RDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRG9CO0FBQ0M7QUFDTjtBQUNXOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLGdFQUFxQjtBQUN2QjtBQUNBO0FBQ0EseUNBQXlDLGFBQWE7QUFDdEQsa0VBQWtFLGtCQUFrQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSCxxQkFBcUIsd0RBQWEsQ0FBQywrREFBb0IsUUFBUTtBQUMvRCxjQUFjLHdEQUFhO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsZ0VBQXFCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCwyQ0FBMkMsa0JBQWtCO0FBQzdELDJDQUEyQyxtQkFBbUI7QUFDOUQsOENBQThDLHNCQUFzQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsRUFBRSw2REFBYTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsMERBQVU7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBYUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hJRjs7QUFFQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7VUNGN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ0RxQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU5ld1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTmV3VG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9qZWN0c0FycmF5IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCB7IHByb2plY3RJbnB1dEZpZWxkIH0gZnJvbSAnLi9kaXNwbGF5Q29udHJvbGxlcic7XG5cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRvZG9zID0gW107XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRUb2RvcygpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvcztcbiAgfVxuXG4gIGFkZFRvZG8odG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG8oZGF0YWxpc3QpIHtcbiAgICB0aGlzLnRvZG9zLnNwbGljZShkYXRhbGlzdCwgMSk7XG4gIH1cbn1cblxuY29uc3QgYWRkTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RJbnB1dEZpZWxkLnZhbHVlKTtcbiAgcHJvamVjdHNBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRkTmV3UHJvamVjdDtcbiIsImltcG9ydCBwcm9qZWN0c0FycmF5IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCB7XG4gIHRvZG9UaXRsZSxcbiAgZHVlRGF0ZSxcbiAgcHJpb3JpdHksXG4gIGRlc2NyaXB0aW9uLFxuICBhY3RpdmVQcm9qZWN0LFxufSBmcm9tICcuL2Rpc3BsYXlDb250cm9sbGVyJztcblxuLy8sIGR1ZURhdGUsIHByaW9yaXR5XG5jbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBkZXNjcmlwdGlvbikge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxuXG4gIGdldER1ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgfVxuXG4gIGdldFByaW9yaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICB9XG5cbiAgZ2V0RGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIH1cbn1cblxuY29uc3QgYWRkTmV3VG9kbyA9ICgpID0+IHtcbiAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKFxuICAgIHRvZG9UaXRsZS52YWx1ZSxcbiAgICBkdWVEYXRlLnZhbHVlLFxuICAgIHByaW9yaXR5LnZhbHVlLFxuICAgIGRlc2NyaXB0aW9uLnZhbHVlXG4gICk7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgIHByb2plY3QuYWRkVG9kbyhuZXdUb2RvKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRkTmV3VG9kbztcbiIsImltcG9ydCBwcm9qZWN0c0FycmF5IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCBhZGROZXdQcm9qZWN0IGZyb20gJy4vY3JlYXRlTmV3UHJvamVjdCc7XG5pbXBvcnQgYWRkTmV3VG9kbyBmcm9tICcuL2NyZWF0ZU5ld1RvZG8nO1xuaW1wb3J0IHsgYWRkLCBpc1RvZGF5LCBpc1RoaXNXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbicpO1xuY29uc3QgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbmNvbnN0IGZvcm1JbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZScpO1xuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtZGl2Jyk7XG5jb25zdCB0b2Rvc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy1kaXYnKTtcbmNvbnN0IGJ0bkFkZE5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBidG5BZGROZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1uZXctdG9kbycpO1xuY29uc3QgZm9ybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1uZXctcHJvamVjdCcpO1xuY29uc3QgZm9ybU5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1uZXctdG9kbycpO1xuY29uc3QgYnRuQ29uZmlybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ29uZmlybU5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZXctdG9kbycpO1xuY29uc3QgcHJvamVjdElucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10ZXh0LWlucHV0Jyk7XG5jb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kby10aXRsZScpO1xuY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWUtZGF0ZScpO1xuY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcbmNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG5cbi8vIHBsYWNlaG9sZGVyIGZvciBjdXJyZW50IGFjdGl2ZS9zZWxlY3RlZCBwcm9qZWN0XG5sZXQgYWN0aXZlUHJvamVjdCA9ICcnO1xuXG4vLyBlbGVtZW50IHV0aWxpdGllc1xuY29uc3QgY2xlYXJJbnB1dHMgPSAoKSA9PiB7XG4gIGZvcm1JbnB1dHMuZm9yRWFjaCgoZm9ybSkgPT4ge1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjbGVhckRpc3BsYXkgPSAoZSkgPT4ge1xuICBlLmlubmVySFRNTCA9ICcnO1xufTtcblxuY29uc3QgaGlkZU1lbnVCdXR0b24gPSAoZTEsIGUyKSA9PiB7XG4gIGUxLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZTIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufTtcblxuY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0SW5kZXggPSAwO1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdhZGRlZC1wcm9qZWN0Jyk7XG4gICAgbmV3UHJvamVjdERpdi5kYXRhc2V0LnByb2plY3RJZCA9IGAke3Byb2plY3RJbmRleH1gO1xuICAgIG5ld1Byb2plY3REaXYuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRhc2tzXCI+PC9pPjxkaXY+JHtwcm9qZWN0LmdldE5hbWUoKX08L2Rpdj48aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+YDtcbiAgICBuZXdQcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmVuZGVyUHJvamVjdFRpdGxlKHByb2plY3QpO1xuICAgICAgcmVuZGVyVG9kb0xpc3QoKTtcbiAgICB9KTtcbiAgICBwcm9qZWN0c0Rpdi5hcHBlbmQobmV3UHJvamVjdERpdik7XG4gICAgcHJvamVjdEluZGV4Kys7XG4gIH0pO1xuICByZW5kZXJQcm9qZWN0VGl0bGUocHJvamVjdHNBcnJheVtwcm9qZWN0c0FycmF5Lmxlbmd0aCAtIDFdKTsgLy9hdXRvbWF0aWNhbGx5IHJlbmRlciBwcm9qZWN0IHRpdGxlIGFmdGVyIGNyZWF0ZSBuZXcgcHJvamVjdFxuICBjb25zb2xlLmxvZyhwcm9qZWN0c0FycmF5KTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2plY3RUaXRsZSA9IChwcm9qZWN0KSA9PiB7XG4gIGNsZWFyRGlzcGxheSh0b2Rvc0Rpdik7XG4gIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IGAke3Byb2plY3QuZ2V0TmFtZSgpfTpgO1xuICBhY3RpdmVQcm9qZWN0ID0gcHJvamVjdC5nZXROYW1lKCk7XG4gIHNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGUnKTtcbn07XG5cbmNvbnN0IHJlbmRlclRvZG9MaXN0ID0gKCkgPT4ge1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBpZiAocHJvamVjdC5nZXROYW1lKCkgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgIHByb2plY3QuZ2V0VG9kb3MoKS5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9kb0Rpdi5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG4gICAgICAgIHRvZG9EaXYuaW5uZXJIVE1MID0gYDxoMj4ke3RvZG8uZ2V0VGl0bGUoKX08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkR1ZSBkYXRlOiAke3RvZG8uZ2V0RHVlRGF0ZSgpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Qcmlvcml0eTogJHt0b2RvLmdldFByaW9yaXR5KCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkRlc2NyaXB0aW9uOiAke3RvZG8uZ2V0RGVzY3JpcHRpb24oKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZnVuY3Rpb25zXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10cmFzaFwiPjwvaT48L2Rpdj5gO1xuICAgICAgICAvLyB0b2RvRGl2LnRleHRDb250ZW50ID0gdG9kby5nZXRUaXRsZSgpO1xuICAgICAgICB0b2Rvc0Rpdi5hcHBlbmQodG9kb0Rpdik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuLy8gZXZlbnQgbGlzdGVuZXJzXG5idG5NZW51LmZvckVhY2goKGJ0bikgPT4ge1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgc2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xuICB9KTtcbn0pO1xuXG5idG5BZGROZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdQcm9qZWN0LCBmb3JtTmV3UHJvamVjdCk7XG59KTtcblxuYnRuQ29uZmlybU5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGFkZE5ld1Byb2plY3QoKTtcbiAgY2xlYXJEaXNwbGF5KHByb2plY3RzRGl2KTtcbiAgcmVuZGVyUHJvamVjdHMoKTtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xuICBjbGVhcklucHV0cygpO1xufSk7XG5cbmJ0bkFkZE5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbn0pO1xuXG5idG5Db25maXJtTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYWRkTmV3VG9kbygpO1xuICBjbGVhckRpc3BsYXkodG9kb3NEaXYpO1xuICByZW5kZXJUb2RvTGlzdCgpO1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG4gIGNsZWFySW5wdXRzKCk7XG59KTtcblxuZXhwb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgYnRuQ29uZmlybU5ld1Byb2plY3QsXG4gIGJ0bkFkZE5ld1RvZG8sXG4gIGJ0bkNvbmZpcm1OZXdUb2RvLFxuICBwcm9qZWN0SW5wdXRGaWVsZCxcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGFjdGl2ZVByb2plY3QsXG59O1xuIiwiY29uc3QgcHJvamVjdHNBcnJheSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0c0FycmF5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBidG5Db25maXJtTmV3UHJvamVjdCxcbiAgYnRuQWRkTmV3VG9kbyxcbiAgYnRuQ29uZmlybU5ld1RvZG8sXG59IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlcic7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=