'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Selecting, creating, and deleting
/*
// Selecting
const header = document.querySelector('.header');
// This will be a nodelist
const allSections = document.querySelector('.section');

//This will be an html collection. It will be constantly updated if elemenst are added or removed programatically. So if a function removes a button for example then this list will reflect that. A nodelist won't update in the same way
const allButtons = document.getElementsByTagName('button');
*/

// Creating and inserting
/*
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies'
message.innerHTML =
  'We use cookies. <button class="btn btn--close-cookie">Got it<button>';
// header.prepend(message);
header.append(message); // Overwrites the prepend (moves the element)
// header.append(message.cloneNode(true)); // To copy an element to 2 places.

// header.before(message)
// header.after(message)
*/

// Delete
/*
// New way
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Old way
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.parentElement.removeChild());
*/

// Styles
/*
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// Pulls out the number from the height, adds 30, turns it back to a tring and adds px

// For custom properties
document.documentElement.style.setProperty('--color-primary', 'orangered');
*/

// Attributes
/*
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
// Can only read standard attributes of the element, not custom ones
console.log(logo.designer); // Won't work
console.log(logo.getAttribute('designer')); // Will work

logo.alt = 'Bieautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));
// Shows relative file path. Will be different from logo.src

// Data attributes
// Special attributes that have to start with data-
console.log(logo.dataset.versionNumber);

// Classes
//add, remove, toggle, contains
*/
