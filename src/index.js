import getAddClickFormFn from './addClickForm';
import changeTheme from './changeTheme';
import requestYouTube from './requestYouTube';
import removePagination from './removePagination';

// change theme start
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', changeTheme);
// change theme end

const form = document.getElementById('form');
const content = document.getElementById('results');

// const desktop = window.matchMedia("(min-width: 1200px)");
const laptop = window.matchMedia('(max-width: 1200px) and (min-width: 900px)');
const tablet = window.matchMedia('(max-width: 900px) and (min-width: 580px)');
const mobile = window.matchMedia('(max-width: 580px)');

const paginationList = document.querySelector('.pagination__list');
const paginationItems = paginationList.children;
const addClickForm = getAddClickFormFn();

let isDesktop;
let isLaptop;
let isTablet;
let isMobile;

// let resizeListner;

if (mobile.matches) {
  isDesktop = false;
  isLaptop = false;
  isTablet = false;
  isMobile = true;

  content.style.width = '250px';
  addClickForm(form, '', 1);
} else if (tablet.matches) {
  isDesktop = false;
  isLaptop = false;
  isTablet = true;
  isMobile = false;

  content.style.width = '560px';
  addClickForm(form, '', 2);
} else if (laptop.matches) {
  isDesktop = false;
  isLaptop = true;
  isTablet = false;
  isMobile = false;

  content.style.width = '870px';
  addClickForm(form, '', 3);
} else {
  isDesktop = true;
  isLaptop = false;
  isTablet = false;
  isMobile = false;

  addClickForm(form, '', 4);
}

// window.removeEventListener('resize', resizeListner, false);
const resizeListner = function resizeble() {
  if (mobile.matches) {
    isDesktop = false;
    isLaptop = false;
    isTablet = false;

    content.style.width = '250px';

    if (!isMobile) {
      requestYouTube('', 1);
      removePagination(paginationItems.length);
    }

    isMobile = true;

    addClickForm(form, '', 1);
  } else if (tablet.matches) {
    isDesktop = false;
    isLaptop = false;
    isMobile = false;

    content.style.width = '560px';

    if (!isTablet) {
      requestYouTube('', 2);
      removePagination(paginationItems.length);
    }

    isTablet = true;

    addClickForm(form, '', 2);
  } else if (laptop.matches) {
    isDesktop = false;
    isTablet = false;
    isMobile = false;

    content.style.width = '870px';

    if (!isLaptop) {
      requestYouTube('', 3);
      removePagination(paginationItems.length);
    }

    isLaptop = true;

    addClickForm(form, '', 3);
  } else {
    isLaptop = false;
    isTablet = false;
    isMobile = false;

    content.style.width = '1180px';

    if (!isDesktop) {
      requestYouTube('', 4);
      removePagination(paginationItems.length);
    }

    isDesktop = true;

    addClickForm(form, '', 4);
  }
};
window.addEventListener('resize', resizeListner);
