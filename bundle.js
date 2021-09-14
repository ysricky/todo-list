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
//, dueDate, priority
class Todo {
  constructor(title) {
    this.title = title;
    // this.dueDate = dueDate;
    // this.priority = priority;
  }

  getTitle() {
    return this.title;
  }
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
/* harmony export */   "btnAddNewTodo": () => (/* binding */ btnAddNewTodo),
/* harmony export */   "btnConfirmNewTodo": () => (/* binding */ btnConfirmNewTodo)
/* harmony export */ });
/* harmony import */ var _storageProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageProvider */ "./src/modules/storageProvider.js");
/* harmony import */ var _createNewProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createNewProject */ "./src/modules/createNewProject.js");
/* harmony import */ var _createNewTodo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createNewTodo */ "./src/modules/createNewTodo.js");





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
  const newProject = new _createNewProject__WEBPACK_IMPORTED_MODULE_1__["default"](projectInputField.value);
  _storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].push(newProject);
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
    });
    projectsDiv.append(newProjectDiv);
    projectIndex++;
  });
  renderProjectTitle(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"][_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].length-1]); //automatically render project title after create new project
  console.log(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJ2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2IwQjtBQUNMO0FBQ047QUFDaUI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLHlEQUFPO0FBQ2hDLEVBQUUsNkRBQWtCO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQSxFQUFFLGdFQUFxQjtBQUN2QjtBQUNBO0FBQ0EseUNBQXlDLGFBQWE7QUFDdEQsa0VBQWtFLGtCQUFrQjtBQUNwRjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUJBQXFCLHdEQUFhLENBQUMsK0RBQW9CLE1BQU07QUFDN0QsY0FBYyx3REFBYTtBQUMzQjs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLHNEQUFJO0FBQzFCLEVBQUUsZ0VBQXFCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBT0M7Ozs7Ozs7Ozs7Ozs7OztBQy9IRjs7QUFFQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7VUNGN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdQcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU5ld1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZVByb3ZpZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcmVtb3ZlVG9kbyhkYXRhbGlzdCkge1xuICAgIHRoaXMudG9kb3Muc3BsaWNlKGRhdGFsaXN0LCAxKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xuIiwiLy8sIGR1ZURhdGUsIHByaW9yaXR5XG5jbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgLy8gdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAvLyB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvO1xuIiwiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9jcmVhdGVOZXdQcm9qZWN0JztcbmltcG9ydCBUb2RvIGZyb20gJy4vY3JlYXRlTmV3VG9kbyc7XG5pbXBvcnQgeyBhZGQsIGlzVG9kYXksIGlzVGhpc1dlZWsgfSBmcm9tICdkYXRlLWZucyc7XG5cbmNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uJyk7XG5jb25zdCBidG5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtZGl2Jyk7XG5jb25zdCB0b2Rvc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy1kaXYnKTtcbmNvbnN0IGJ0bkFkZE5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBidG5BZGROZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1uZXctdG9kbycpO1xuY29uc3QgZm9ybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1uZXctcHJvamVjdCcpO1xuY29uc3QgZm9ybU5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1uZXctdG9kbycpO1xuY29uc3QgYnRuQ29uZmlybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ29uZmlybU5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1uZXctdG9kbycpO1xuY29uc3QgcHJvamVjdElucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10ZXh0LWlucHV0Jyk7XG5jb25zdCB0b2RvSW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXRleHQtaW5wdXQnKTtcbmNvbnN0IGZvcm1JbnB1dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1pbnB1dCcpO1xuY29uc3QgZm9ybUlucHV0VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy1pbnB1dCcpO1xuXG4vLyBwbGFjZWhvbGRlciBmb3IgY3VycmVudCBhY3RpdmUvc2VsZWN0ZWQgcHJvamVjdFxubGV0IGFjdGl2ZVByb2plY3QgPSAnJztcblxuLy8gZWxlbWVudCB1dGlsaXRpZXNcbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlKSA9PiB7XG4gIGUuaW5uZXJIVE1MID0gJyc7XG59O1xuXG5jb25zdCBoaWRlTWVudUJ1dHRvbiA9IChlMSwgZTIpID0+IHtcbiAgZTEuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICBlMi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59O1xuXG4vLyBwcm9qZWN0IGxpc3QgZnVuY3Rpb25hbGl0eVxuY29uc3QgYWRkTmV3UHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RJbnB1dEZpZWxkLnZhbHVlKTtcbiAgcHJvamVjdHNBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xufTtcblxuY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XG4gIGxldCBwcm9qZWN0SW5kZXggPSAwO1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdhZGRlZC1wcm9qZWN0Jyk7XG4gICAgbmV3UHJvamVjdERpdi5kYXRhc2V0LnByb2plY3RJZCA9IGAke3Byb2plY3RJbmRleH1gO1xuICAgIG5ld1Byb2plY3REaXYuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRhc2tzXCI+PC9pPjxkaXY+JHtwcm9qZWN0LmdldE5hbWUoKX08L2Rpdj48aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+YDtcbiAgICBuZXdQcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmVuZGVyUHJvamVjdFRpdGxlKHByb2plY3QpO1xuICAgIH0pO1xuICAgIHByb2plY3RzRGl2LmFwcGVuZChuZXdQcm9qZWN0RGl2KTtcbiAgICBwcm9qZWN0SW5kZXgrKztcbiAgfSk7XG4gIHJlbmRlclByb2plY3RUaXRsZShwcm9qZWN0c0FycmF5W3Byb2plY3RzQXJyYXkubGVuZ3RoLTFdKTsgLy9hdXRvbWF0aWNhbGx5IHJlbmRlciBwcm9qZWN0IHRpdGxlIGFmdGVyIGNyZWF0ZSBuZXcgcHJvamVjdFxuICBjb25zb2xlLmxvZyhwcm9qZWN0c0FycmF5KTtcbn07XG5cbi8vIHRvZG8gbGlzdCBmdW5jdGlvbmFsaXR5XG5jb25zdCBhZGROZXdUb2RvID0gKCkgPT4ge1xuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8odG9kb0lucHV0RmllbGQudmFsdWUpO1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBpZiAocHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0LmFkZFRvZG8obmV3VG9kbyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2plY3RUaXRsZSA9IChwcm9qZWN0KSA9PiB7XG4gIGNsZWFyRGlzcGxheSh0b2Rvc0Rpdik7XG4gIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10aXRsZScpO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgdG9kb3NEaXYuYXBwZW5kKHByb2plY3RUaXRsZSk7XG4gIGFjdGl2ZVByb2plY3QgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgc2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZScpO1xufTtcblxuLy8gY29uc3QgcmVuZGVyVG9kb0xpc3QgPSAoKSA9PiB7XG4vLyAgIGNvbnN0IGRpdlByb2plY3RUb2RvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhwcm9qZWN0LnRvZG9zKTtcbi8vICAgICBpZiAocHJvamVjdC50aXRsZSA9PT0gYWN0aXZlUHJvamVjdCkge1xuLy8gICAgICAgcHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICAgICAgdG9kb0Rpdi5pbm5lckhUTUwgPSB0b2RvLnRpdGxlO1xuLy8gICAgICAgICBkaXZGb3JQcm9qZWN0VG9kb3MuYXBwZW5kKHRvZG9EaXYpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vICAgdG9kb3NEaXYuYXBwZW5kKGRpdkZvclByb2plY3RUb2Rvcyk7XG4vLyB9O1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmJ0bk1lbnUuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlJyk7XG4gIH0pO1xufSk7XG5cbmJ0bkFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1Byb2plY3QsIGZvcm1OZXdQcm9qZWN0KTtcbn0pO1xuXG5idG5Db25maXJtTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgYWRkTmV3UHJvamVjdCgpO1xuICBjbGVhckRpc3BsYXkocHJvamVjdHNEaXYpO1xuICByZW5kZXJQcm9qZWN0cygpO1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdQcm9qZWN0LCBmb3JtTmV3UHJvamVjdCk7XG4gIGZvcm1JbnB1dFByb2plY3QucmVzZXQoKTtcbn0pO1xuXG5idG5BZGROZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG59KTtcblxuYnRuQ29uZmlybU5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGFkZE5ld1RvZG8oKTtcbiAgY2xlYXJEaXNwbGF5KHRvZG9zRGl2KTtcbiAgLy8gcmVuZGVyVG9kb0xpc3QoKTtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3VG9kbywgZm9ybU5ld1RvZG8pO1xuICBmb3JtSW5wdXRUb2RvLnJlc2V0KCk7XG59KTtcblxuZXhwb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgYnRuQ29uZmlybU5ld1Byb2plY3QsXG4gIGJ0bkFkZE5ld1RvZG8sXG4gIGJ0bkNvbmZpcm1OZXdUb2RvLFxufTtcbiIsImNvbnN0IHByb2plY3RzQXJyYXkgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdHNBcnJheTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgYnRuQWRkTmV3UHJvamVjdCxcbiAgYnRuQ29uZmlybU5ld1Byb2plY3QsXG4gIGJ0bkFkZFRvZG9zLFxuICBidG5Db25maXJtTmV3VG9kbyxcbn0gZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXlDb250cm9sbGVyJzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=