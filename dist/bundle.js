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

/***/ "./src/modules/createNewTodo.js":
/*!**************************************!*\
  !*** ./src/modules/createNewTodo.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//, description, dueDate, priority, checklist = false
class Todo {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Todo);


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
/* harmony import */ var _createNewTodo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createNewTodo */ "./src/modules/createNewTodo.js");





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
  const newProject = new _createNewProject__WEBPACK_IMPORTED_MODULE_1__["default"](projectInputField.value);
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].push(newProject);
};

const removeProjects = () => {
  projectsDiv.innerHTML = '';
};

const renderProjects = () => {
  let projectIndex = 0;
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
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
  console.log(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

const hideProjectMenuBtn = () => {
  btnAddNewProject.classList.toggle('hide');
  formNewProject.classList.toggle('hide');
};

// todo list functionality
const addNewTodo = () => {
  const newTodo = new _createNewTodo__WEBPACK_IMPORTED_MODULE_2__["default"](todoInputField.value);
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

const renderTodoList = () => {
  const divForProjectTodos = document.createElement('div');
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].forEach((project) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLElBQUksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0IwQjtBQUNMO0FBQ047QUFDaUI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLHlEQUFPO0FBQ2hDLEVBQUUsNkRBQWtCO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxnRUFBcUI7QUFDdkI7QUFDQTtBQUNBLHlDQUF5QyxhQUFhO0FBQ3RELGtFQUFrRSxhQUFhO0FBQy9FO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGNBQWMsd0RBQWE7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixzREFBSTtBQUMxQixFQUFFLGdFQUFxQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUsZ0VBQXFCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQU9DOzs7Ozs7Ozs7Ozs7Ozs7QUMxSUY7O0FBRUEsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7O1VDRjdCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNEcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU5ld1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZVByb3ZpZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGFkZFRvZG8odG9kbykge1xuICAgIHRoaXMudG9kb3MucHVzaCh0b2RvKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG8oZGF0YWxpc3QpIHtcbiAgICB0aGlzLnRvZG9zLnNwbGljZShkYXRhbGlzdCwgMSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsIi8vLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrbGlzdCA9IGZhbHNlXG5jbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgLy8gdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIC8vIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgLy8gdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIC8vIHRoaXMuY2hlY2tsaXN0ID0gY2hlY2tsaXN0O1xuICB9XG5cbiAgLy8gc2V0VGl0bGUobmV3VGl0bGUpIHtcbiAgLy8gICB0aGlzLnRpdGxlID0gbmV3VGl0bGU7XG4gIC8vIH1cblxuICAvLyBnZXRUaXRsZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy50aXRsZTtcbiAgLy8gfVxuXG4gIC8vIHNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKSB7XG4gIC8vICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAvLyB9XG5cbiAgLy8gZ2V0RGVzY3JpcHRpb24oKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gIC8vIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9kbztcbiIsImltcG9ydCBwcm9qZWN0c0FycmF5IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCBQcm9qZWN0IGZyb20gJy4vY3JlYXRlTmV3UHJvamVjdCc7XG5pbXBvcnQgVG9kbyBmcm9tICcuL2NyZWF0ZU5ld1RvZG8nO1xuaW1wb3J0IHsgYWRkLCBpc1RvZGF5LCBpc1RoaXNXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jb25zdCBzaWRlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbicpO1xuY29uc3QgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbmNvbnN0IGZvcm1OZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbmV3LXByb2plY3QnKTtcbmNvbnN0IGZvcm1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWlucHV0Jyk7XG5jb25zdCBidG5BZGROZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ29uZmlybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZXctcHJvamVjdCcpO1xuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKTtcbmNvbnN0IHByb2plY3RJbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGV4dC1pbnB1dCcpO1xuY29uc3QgYnRuQWRkVG9kb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkVG9kb3MnKTtcbmNvbnN0IHRvZG9zRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zRGl2Jyk7XG5jb25zdCBmb3JtTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy10b2RvJyk7XG5jb25zdCBidG5Db25maXJtTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLW5ldy10b2RvJyk7XG5jb25zdCB0b2RvSW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXRleHQtaW5wdXQnKTtcbmNvbnN0IGZvcm1JbnB1dFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MtaW5wdXQnKTtcblxuLy8gdmFyaWFibGVzIGZvciBjdXJyZW50IGFjdGl2ZS9zZWxlY3RlZCBwcm9qZWN0XG5sZXQgYWN0aXZlUHJvamVjdCA9ICcnO1xuXG4vLyBwcm9qZWN0IGxpc3QgZnVuY3Rpb25hbGl0eVxuY29uc3QgYWRkTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RJbnB1dEZpZWxkLnZhbHVlKTtcbiAgcHJvamVjdHNBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xufTtcblxuY29uc3QgcmVtb3ZlUHJvamVjdHMgPSAoKSA9PiB7XG4gIHByb2plY3RzRGl2LmlubmVySFRNTCA9ICcnO1xufTtcblxuY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0SW5kZXggPSAwO1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdhZGRlZC1wcm9qZWN0Jyk7XG4gICAgbmV3UHJvamVjdERpdi5kYXRhc2V0LnByb2plY3RJZCA9IGAke3Byb2plY3RJbmRleH1gO1xuICAgIG5ld1Byb2plY3REaXYuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRhc2tzXCI+PC9pPjxkaXY+JHtwcm9qZWN0Lm5hbWV9PC9kaXY+PGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPmA7XG4gICAgbmV3UHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHJlbmRlclRvZG9zKHByb2plY3QpO1xuICAgIH0pO1xuICAgIHByb2plY3RzRGl2LmFwcGVuZChuZXdQcm9qZWN0RGl2KTtcbiAgICByZW5kZXJUb2Rvcyhwcm9qZWN0KTtcbiAgICBwcm9qZWN0SW5kZXgrKztcbiAgfSk7XG4gIGNvbnNvbGUubG9nKHByb2plY3RzQXJyYXkpO1xufTtcblxuY29uc3QgaGlkZVByb2plY3RNZW51QnRuID0gKCkgPT4ge1xuICBidG5BZGROZXdQcm9qZWN0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgZm9ybU5ld1Byb2plY3QuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xufTtcblxuLy8gdG9kbyBsaXN0IGZ1bmN0aW9uYWxpdHlcbmNvbnN0IGFkZE5ld1RvZG8gPSAoKSA9PiB7XG4gIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyh0b2RvSW5wdXRGaWVsZC52YWx1ZSk7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGFjdGl2ZVByb2plY3QpIHtcbiAgICAgIHByb2plY3QuYWRkVG9kbyhuZXdUb2RvKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlVG9kb3MgPSAoKSA9PiB7XG4gIHRvZG9zRGl2LmlubmVySFRNTCA9ICcnO1xufTtcblxuY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdCkgPT4ge1xuICByZW1vdmVUb2RvcygpO1xuICBjb25zdCB0b2RvVGl0bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGRpdkZvclByb2plY3RUb2RvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b2RvVGl0bGVzLmNsYXNzTGlzdC5hZGQoJ3RvZG8tdGl0bGVzJyk7XG4gIHRvZG9UaXRsZXMudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gIHRvZG9zRGl2LmFwcGVuZCh0b2RvVGl0bGVzKTtcbiAgYWN0aXZlUHJvamVjdCA9IHByb2plY3QubmFtZTtcbiAgc2lkZUJhci5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xuICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9kb0Rpdi5pbm5lckhUTUwgPSB0b2RvLnRpdGxlO1xuICAgIGRpdkZvclByb2plY3RUb2Rvcy5hcHBlbmQodG9kb0Rpdik7XG4gIH0pO1xuICB0b2Rvc0Rpdi5hcHBlbmQoZGl2Rm9yUHJvamVjdFRvZG9zKTtcbn07XG5cbmNvbnN0IGhpZGVUb2RvTWVudUJ0biA9ICgpID0+IHtcbiAgYnRuQWRkVG9kb3MuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBmb3JtTmV3VG9kby5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59O1xuXG5jb25zdCByZW5kZXJUb2RvTGlzdCA9ICgpID0+IHtcbiAgY29uc3QgZGl2Rm9yUHJvamVjdFRvZG9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3RzQXJyYXkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHByb2plY3QudG9kb3MpO1xuICAgIGlmIChwcm9qZWN0LnRpdGxlID09PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RvRGl2LmlubmVySFRNTCA9IHRvZG8udGl0bGU7XG4gICAgICAgIGRpdkZvclByb2plY3RUb2Rvcy5hcHBlbmQodG9kb0Rpdik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICB0b2Rvc0Rpdi5hcHBlbmQoZGl2Rm9yUHJvamVjdFRvZG9zKTtcbn07XG5cbi8vIGV2ZW50IGxpc3RlbmVyc1xuYnRuTWVudS5mb3JFYWNoKChidG4pID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGUnKTtcbiAgfSk7XG59KTtcblxuYnRuQWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVQcm9qZWN0TWVudUJ0bik7XG5cbmJ0bkNvbmZpcm1OZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBhZGROZXdQcm9qZWN0KCk7XG4gIHJlbW92ZVByb2plY3RzKCk7XG4gIHJlbmRlclByb2plY3RzKCk7XG4gIGhpZGVQcm9qZWN0TWVudUJ0bigpO1xuICBmb3JtSW5wdXQucmVzZXQoKTtcbn0pO1xuXG5idG5BZGRUb2Rvcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVUb2RvTWVudUJ0bik7XG5cbmJ0bkNvbmZpcm1OZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBhZGROZXdUb2RvKCk7XG4gIC8vIHJlbW92ZVRvZG9zKCk7XG4gIHJlbmRlclRvZG9MaXN0KCk7XG4gIGhpZGVUb2RvTWVudUJ0bigpO1xuICBmb3JtSW5wdXRUb2RvLnJlc2V0KCk7XG59KTtcblxuZXhwb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgYnRuQ29uZmlybU5ld1Byb2plY3QsXG4gIGJ0bkFkZFRvZG9zLFxuICBidG5Db25maXJtTmV3VG9kbyxcbn07XG4iLCJjb25zdCBwcm9qZWN0c0FycmF5ID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzQXJyYXk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGJ0bkFkZE5ld1Byb2plY3QsXG4gIGJ0bkNvbmZpcm1OZXdQcm9qZWN0LFxuICBidG5BZGRUb2RvcyxcbiAgYnRuQ29uZmlybU5ld1RvZG8sXG59IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlcic7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=