const sideBar = document.querySelector('section');
const btnMenu = document.querySelectorAll('span');
const formNewProject = document.querySelector('.form-new-project');
const btnAddNewProject = document.querySelector('.btn-new-project');
const btnOk = document.querySelector('.ok');
const projects = document.querySelector('.projects');
const projectInputField = document.querySelector('.project-text-input');

const hideButton = () => {
  btnAddNewProject.classList.toggle('hide');
  formNewProject.classList.toggle('hide');
};

const addNewProjectDiv = () => {
  const newProject = document.createElement('p');
  newProject.textContent = projectInputField.value;
  projects.append(newProject);
};

btnMenu.forEach((btn) => {
  btn.addEventListener('click', () => {
    sideBar.classList.toggle('slide');
  });
});

btnAddNewProject.addEventListener('click', hideButton);
btnOk.addEventListener('click', addNewProjectDiv);
