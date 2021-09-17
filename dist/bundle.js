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
/* harmony export */   "formNewProject": () => (/* binding */ formNewProject),
/* harmony export */   "btnAddNewTodo": () => (/* binding */ btnAddNewTodo),
/* harmony export */   "formNewTodo": () => (/* binding */ formNewTodo),
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
  e1.classList.toggle('hide');
  e2.classList.toggle('hide');
};

const renderProjects = () => {
  let projectIndex = 0;
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
    const newProjectDiv = document.createElement('div');
    const addedProjectWrapper = document.createElement('div');
    const btnDelProject = document.createElement('span');
    newProjectDiv.classList.add('added-project');
    addedProjectWrapper.classList.add('added-project-wrapper');
    newProjectDiv.dataset.projectId = `${projectIndex}`;
    addedProjectWrapper.innerHTML = `<i class="fas fa-tasks"></i><div>${project.getName()}</div>`;
    btnDelProject.innerHTML = `<i class="fas fa-times-circle btn-del-project"></i>`;
    addedProjectWrapper.addEventListener('click', () => {
      renderProjectTitle(project);
      renderTodoList();
    });
    newProjectDiv.append(addedProjectWrapper, btnDelProject);
    projectsDiv.append(newProjectDiv);
    projectIndex++;
  });
  renderProjectTitle(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"][_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1]); //automatically render project title after create new project
};

// const delProjectHandler = () => {
//   const btnDelProject = document.querySelectorAll('.btn-del-project');
//   btnDelProject.forEach((btn) => {
//     console.log(projectsArray);
//     btn.addEventListener('click', () => {
//       projectsArray.splice(
//         parseInt(btn.parentElement.getAttribute('data-project-id')),
//         1
//       );
//       clearDisplay(projectsDiv);
//       renderProjects();
//     });
//   });
// };

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
  (0,_createNewProject__WEBPACK_IMPORTED_MODULE_1__["default"])();
  clearDisplay(projectsDiv);
  renderProjects();
  // delProjectHandler();
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
  (0,_createNewTodo__WEBPACK_IMPORTED_MODULE_2__["default"])();
  clearDisplay(todosDiv);
  renderTodoList();
  hideMenuButton(btnAddNewTodo, formNewTodo);
  clearInputs();
});

btnCancelNewTodo.addEventListener('click', () => {
  hideMenuButton(btnAddNewTodo, formNewTodo);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7QUFDVTs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyx1RUFBdUI7QUFDeEQsRUFBRSw2REFBa0I7QUFDcEI7O0FBRUEsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9CaUI7QUFPakI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksK0RBQWU7QUFDbkIsSUFBSSw2REFBYTtBQUNqQixJQUFJLDhEQUFjO0FBQ2xCLElBQUksaUVBQWlCO0FBQ3JCO0FBQ0EsRUFBRSxnRUFBcUI7QUFDdkIseUJBQXlCLDZEQUFhO0FBQ3RDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRG9CO0FBQ0M7QUFDTjtBQUNXOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLGdFQUFxQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGFBQWE7QUFDdEQsd0VBQXdFLGtCQUFrQjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUJBQXFCLHdEQUFhLENBQUMsK0RBQW9CLFFBQVE7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxrQkFBa0I7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSxnRUFBcUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25ELDJDQUEyQyxrQkFBa0I7QUFDN0QsMkNBQTJDLG1CQUFtQjtBQUM5RCw4Q0FBOEMsc0JBQXNCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFFLDZEQUFhO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUsMERBQVU7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBYUM7Ozs7Ozs7Ozs7Ozs7OztBQzdKRjs7QUFFQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7VUNGN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055QztBQU1KIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTmV3UHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdUb2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHsgcHJvamVjdElucHV0RmllbGQgfSBmcm9tICcuL2Rpc3BsYXlDb250cm9sbGVyJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcmVtb3ZlVG9kbyhkYXRhbGlzdCkge1xuICAgIHRoaXMudG9kb3Muc3BsaWNlKGRhdGFsaXN0LCAxKTtcbiAgfVxufVxuXG5jb25zdCBhZGROZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdElucHV0RmllbGQudmFsdWUpO1xuICBwcm9qZWN0c0FycmF5LnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGROZXdQcm9qZWN0O1xuIiwiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGFjdGl2ZVByb2plY3QsXG59IGZyb20gJy4vZGlzcGxheUNvbnRyb2xsZXInO1xuXG4vLywgZHVlRGF0ZSwgcHJpb3JpdHlcbmNsYXNzIFRvZG8ge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gIH1cblxuICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5jb25zdCBhZGROZXdUb2RvID0gKCkgPT4ge1xuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oXG4gICAgdG9kb1RpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHkudmFsdWUsXG4gICAgZGVzY3JpcHRpb24udmFsdWVcbiAgKTtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgaWYgKHByb2plY3QubmFtZSA9PT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgcHJvamVjdC5hZGRUb2RvKG5ld1RvZG8pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGROZXdUb2RvO1xuIiwiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IGFkZE5ld1Byb2plY3QgZnJvbSAnLi9jcmVhdGVOZXdQcm9qZWN0JztcbmltcG9ydCBhZGROZXdUb2RvIGZyb20gJy4vY3JlYXRlTmV3VG9kbyc7XG5pbXBvcnQgeyBhZGQsIGlzVG9kYXksIGlzVGhpc1dlZWsgfSBmcm9tICdkYXRlLWZucyc7XG5cbmNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uJyk7XG5jb25zdCBidG5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuY29uc3QgZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LXRpdGxlJyk7XG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1kaXYnKTtcbmNvbnN0IHRvZG9zRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zLWRpdicpO1xuY29uc3QgYnRuQWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbmV3LXByb2plY3QnKTtcbmNvbnN0IGJ0bkFkZE5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLW5ldy10b2RvJyk7XG5jb25zdCBmb3JtTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBmb3JtTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy10b2RvJyk7XG5jb25zdCBidG5DYW5jZWxOZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbC1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ2FuY2VsTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbmV3LXRvZG8nKTtcbmNvbnN0IHByb2plY3RJbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGV4dC1pbnB1dCcpO1xuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbmNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlLWRhdGUnKTtcbmNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuXG4vLyBwbGFjZWhvbGRlciBmb3IgY3VycmVudCBhY3RpdmUvc2VsZWN0ZWQgcHJvamVjdFxubGV0IGFjdGl2ZVByb2plY3QgPSAnJztcblxuLy8gZWxlbWVudCB1dGlsaXRpZXNcbmNvbnN0IGNsZWFySW5wdXRzID0gKCkgPT4ge1xuICBmb3JtSW5wdXRzLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBmb3JtLnJlc2V0KCk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xlYXJEaXNwbGF5ID0gKGUpID0+IHtcbiAgZS5pbm5lckhUTUwgPSAnJztcbn07XG5cbmNvbnN0IGhpZGVNZW51QnV0dG9uID0gKGUxLCBlMikgPT4ge1xuICBlMS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGUyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2plY3RzID0gKCkgPT4ge1xuICBsZXQgcHJvamVjdEluZGV4ID0gMDtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGFkZGVkUHJvamVjdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBidG5EZWxQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIG5ld1Byb2plY3REaXYuY2xhc3NMaXN0LmFkZCgnYWRkZWQtcHJvamVjdCcpO1xuICAgIGFkZGVkUHJvamVjdFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnYWRkZWQtcHJvamVjdC13cmFwcGVyJyk7XG4gICAgbmV3UHJvamVjdERpdi5kYXRhc2V0LnByb2plY3RJZCA9IGAke3Byb2plY3RJbmRleH1gO1xuICAgIGFkZGVkUHJvamVjdFdyYXBwZXIuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRhc2tzXCI+PC9pPjxkaXY+JHtwcm9qZWN0LmdldE5hbWUoKX08L2Rpdj5gO1xuICAgIGJ0bkRlbFByb2plY3QuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZSBidG4tZGVsLXByb2plY3RcIj48L2k+YDtcbiAgICBhZGRlZFByb2plY3RXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmVuZGVyUHJvamVjdFRpdGxlKHByb2plY3QpO1xuICAgICAgcmVuZGVyVG9kb0xpc3QoKTtcbiAgICB9KTtcbiAgICBuZXdQcm9qZWN0RGl2LmFwcGVuZChhZGRlZFByb2plY3RXcmFwcGVyLCBidG5EZWxQcm9qZWN0KTtcbiAgICBwcm9qZWN0c0Rpdi5hcHBlbmQobmV3UHJvamVjdERpdik7XG4gICAgcHJvamVjdEluZGV4Kys7XG4gIH0pO1xuICByZW5kZXJQcm9qZWN0VGl0bGUocHJvamVjdHNBcnJheVtwcm9qZWN0c0FycmF5Lmxlbmd0aCAtIDFdKTsgLy9hdXRvbWF0aWNhbGx5IHJlbmRlciBwcm9qZWN0IHRpdGxlIGFmdGVyIGNyZWF0ZSBuZXcgcHJvamVjdFxufTtcblxuLy8gY29uc3QgZGVsUHJvamVjdEhhbmRsZXIgPSAoKSA9PiB7XG4vLyAgIGNvbnN0IGJ0bkRlbFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWRlbC1wcm9qZWN0Jyk7XG4vLyAgIGJ0bkRlbFByb2plY3QuZm9yRWFjaCgoYnRuKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2cocHJvamVjdHNBcnJheSk7XG4vLyAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuLy8gICAgICAgcHJvamVjdHNBcnJheS5zcGxpY2UoXG4vLyAgICAgICAgIHBhcnNlSW50KGJ0bi5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWlkJykpLFxuLy8gICAgICAgICAxXG4vLyAgICAgICApO1xuLy8gICAgICAgY2xlYXJEaXNwbGF5KHByb2plY3RzRGl2KTtcbi8vICAgICAgIHJlbmRlclByb2plY3RzKCk7XG4vLyAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfTtcblxuY29uc3QgcmVuZGVyUHJvamVjdFRpdGxlID0gKHByb2plY3QpID0+IHtcbiAgY2xlYXJEaXNwbGF5KHRvZG9zRGl2KTtcbiAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYCR7cHJvamVjdC5nZXROYW1lKCl9OmA7XG4gIGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgc2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xufTtcblxuY29uc3QgcmVuZGVyVG9kb0xpc3QgPSAoKSA9PiB7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGlmIChwcm9qZWN0LmdldE5hbWUoKSA9PT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgcHJvamVjdC5nZXRUb2RvcygpLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RvRGl2LmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcbiAgICAgICAgdG9kb0Rpdi5pbm5lckhUTUwgPSBgPGgyPiR7dG9kby5nZXRUaXRsZSgpfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RHVlIGRhdGU6ICR7dG9kby5nZXREdWVEYXRlKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPlByaW9yaXR5OiAke3RvZG8uZ2V0UHJpb3JpdHkoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RGVzY3JpcHRpb246ICR7dG9kby5nZXREZXNjcmlwdGlvbigpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1mdW5jdGlvbnNcIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoXCI+PC9pPjwvZGl2PmA7XG4gICAgICAgIHRvZG9zRGl2LmFwcGVuZCh0b2RvRGl2KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmJ0bk1lbnUuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlJyk7XG4gIH0pO1xufSk7XG5cbmJ0bkFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1Byb2plY3QsIGZvcm1OZXdQcm9qZWN0KTtcbn0pO1xuXG5mb3JtTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGFkZE5ld1Byb2plY3QoKTtcbiAgY2xlYXJEaXNwbGF5KHByb2plY3RzRGl2KTtcbiAgcmVuZGVyUHJvamVjdHMoKTtcbiAgLy8gZGVsUHJvamVjdEhhbmRsZXIoKTtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xuICBjbGVhcklucHV0cygpO1xufSk7XG5cbmJ0bkNhbmNlbE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1Byb2plY3QsIGZvcm1OZXdQcm9qZWN0KTtcbn0pO1xuXG5idG5BZGROZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG59KTtcblxuZm9ybU5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGROZXdUb2RvKCk7XG4gIGNsZWFyRGlzcGxheSh0b2Rvc0Rpdik7XG4gIHJlbmRlclRvZG9MaXN0KCk7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbiAgY2xlYXJJbnB1dHMoKTtcbn0pO1xuXG5idG5DYW5jZWxOZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG59KTtcblxuZXhwb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgZm9ybU5ld1Byb2plY3QsXG4gIGJ0bkFkZE5ld1RvZG8sXG4gIGZvcm1OZXdUb2RvLFxuICBwcm9qZWN0SW5wdXRGaWVsZCxcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGFjdGl2ZVByb2plY3QsXG59O1xuIiwiY29uc3QgcHJvamVjdHNBcnJheSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0c0FycmF5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBtb250aHNUb1llYXJzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgZm9ybU5ld1Byb2plY3QsXG4gIGJ0bkFkZE5ld1RvZG8sXG4gIGZvcm1OZXdUb2RvLFxufSBmcm9tICcuL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXInO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9