const sideBar = document.querySelector('section');
const btnMenu = document.querySelectorAll('i');

btnMenu.forEach((btn) => {
  btn.addEventListener('click', () => {
    sideBar.classList.toggle('slide');
  });
});
