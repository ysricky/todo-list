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
    newProjectDiv.classList.add('added-project');
    newProjectDiv.dataset.projectId = `${projectIndex}`;
    newProjectDiv.innerHTML = `<i class="fas fa-tasks"></i><div>${project.getName()}</div><i class="fas fa-times-circle btn-del-project"></i>`;
    newProjectDiv.addEventListener('click', () => {
      renderProjectTitle(project);
      renderTodoList();
    });
    projectsDiv.append(newProjectDiv);
    projectIndex++;
  });
  // if (projectsArray.length > 0) {
  renderProjectTitle(_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"][_storageProvider__WEBPACK_IMPORTED_MODULE_0__["default"].length - 1]); //automatically render project title after create new project
  // } else {
  //   projectTitle.innerHTML = `<i class="far fa-hand-point-left"></i> add project`;
  // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q055QztBQU1KIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTmV3UHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jcmVhdGVOZXdUb2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHsgcHJvamVjdElucHV0RmllbGQgfSBmcm9tICcuL2Rpc3BsYXlDb250cm9sbGVyJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudG9kb3MgPSBbXTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldFRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9zO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcmVtb3ZlVG9kbyhkYXRhbGlzdCkge1xuICAgIHRoaXMudG9kb3Muc3BsaWNlKGRhdGFsaXN0LCAxKTtcbiAgfVxufVxuXG5jb25zdCBhZGROZXdQcm9qZWN0ID0gKCkgPT4ge1xuICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdElucHV0RmllbGQudmFsdWUpO1xuICBwcm9qZWN0c0FycmF5LnB1c2gobmV3UHJvamVjdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGROZXdQcm9qZWN0O1xuIiwiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgdG9kb1RpdGxlLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgZGVzY3JpcHRpb24sXG4gIGFjdGl2ZVByb2plY3QsXG59IGZyb20gJy4vZGlzcGxheUNvbnRyb2xsZXInO1xuXG4vLywgZHVlRGF0ZSwgcHJpb3JpdHlcbmNsYXNzIFRvZG8ge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldFRpdGxlKCkge1xuICAgIHJldHVybiB0aGlzLnRpdGxlO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gIH1cblxuICBnZXREZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5jb25zdCBhZGROZXdUb2RvID0gKCkgPT4ge1xuICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oXG4gICAgdG9kb1RpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHkudmFsdWUsXG4gICAgZGVzY3JpcHRpb24udmFsdWVcbiAgKTtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgaWYgKHByb2plY3QubmFtZSA9PT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgcHJvamVjdC5hZGRUb2RvKG5ld1RvZG8pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGROZXdUb2RvO1xuIiwiaW1wb3J0IHByb2plY3RzQXJyYXkgZnJvbSAnLi9zdG9yYWdlUHJvdmlkZXInO1xuaW1wb3J0IGFkZE5ld1Byb2plY3QgZnJvbSAnLi9jcmVhdGVOZXdQcm9qZWN0JztcbmltcG9ydCBhZGROZXdUb2RvIGZyb20gJy4vY3JlYXRlTmV3VG9kbyc7XG5pbXBvcnQgeyBhZGQsIGlzVG9kYXksIGlzVGhpc1dlZWsgfSBmcm9tICdkYXRlLWZucyc7XG5cbmNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uJyk7XG5jb25zdCBidG5NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xuY29uc3QgZm9ybUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LXRpdGxlJyk7XG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1kaXYnKTtcbmNvbnN0IHRvZG9zRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zLWRpdicpO1xuY29uc3QgYnRuQWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbmV3LXByb2plY3QnKTtcbmNvbnN0IGJ0bkFkZE5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLW5ldy10b2RvJyk7XG5jb25zdCBmb3JtTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBmb3JtTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW5ldy10b2RvJyk7XG5jb25zdCBidG5DYW5jZWxOZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbC1uZXctcHJvamVjdCcpO1xuY29uc3QgYnRuQ2FuY2VsTmV3VG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbmV3LXRvZG8nKTtcbmNvbnN0IHByb2plY3RJbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGV4dC1pbnB1dCcpO1xuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG8tdGl0bGUnKTtcbmNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlLWRhdGUnKTtcbmNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XG5jb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xuXG4vLyBwbGFjZWhvbGRlciBmb3IgY3VycmVudCBhY3RpdmUvc2VsZWN0ZWQgcHJvamVjdFxubGV0IGFjdGl2ZVByb2plY3QgPSAnJztcblxuLy8gZWxlbWVudCB1dGlsaXRpZXNcbmNvbnN0IGNsZWFySW5wdXRzID0gKCkgPT4ge1xuICBmb3JtSW5wdXRzLmZvckVhY2goKGZvcm0pID0+IHtcbiAgICBmb3JtLnJlc2V0KCk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xlYXJEaXNwbGF5ID0gKGUpID0+IHtcbiAgZS5pbm5lckhUTUwgPSAnJztcbn07XG5cbmNvbnN0IGhpZGVNZW51QnV0dG9uID0gKGUxLCBlMikgPT4ge1xuICBlMS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGUyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2plY3RzID0gKCkgPT4ge1xuICBsZXQgcHJvamVjdEluZGV4ID0gMDtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld1Byb2plY3REaXYuY2xhc3NMaXN0LmFkZCgnYWRkZWQtcHJvamVjdCcpO1xuICAgIG5ld1Byb2plY3REaXYuZGF0YXNldC5wcm9qZWN0SWQgPSBgJHtwcm9qZWN0SW5kZXh9YDtcbiAgICBuZXdQcm9qZWN0RGl2LmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10YXNrc1wiPjwvaT48ZGl2PiR7cHJvamVjdC5nZXROYW1lKCl9PC9kaXY+PGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGJ0bi1kZWwtcHJvamVjdFwiPjwvaT5gO1xuICAgIG5ld1Byb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZW5kZXJQcm9qZWN0VGl0bGUocHJvamVjdCk7XG4gICAgICByZW5kZXJUb2RvTGlzdCgpO1xuICAgIH0pO1xuICAgIHByb2plY3RzRGl2LmFwcGVuZChuZXdQcm9qZWN0RGl2KTtcbiAgICBwcm9qZWN0SW5kZXgrKztcbiAgfSk7XG4gIC8vIGlmIChwcm9qZWN0c0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgcmVuZGVyUHJvamVjdFRpdGxlKHByb2plY3RzQXJyYXlbcHJvamVjdHNBcnJheS5sZW5ndGggLSAxXSk7IC8vYXV0b21hdGljYWxseSByZW5kZXIgcHJvamVjdCB0aXRsZSBhZnRlciBjcmVhdGUgbmV3IHByb2plY3RcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFyIGZhLWhhbmQtcG9pbnQtbGVmdFwiPjwvaT4gYWRkIHByb2plY3RgO1xuICAvLyB9XG59O1xuXG4vLyBjb25zdCBkZWxQcm9qZWN0SGFuZGxlciA9ICgpID0+IHtcbi8vICAgY29uc3QgYnRuRGVsUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tZGVsLXByb2plY3QnKTtcbi8vICAgYnRuRGVsUHJvamVjdC5mb3JFYWNoKChidG4pID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhwcm9qZWN0c0FycmF5KTtcbi8vICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICBwcm9qZWN0c0FycmF5LnNwbGljZShcbi8vICAgICAgICAgcGFyc2VJbnQoYnRuLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaWQnKSksXG4vLyAgICAgICAgIDFcbi8vICAgICAgICk7XG4vLyAgICAgICBjbGVhckRpc3BsYXkocHJvamVjdHNEaXYpO1xuLy8gICAgICAgcmVuZGVyUHJvamVjdHMoKTtcbi8vICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuXG5jb25zdCByZW5kZXJQcm9qZWN0VGl0bGUgPSAocHJvamVjdCkgPT4ge1xuICBjbGVhckRpc3BsYXkodG9kb3NEaXYpO1xuICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0LmdldE5hbWUoKX06YDtcbiAgYWN0aXZlUHJvamVjdCA9IHByb2plY3QuZ2V0TmFtZSgpO1xuICBzZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlJyk7XG59O1xuXG5jb25zdCByZW5kZXJUb2RvTGlzdCA9ICgpID0+IHtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgaWYgKHByb2plY3QuZ2V0TmFtZSgpID09PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0LmdldFRvZG9zKCkuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZG9EaXYuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xuICAgICAgICB0b2RvRGl2LmlubmVySFRNTCA9IGA8aDI+JHt0b2RvLmdldFRpdGxlKCl9PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EdWUgZGF0ZTogJHt0b2RvLmdldER1ZURhdGUoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+UHJpb3JpdHk6ICR7dG9kby5nZXRQcmlvcml0eSgpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EZXNjcmlwdGlvbjogJHt0b2RvLmdldERlc2NyaXB0aW9uKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWZ1bmN0aW9uc1wiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdHJhc2hcIj48L2k+PC9kaXY+YDtcbiAgICAgICAgdG9kb3NEaXYuYXBwZW5kKHRvZG9EaXYpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIGV2ZW50IGxpc3RlbmVyc1xuYnRuTWVudS5mb3JFYWNoKChidG4pID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGUnKTtcbiAgfSk7XG59KTtcblxuYnRuQWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xufSk7XG5cbmZvcm1OZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgYWRkTmV3UHJvamVjdCgpO1xuICBjbGVhckRpc3BsYXkocHJvamVjdHNEaXYpO1xuICByZW5kZXJQcm9qZWN0cygpO1xuICAvLyBkZWxQcm9qZWN0SGFuZGxlcigpO1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdQcm9qZWN0LCBmb3JtTmV3UHJvamVjdCk7XG4gIGNsZWFySW5wdXRzKCk7XG59KTtcblxuYnRuQ2FuY2VsTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xufSk7XG5cbmJ0bkFkZE5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbn0pO1xuXG5mb3JtTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGFkZE5ld1RvZG8oKTtcbiAgY2xlYXJEaXNwbGF5KHRvZG9zRGl2KTtcbiAgcmVuZGVyVG9kb0xpc3QoKTtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3VG9kbywgZm9ybU5ld1RvZG8pO1xuICBjbGVhcklucHV0cygpO1xufSk7XG5cbmJ0bkNhbmNlbE5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1RvZG8sIGZvcm1OZXdUb2RvKTtcbn0pO1xuXG5leHBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBmb3JtTmV3UHJvamVjdCxcbiAgYnRuQWRkTmV3VG9kbyxcbiAgZm9ybU5ld1RvZG8sXG4gIHByb2plY3RJbnB1dEZpZWxkLFxuICB0b2RvVGl0bGUsXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBkZXNjcmlwdGlvbixcbiAgYWN0aXZlUHJvamVjdCxcbn07XG4iLCJjb25zdCBwcm9qZWN0c0FycmF5ID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzQXJyYXk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG1vbnRoc1RvWWVhcnMgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBmb3JtTmV3UHJvamVjdCxcbiAgYnRuQWRkTmV3VG9kbyxcbiAgZm9ybU5ld1RvZG8sXG59IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlcic7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=