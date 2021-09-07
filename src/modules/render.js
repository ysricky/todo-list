const closeMenu = () => {
  const sideBar = document.querySelector('section');
  const btnMenu = document.querySelectorAll('span');

  btnMenu.forEach((btn) => {
    btn.addEventListener('click', () => {
      sideBar.classList.toggle('slide');
    });
  });
};

const btnAddNewProject = document.querySelector('.btn-new-project');
const formNewProject = document.querySelector('.form-new-project');
const btnOk = document.querySelector('.ok');

const hideController = () => {
  btnAddNewProject.classList.toggle('hide');
  formNewProject.classList.toggle('hide');
};

btnAddNewProject.addEventListener('click', hideController);
btnOk.addEventListener('click', hideController);

export { closeMenu };
