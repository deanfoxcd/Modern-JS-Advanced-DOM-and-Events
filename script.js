'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const initialCoords = section1.getBoundingClientRect();
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

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

// FUNCTIONALITY

// Tabbed Component
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // The below is a more modern way of checking instead of using the IF block as used in the propagation section
  if (!clicked) return;

  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Page Navigation
// Without using propagation (attaching the function to each link (inefficient))
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault(); // stops the page jumping to the section (the anchor)
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // can't use getelementbyid because 'id' contains the #
  });
});
*/

// With propagation (using the parent of all these links)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // The if block is needed so that clicking in whitespace between the links doesn't do anything. Without the IF it would throw an error
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Button Scrolling (Learn More)
btnScrollTo.addEventListener('click', e => {
  // Scrolling
  // The offsets account for where the page is currently scrolled to. It might not be at the top

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Add smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // More modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Menu Fade Animation
const handleHover = function (element, opacity) {
  if (element.target.classList.contains('nav__link')) {
    const link = element.target;
    // const siblings = link.closest('.nav__links').querySelectorAll('.nav__link'); // Also works
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
      logo.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', e => {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', e => {
  handleHover(e, 1);
});
// There is a way to do this with bind (see video 196)

// Sticky Navigation
// Bad for performance, constantly firing
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// With Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], // Basically when it's not visible or when 20% threshold passed
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

// Reveal Sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // So the observe doesn't keep getting triggered once the sections are all revealed/observed
};

const revealOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img'); // This will be a problem on a slow connection. The blurry class will be removed before the image has fully loaded

  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};

const loadImgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
};

const imgObserver = new IntersectionObserver(loadImg, loadImgOptions);

imgTargets.forEach(img => imgObserver.observe(img));

//////////// LECTURES

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

// Events and event handlers
/*
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('Great!');
};

// More old-school, can't be stacked
// h1.onmouseenter = e => {
//   alert('Great!');
// };

// Removing event listeners
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/

// Event Propagation
/*

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // Can't use arrow function

  // stop propagation
  // e.stopPropagation()
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // this === e.target
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/

// DOM Navigation
/*

const h1 = document.querySelector('h1');

// Going downwards (child)
console.log(h1.querySelectorAll('.highlight')); // All elements with this class no matter how deep
console.log(h1.childNodes); // Direct children. Everything under the h1
console.log(h1.children); // Direct children. Just the elements
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
// Closest is kind of the opposite to querySelector. It finds the closest upwards

// Going sideways (only direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// To get all siblings
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
