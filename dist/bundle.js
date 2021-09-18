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

const modalDiv = document.querySelector('.modal-edit-todo');
const btnCancelEdit = document.querySelector('.cancel-edit-todo');

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

const editTodo = () => {
  const btnEditTodo = document.querySelectorAll('.btn-edit-todo');
  btnEditTodo.forEach((button) => {
    if (!todoDataVal(button)) {
      button.addEventListener('click', () => {
        modalDiv.classList.toggle('hide');
      });
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
        editTodo();
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

btnCancelEdit.addEventListener('click', () => {
  modalDiv.classList.toggle('hide');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSwwREFBVTtBQUNaLEVBQUUsb0VBQWtCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsbUVBQXFCO0FBQ3ZCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQWNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyUTJDO0FBQ047O0FBRXZDO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxzREFBTztBQUMxQztBQUNBLCtCQUErQixnREFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUU2Qzs7Ozs7OztVQ3RCN0M7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055QztBQU9KOztBQUVyQywwRUFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZU5ld1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlTmV3VG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RzQXJyYXkgfSBmcm9tICcuL3N0b3JhZ2VQcm92aWRlcic7XG5pbXBvcnQgeyBwcm9qZWN0SW5wdXRGaWVsZCB9IGZyb20gJy4vZGlzcGxheUNvbnRyb2xsZXInO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0VG9kb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH1cblxuICBhZGRUb2RvKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XG4gIH1cblxuICByZW1vdmVUb2RvKGRhdGFsaXN0KSB7XG4gICAgdGhpcy50b2Rvcy5zcGxpY2UoZGF0YWxpc3QsIDEpO1xuICB9XG59XG5cbmNvbnN0IGFkZE5ld1Byb2plY3QgPSAoKSA9PiB7XG4gIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0SW5wdXRGaWVsZC52YWx1ZSk7XG4gIHByb2plY3RzQXJyYXkucHVzaChuZXdQcm9qZWN0KTtcbn07XG5cbmV4cG9ydCB7IFByb2plY3QsIGFkZE5ld1Byb2plY3QgfTtcbiIsImltcG9ydCB7IHByb2plY3RzQXJyYXkgfSBmcm9tICcuL3N0b3JhZ2VQcm92aWRlcic7XG5pbXBvcnQge1xuICB0b2RvVGl0bGUsXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBkZXNjcmlwdGlvbixcbiAgYWN0aXZlUHJvamVjdCxcbn0gZnJvbSAnLi9kaXNwbGF5Q29udHJvbGxlcic7XG5cbi8vLCBkdWVEYXRlLCBwcmlvcml0eVxuY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0VGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gIH1cblxuICBnZXREdWVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gIH1cblxuICBnZXRQcmlvcml0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgfVxuXG4gIGdldERlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uO1xuICB9XG59XG5cbmNvbnN0IGFkZE5ld1RvZG8gPSAoKSA9PiB7XG4gIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kbyhcbiAgICB0b2RvVGl0bGUudmFsdWUsXG4gICAgZHVlRGF0ZS52YWx1ZSxcbiAgICBwcmlvcml0eS52YWx1ZSxcbiAgICBkZXNjcmlwdGlvbi52YWx1ZVxuICApO1xuICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICBpZiAocHJvamVjdC5uYW1lID09PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0LmFkZFRvZG8obmV3VG9kbyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCB7IFRvZG8sIGFkZE5ld1RvZG8gfTtcbiIsImltcG9ydCB7IHByb2plY3RzQXJyYXksIHNhdmVUb0xvY2FsU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZVByb3ZpZGVyJztcbmltcG9ydCB7IGFkZE5ld1Byb2plY3QgfSBmcm9tICcuL2NyZWF0ZU5ld1Byb2plY3QnO1xuaW1wb3J0IHsgYWRkTmV3VG9kbyB9IGZyb20gJy4vY3JlYXRlTmV3VG9kbyc7XG5pbXBvcnQgeyBhZGQsIGlzVG9kYXksIGlzVGhpc1dlZWssIHBhcnNlIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbicpO1xuY29uc3QgYnRuTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbmNvbnN0IGZvcm1JbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZScpO1xuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtZGl2Jyk7XG5jb25zdCB0b2Rvc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy1kaXYnKTtcbmNvbnN0IGJ0bkFkZE5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLW5ldy1wcm9qZWN0Jyk7XG5jb25zdCBidG5BZGROZXdUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1uZXctdG9kbycpO1xuY29uc3QgZm9ybU5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1uZXctcHJvamVjdCcpO1xuY29uc3QgZm9ybU5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1uZXctdG9kbycpO1xuY29uc3QgYnRuQ2FuY2VsTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtbmV3LXByb2plY3QnKTtcbmNvbnN0IGJ0bkNhbmNlbE5ld1RvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLW5ldy10b2RvJyk7XG5jb25zdCBwcm9qZWN0SW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LXRleHQtaW5wdXQnKTtcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvLXRpdGxlJyk7XG5jb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZS1kYXRlJyk7XG5jb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xuY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcblxuY29uc3QgbW9kYWxEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZWRpdC10b2RvJyk7XG5jb25zdCBidG5DYW5jZWxFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbC1lZGl0LXRvZG8nKTtcblxuLy8gcGxhY2Vob2xkZXIgZm9yIGN1cnJlbnQgYWN0aXZlL3NlbGVjdGVkIHByb2plY3RcbmxldCBhY3RpdmVQcm9qZWN0ID0gJyc7XG5cbi8vIGVsZW1lbnQgdXRpbGl0aWVzXG5jb25zdCBjbGVhcklucHV0cyA9ICgpID0+IHtcbiAgZm9ybUlucHV0cy5mb3JFYWNoKChmb3JtKSA9PiB7XG4gICAgZm9ybS5yZXNldCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNsZWFyRGlzcGxheSA9IChlKSA9PiB7XG4gIGUuaW5uZXJIVE1MID0gJyc7XG59O1xuXG5jb25zdCBoaWRlTWVudUJ1dHRvbiA9IChlMSwgZTIpID0+IHtcbiAgLy8gaGFydXMgZGkgZWRpdCAoYmlraW4gZnVuZ3NpIHRlcnBpc2FoIHVudHVrIG1hc2luZy1tYXNpbmcgZWxlbWVudCB5YW5nIG1hdSBkaS1oaWRlKVxuICBlMS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIGUyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2plY3RzID0gKHByb2pPYmopID0+IHtcbiAgY29uc3QgbmV3UHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBhZGRlZFByb2plY3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGJ0bkRlbFByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld1Byb2plY3REaXYuY2xhc3NMaXN0LmFkZCgnYWRkZWQtcHJvamVjdCcpO1xuICBhZGRlZFByb2plY3RXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2FkZGVkLXByb2plY3Qtd3JhcHBlcicpO1xuICBhZGRlZFByb2plY3RXcmFwcGVyLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10YXNrc1wiPjwvaT48ZGl2PiR7cHJvak9iai5nZXROYW1lKCl9PC9kaXY+YDtcbiAgYnRuRGVsUHJvamVjdC5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGJ0bi1kZWwtcHJvamVjdFwiPjwvaT5gO1xuICBuZXdQcm9qZWN0RGl2LmFwcGVuZChhZGRlZFByb2plY3RXcmFwcGVyLCBidG5EZWxQcm9qZWN0KTtcbiAgcHJvamVjdHNEaXYuYXBwZW5kKG5ld1Byb2plY3REaXYpO1xuICBkZWxldGVQcm9qZWN0KCk7XG4gIHVwZGF0ZVByb2plY3RJbmRleCgpO1xufTtcblxuY29uc3Qgc2VsZWN0QWN0aXZlUHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgYWRkZWRQcm9qZWN0V3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICcuYWRkZWQtcHJvamVjdC13cmFwcGVyJ1xuICApO1xuICBhZGRlZFByb2plY3RXcmFwcGVycy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLnRleHRDb250ZW50O1xuICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjbGVhckRpc3BsYXkodG9kb3NEaXYpO1xuICAgICAgYWN0aXZlUHJvamVjdCA9IHByb2plY3ROYW1lO1xuICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gYWN0aXZlUHJvamVjdDtcbiAgICAgIHNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGUnKTtcbiAgICAgIGNoZWNrSWZQcm9qZWN0RXhpc3QoKTtcbiAgICAgIHJlbmRlclRvZG9MaXN0KCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlUHJvamVjdEluZGV4ID0gKCkgPT4ge1xuICBsZXQgcHJvamVjdEluZGV4ID0gMDtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRkZWQtcHJvamVjdCcpO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIGAke3Byb2plY3RJbmRleH1gKTtcbiAgICBwcm9qZWN0SW5kZXgrKztcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGVUb2RvSW5kZXggPSAoKSA9PiB7XG4gIGxldCB0b2RvSW5kZXggPSAwO1xuICBjb25zdCB0b2RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvJyk7XG4gIHRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICB0b2RvLnNldEF0dHJpYnV0ZSgnZGF0YS10b2RvJywgYCR7dG9kb0luZGV4fWApO1xuICAgIHRvZG9JbmRleCsrO1xuICB9KTtcbn07XG5cbmNvbnN0IHByb2plY3REYXRhVmFsID0gKGJ1dHRvbikgPT4ge1xuICByZXR1cm4gYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcpO1xufTtcblxuY29uc3QgZGVsZXRlUHJvamVjdCA9ICgpID0+IHtcbiAgY29uc3QgYnRuRGVsUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tZGVsLXByb2plY3QnKTtcbiAgYnRuRGVsUHJvamVjdC5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBpZiAoIXByb2plY3REYXRhVmFsKGJ1dHRvbikpIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmZpcm0oXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwcm9qZWN0IGFuZCBhbGwgb2YgaXQncyB0YXNrcz9cIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdElkID0gcHJvamVjdERhdGFWYWwoYnV0dG9uKTtcbiAgICAgICAgICBwcm9qZWN0c0FycmF5LnNwbGljZShwcm9qZWN0SWQsIDEpO1xuICAgICAgICAgIGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgdXBkYXRlUHJvamVjdEluZGV4KCk7XG4gICAgICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgICAgcHJvamVjdFRpdGxlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhciBmYS1oYW5kLXBvaW50LWxlZnRcIj48L2k+IGNob29zZSBwcm9qZWN0YDtcbiAgICAgICAgICBjbGVhckRpc3BsYXkodG9kb3NEaXYpO1xuICAgICAgICAgIGFjdGl2ZVByb2plY3QgPSAnJztcbiAgICAgICAgICAvLyBzZWxlY3RBY3RpdmVQcm9qZWN0KCk7XG4gICAgICAgICAgY2hlY2tJZlByb2plY3RFeGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0b2RvRGF0YVZhbCA9IChidXR0b24pID0+IHtcbiAgcmV0dXJuIGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZG8nKTtcbn07XG5cbmNvbnN0IGRlbGV0ZVRvZG8gPSAoKSA9PiB7XG4gIGNvbnN0IGJ0bkRlbFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWRlbC10b2RvJyk7XG4gIGJ0bkRlbFRvZG8uZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgaWYgKCF0b2RvRGF0YVZhbChidXR0b24pKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb25maXJtKCdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyB0YXNrPycpKSB7XG4gICAgICAgICAgY29uc3QgdG9kb0lkID0gdG9kb0RhdGFWYWwoYnV0dG9uKTtcbiAgICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LmdldE5hbWUoKSA9PT0gYWN0aXZlUHJvamVjdCkge1xuICAgICAgICAgICAgICBwcm9qZWN0LmdldFRvZG9zKCkuc3BsaWNlKHRvZG9JZCwgMSk7XG4gICAgICAgICAgICAgIGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIHVwZGF0ZVByb2plY3RJbmRleCgpO1xuICAgICAgICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgZWRpdFRvZG8gPSAoKSA9PiB7XG4gIGNvbnN0IGJ0bkVkaXRUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1lZGl0LXRvZG8nKTtcbiAgYnRuRWRpdFRvZG8uZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgaWYgKCF0b2RvRGF0YVZhbChidXR0b24pKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG1vZGFsRGl2LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZW5kZXJUb2RvTGlzdCA9ICgpID0+IHtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgaWYgKHByb2plY3QuZ2V0TmFtZSgpID09PSBhY3RpdmVQcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0LmdldFRvZG9zKCkuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZG9EaXYuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xuICAgICAgICB0b2RvRGl2LmlubmVySFRNTCA9IGA8aDI+JHt0b2RvLmdldFRpdGxlKCl9PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EdWUgZGF0ZTogJHt0b2RvLmdldER1ZURhdGUoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+UHJpb3JpdHk6ICR7dG9kby5nZXRQcmlvcml0eSgpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5EZXNjcmlwdGlvbjogJHt0b2RvLmdldERlc2NyaXB0aW9uKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWZ1bmN0aW9uc1wiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXQgYnRuLWVkaXQtdG9kb1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10cmFzaCBidG4tZGVsLXRvZG9cIj48L2k+PC9kaXY+YDtcbiAgICAgICAgdG9kb3NEaXYuYXBwZW5kKHRvZG9EaXYpO1xuICAgICAgICBlZGl0VG9kbygpO1xuICAgICAgICBkZWxldGVUb2RvKCk7XG4gICAgICAgIHVwZGF0ZVRvZG9JbmRleCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIGV2ZW50IGxpc3RlbmVyc1xuYnRuTWVudS5mb3JFYWNoKChidG4pID0+IHtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZSgnc2xpZGUnKTtcbiAgfSk7XG59KTtcblxuYnRuQWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xufSk7XG5cbmZvcm1OZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgYWRkTmV3UHJvamVjdCgpO1xuICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgY2xlYXJEaXNwbGF5KHByb2plY3RzRGl2KTtcbiAgZGlzcGxheVByb2plY3QoKTtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3UHJvamVjdCwgZm9ybU5ld1Byb2plY3QpO1xuICBjbGVhcklucHV0cygpO1xufSk7XG5cbmJ0bkNhbmNlbE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGhpZGVNZW51QnV0dG9uKGJ0bkFkZE5ld1Byb2plY3QsIGZvcm1OZXdQcm9qZWN0KTtcbn0pO1xuXG5idG5BZGROZXdUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG59KTtcblxuZm9ybU5ld1RvZG8uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBhZGROZXdUb2RvKCk7XG4gIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICBjbGVhckRpc3BsYXkodG9kb3NEaXYpO1xuICByZW5kZXJUb2RvTGlzdCgpO1xuICBoaWRlTWVudUJ1dHRvbihidG5BZGROZXdUb2RvLCBmb3JtTmV3VG9kbyk7XG4gIGNsZWFySW5wdXRzKCk7XG59KTtcblxuYnRuQ2FuY2VsTmV3VG9kby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZU1lbnVCdXR0b24oYnRuQWRkTmV3VG9kbywgZm9ybU5ld1RvZG8pO1xufSk7XG5cbmJ0bkNhbmNlbEVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1vZGFsRGl2LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn0pO1xuXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9ICgpID0+IHtcbiAgcHJvamVjdHNBcnJheS5mb3JFYWNoKChwcm9qT2JqKSA9PiB7XG4gICAgcmVuZGVyUHJvamVjdHMocHJvak9iaik7XG4gIH0pO1xuICBjaGVja0lmUHJvamVjdEV4aXN0KCk7XG4gIHNlbGVjdEFjdGl2ZVByb2plY3QoKTtcbn07XG5cbmNvbnN0IGNoZWNrSWZQcm9qZWN0RXhpc3QgPSAoKSA9PiB7XG4gIGlmIChhY3RpdmVQcm9qZWN0ID09PSAnJykge1xuICAgIGJ0bkFkZE5ld1RvZG8uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9IGVsc2Uge1xuICAgIGJ0bkFkZE5ld1RvZG8uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBidG5BZGROZXdQcm9qZWN0LFxuICBmb3JtTmV3UHJvamVjdCxcbiAgYnRuQWRkTmV3VG9kbyxcbiAgZm9ybU5ld1RvZG8sXG4gIHByb2plY3RJbnB1dEZpZWxkLFxuICB0b2RvVGl0bGUsXG4gIGR1ZURhdGUsXG4gIHByaW9yaXR5LFxuICBkZXNjcmlwdGlvbixcbiAgZGlzcGxheVByb2plY3QsXG4gIGFjdGl2ZVByb2plY3QsXG59O1xuIiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vY3JlYXRlTmV3UHJvamVjdCc7XG5pbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi9jcmVhdGVOZXdUb2RvJztcblxuLy9nZXQgbG9jYWwgc3RvcmFnZSBmcm9tIHByb2plY3RzQXJyYXkgYW5kIHJlLWNvbnZlcnQgaXQgaW50byBuZXcgb2JqZWN0XG5jb25zdCBzdG9yZWRBcnJheSA9ICgpID0+IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FycmF5JykpO1xubGV0IHByb2plY3RzQXJyYXkgPSAoc3RvcmVkQXJyYXkoKSB8fCBbXSkubWFwKChvYmopID0+IHtcbiAgY29uc3QgbmV3T2JqZWN0RnJvbVN0b3JhZ2UgPSBuZXcgUHJvamVjdChvYmoubmFtZSk7XG4gIG9iai50b2Rvcy5mb3JFYWNoKCh0b2RvRnJvbU9iaikgPT4ge1xuICAgIGNvbnN0IG5ld1RvZG9Gcm9tT2JqID0gbmV3IFRvZG8oXG4gICAgICB0b2RvRnJvbU9iai50aXRsZSxcbiAgICAgIHRvZG9Gcm9tT2JqLmR1ZURhdGUsXG4gICAgICB0b2RvRnJvbU9iai5wcmlvcml0eSxcbiAgICAgIHRvZG9Gcm9tT2JqLmRlc2NyaXB0aW9uXG4gICAgKTtcbiAgICBuZXdPYmplY3RGcm9tU3RvcmFnZS5hZGRUb2RvKG5ld1RvZG9Gcm9tT2JqKTtcbiAgfSk7XG4gIHJldHVybiBuZXdPYmplY3RGcm9tU3RvcmFnZTtcbn0pO1xuY29uc3Qgc2F2ZVRvTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXJyYXknLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0FycmF5KSk7XG59O1xuXG5leHBvcnQgeyBwcm9qZWN0c0FycmF5LCBzYXZlVG9Mb2NhbFN0b3JhZ2UgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbW9udGhzVG9ZZWFycyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7XG4gIGJ0bkFkZE5ld1Byb2plY3QsXG4gIGZvcm1OZXdQcm9qZWN0LFxuICBidG5BZGROZXdUb2RvLFxuICBmb3JtTmV3VG9kbyxcbiAgZGlzcGxheVByb2plY3QsXG59IGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlcic7XG5cbmRpc3BsYXlQcm9qZWN0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=