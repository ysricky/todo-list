const sideBar = document.querySelector('section');
const btnMenu = document.querySelector('.toggle-btn');

btnMenu.addEventListener('click', () => {
  sideBar.classList.toggle('slide');
});
