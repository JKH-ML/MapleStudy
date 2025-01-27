const menuButton = document.getElementById('menuButton');
const closeMenuButton = document.getElementById('closeMenuButton');
const slideMenu = document.getElementById('slideMenu');

// Open menu
menuButton.addEventListener('click', () => {
  slideMenu.classList.remove('translate-x-full');
});

// Close menu
closeMenuButton.addEventListener('click', () => {
  slideMenu.classList.add('translate-x-full');
});
