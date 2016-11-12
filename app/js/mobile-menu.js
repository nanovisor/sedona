var hamburger = document.querySelector('.main-nav__hamburger-btn');
var closeMenu = document.querySelector('.main-nav__close-btn');
var menuItems = document.querySelectorAll('.main-nav__item:not(.main-nav__item--logo)');


hamburger.addEventListener('click', function(event) {
  event.preventDefault();
  for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    menuItem.classList.toggle('main-nav__item--show');
  }
});

closeMenu.addEventListener('click', function(event) {
  event.preventDefault();
  for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    menuItem.classList.remove('main-nav__item--show');
  }
});
