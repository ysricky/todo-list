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


class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(datalist) {
    this.todos.splice(datalist, 1);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


/***/ }),

/***/ "./src/modules/createNewTodos.js":
/*!***************************************!*\
  !*** ./src/modules/createNewTodos.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


//, description, dueDate, priority, checklist = false
class Todos {
  constructor(title) {
    this.title = title;
    // this.description = description;
    // this.dueDate = dueDate;
    // this.priority = priority;
    // this.checklist = checklist;
  }

  // setTitle(newTitle) {
  //   this.title = newTitle;
  // }

  // getTitle() {
  //   return this.title;
  // }

  // setDescription(newDescription) {
  //   this.description = newDescription;
  // }

  // getDescription() {
  //   return this.description;
  // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todos);


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
/* harmony export */   "btnAddTodos": () => (/* binding */ btnAddTodos),
/* harmony export */   "btnConfirmNewTodo": () => (/* binding */ btnConfirmNewTodo)
/* harmony export */ });
/* harmony import */ var _storageProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageProvider */ "./src/modules/storageProvider.js");
/* harmony import */ var _createNewProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNewProject */ "./src/modules/createNewProject.js");
/* harmony import */ var _createNewTodos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createNewTodos */ "./src/modules/createNewTodos.js");





const sideBar = document.querySelector('section');
const btnMenu = document.querySelectorAll('span');
const formNewProject = document.querySelector('.form-new-project');
const formInput = document.querySelector('.project-input');
const btnAddNewProject = document.querySelector('.btn-new-project');
const btnConfirmNewProject = document.querySelector('.confirm-new-project');
const projectsDiv = document.querySelector('.projects');
const projectInputField = document.querySelector('.project-text-input');
const mainPage = document.querySelector('main');
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
  const newProject = new _createNewProject__WEBPACK_IMPORTED_MODULE_1__["default"](projectInputField.value);
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].push(newProject);
};

const removeProjects = () => {
  projectsDiv.innerHTML = '';
};

const renderProjects = () => {
  let i = 0;
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('added-project');
    newProjectDiv.dataset.projectId = `${i}`;
    newProjectDiv.innerHTML = `<i class="fas fa-tasks"></i><div>${project.name}</div><i class="fas fa-times-circle"></i>`;
    newProjectDiv.addEventListener('click', () => {
      renderTodos(project);
    });
    projectsDiv.append(newProjectDiv);
    i++;
  });
  console.log(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

const hideProjectMenuBtn = () => {
  btnAddNewProject.classList.toggle('hide');
  formNewProject.classList.toggle('hide');
};

// todo list functionality
const addNewTodo = () => {
  const newTodo = new _createNewTodos__WEBPACK_IMPORTED_MODULE_2__["default"](todoInputField.value);
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
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
  // renderTodos();
  hideTodoMenuBtn();
  formInputTodo.reset();
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
const myProjects = [];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myProjects);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXVEOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekJnQzs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JzQjtBQUNGO0FBQ0o7QUFDTjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5Qix5REFBTztBQUNoQyxFQUFFLDZEQUFlO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxnRUFBa0I7QUFDcEI7QUFDQTtBQUNBLHlDQUF5QyxFQUFFO0FBQzNDLGtFQUFrRSxhQUFhO0FBQy9FO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSCxjQUFjLHdEQUFVO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsdURBQUs7QUFDM0IsRUFBRSxnRUFBa0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQU9DOzs7Ozs7Ozs7Ozs7Ozs7QUMzSEY7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7O1VDRjFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNEcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU5ld1RvZG9zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdG9EYXRlLCBpc1RvZGF5LCBpc1RoaXNXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGFkZFRvZG8odG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG8oZGF0YWxpc3QpIHtcbiAgICB0aGlzLnRvZG9zLnNwbGljZShkYXRhbGlzdCwgMSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImltcG9ydCB7IHRvRGF0ZSwgaXNUb2RheSwgaXNUaGlzV2VlayB9IGZyb20gJ2RhdGUtZm5zJztcblxuLy8sIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tsaXN0ID0gZmFsc2VcbmNsYXNzIFRvZG9zIHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgLy8gdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIC8vIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgLy8gdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIC8vIHRoaXMuY2hlY2tsaXN0ID0gY2hlY2tsaXN0O1xuICB9XG5cbiAgLy8gc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgLy8gICB0aGlzLnRpdGxlID0gbmV3VGl0bGU7XG4gIC8vIH1cblxuICAvLyBnZXRUaXRsZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy50aXRsZTtcbiAgLy8gfVxuXG4gIC8vIHNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gIC8vICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAvLyB9XG5cbiAgLy8gZ2V0RGVzY3JpcHRpb24oKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIC8vIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kb3M7XG4iLCJpbXBvcnQgbXlQcm9qZWN0cyBmcm9tICcuL3N0b3JhZ2VQcm92aWRlcic7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL2NyZWF0ZU5ld1Byb2plY3QnO1xuaW1wb3J0IFRvZG9zIGZyb20gJy4vY3JlYXRlTmV3VG9kb3MnO1xuaW1wb3J0IHsgYWRkIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbicpO1xuY29uc3QgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbmNvbnN0IGZvcm1OZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbmV3LXByb2plY3QnKTtcbmNvbnN0IGZvcm1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWlucHV0Jyk7XG5jb25zdCBidG5BZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ29uZmlybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZXctcHJvamVjdCcpO1xuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKTtcbmNvbnN0IHByb2plY3RJbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGV4dC1pbnB1dCcpO1xuY29uc3QgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5jb25zdCBidG5BZGRUb2RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRUb2RvcycpO1xuY29uc3QgdG9kb3NEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3NEaXYnKTtcbmNvbnN0IGZvcm1OZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbmV3LXRvZG8nKTtcbmNvbnN0IGJ0bkNvbmZpcm1OZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbmV3LXRvZG8nKTtcbmNvbnN0IHRvZG9JbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tdGV4dC1pbnB1dCcpO1xuY29uc3QgZm9ybUlucHV0VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy1pbnB1dCcpO1xuXG4vLyB2YXJpYWJsZXMgZm9yIGN1cnJlbnQgYWN0aXZlL3NlbGVjdGVkIHByb2plY3RcbmxldCBhY3RpdmVQcm9qZWN0ID0gJyc7XG5cbi8vIHByb2plY3QgbGlzdCBmdW5jdGlvbmFsaXR5XG5jb25zdCBhZGROZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdElucHV0RmllbGQudmFsdWUpO1xuICBteVByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5jb25zdCByZW1vdmVQcm9qZWN0cyA9ICgpID0+IHtcbiAgcHJvamVjdHNEaXYuaW5uZXJIVE1MID0gJyc7XG59O1xuXG5jb25zdCByZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcbiAgbGV0IGkgPSAwO1xuICBteVByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdhZGRlZC1wcm9qZWN0Jyk7XG4gICAgbmV3UHJvamVjdERpdi5kYXRhc2V0LnByb2plY3RJZCA9IGAke2l9YDtcbiAgICBuZXdQcm9qZWN0RGl2LmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10YXNrc1wiPjwvaT48ZGl2PiR7cHJvamVjdC5uYW1lfTwvZGl2PjxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT5gO1xuICAgIG5ld1Byb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0KTtcbiAgICB9KTtcbiAgICBwcm9qZWN0c0Rpdi5hcHBlbmQobmV3UHJvamVjdERpdik7XG4gICAgaSsrO1xuICB9KTtcbiAgY29uc29sZS5sb2cobXlQcm9qZWN0cyk7XG59O1xuXG5jb25zdCBoaWRlUHJvamVjdE1lbnVCdG4gPSAoKSA9PiB7XG4gIGJ0bkFkZE5ld1Byb2plY3QuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBmb3JtTmV3UHJvamVjdC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59O1xuXG4vLyB0b2RvIGxpc3QgZnVuY3Rpb25hbGl0eVxuY29uc3QgYWRkTmV3VG9kbyA9ICgpID0+IHtcbiAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2Rvcyh0b2RvSW5wdXRGaWVsZC52YWx1ZSk7XG4gIG15UHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgIHByb2plY3QuYWRkVG9kbyhuZXdUb2RvKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlVG9kb3MgPSAoKSA9PiB7XG4gIHRvZG9zRGl2LmlubmVySFRNTCA9ICcnO1xufTtcblxuY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdCkgPT4ge1xuICByZW1vdmVUb2RvcygpO1xuICBjb25zdCB0b2RvVGl0bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGRpdkZvclByb2plY3RUb2RvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b2RvVGl0bGVzLmNsYXNzTGlzdC5hZGQoJ3RvZG8tdGl0bGVzJyk7XG4gIHRvZG9UaXRsZXMudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gIHRvZG9zRGl2LmFwcGVuZCh0b2RvVGl0bGVzKTtcbiAgYWN0aXZlUHJvamVjdCA9IHByb2plY3QubmFtZTtcbiAgc2lkZUJhci5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xuICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0Rpdi5pbm5lckhUTUwgPSB0b2RvLnRpdGxlO1xuICAgIGRpdkZvclByb2plY3RUb2Rvcy5hcHBlbmQodG9kb0Rpdik7XG4gIH0pO1xuICB0b2Rvc0Rpdi5hcHBlbmQoZGl2Rm9yUHJvamVjdFRvZG9zKTtcbn07XG5cbmNvbnN0IGhpZGVUb2RvTWVudUJ0biA9ICgpID0+IHtcbiAgYnRuQWRkVG9kb3MuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBmb3JtTmV3VG9kby5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59O1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmJ0bk1lbnUuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlJyk7XG4gIH0pO1xufSk7XG5cbmJ0bkFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlUHJvamVjdE1lbnVCdG4pO1xuXG5idG5Db25maXJtTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYWRkTmV3UHJvamVjdCgpO1xuICByZW1vdmVQcm9qZWN0cygpO1xuICByZW5kZXJQcm9qZWN0cygpO1xuICBoaWRlUHJvamVjdE1lbnVCdG4oKTtcbiAgZm9ybUlucHV0LnJlc2V0KCk7XG59KTtcblxuYnRuQWRkVG9kb3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlVG9kb01lbnVCdG4pO1xuXG5idG5Db25maXJtTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYWRkTmV3VG9kbygpO1xuICAvLyByZW1vdmVUb2RvcygpO1xuICAvLyByZW5kZXJUb2RvcygpO1xuICBoaWRlVG9kb01lbnVCdG4oKTtcbiAgZm9ybUlucHV0VG9kby5yZXNldCgpO1xufSk7XG5cbmV4cG9ydCB7XG4gIGJ0bkFkZE5ld1Byb2plY3QsXG4gIGJ0bkNvbmZpcm1OZXdQcm9qZWN0LFxuICBidG5BZGRUb2RvcyxcbiAgYnRuQ29uZmlybU5ld1RvZG8sXG59O1xuIiwiY29uc3QgbXlQcm9qZWN0cyA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBteVByb2plY3RzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBidG5Db25maXJtTmV3UHJvamVjdCxcbiAgYnRuQWRkVG9kb3MsXG4gIGJ0bkNvbmZpcm1OZXdUb2RvLFxufSBmcm9tICcuL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXInO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9