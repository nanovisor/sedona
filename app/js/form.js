var form = document.querySelector('.form-search');
var btnSearch = document.querySelector('.btn--search');

var adultInput = form.querySelector('#adult-input');
var adultMinus = form.querySelector('#adult-minus');
var adultPlus = form.querySelector('#adult-plus');

var childInput = form.querySelector('#child-input');
var childMinus = form.querySelector('#child-minus');
var childPlus = form.querySelector('#child-plus');


// btnSearch
btnSearch.addEventListener('click', function(event) {
  event.preventDefault();
  form.classList.toggle('form-search--show');
});


// plus minus input
adultMinus.addEventListener('click', function() {
  event.preventDefault();
  if (adultInput.value > 1) {
    adultInput.value--;
  }
});

adultPlus.addEventListener('click', function() {
  event.preventDefault();
  adultInput.value++;
});

childMinus.addEventListener('click', function() {
  event.preventDefault();
  if (childInput.value > 0) {
    childInput.value--;
  }
});

childPlus.addEventListener('click', function() {
  event.preventDefault();
  childInput.value++;
});

//form submit
form.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('adult:' + adultInput.value);
  console.log('child:' + childInput.value);
});
