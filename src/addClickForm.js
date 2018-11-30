import createLayout from './createLayout';
import removePagination from './removePagination';
import requestYouTube from './requestYouTube';

const template = document.querySelector('#main').innerHTML;
const templParallax = document.querySelector('#parallax').innerHTML;
const main = '.s-main';
const parallax = '.s-parallax';

createLayout(template, main);
createLayout(templParallax, parallax);

const paginationList = document.querySelector('.pagination__list');

export default function getAddClickFormFn() {
  let onSubmitFn;

  return (elem, defaultToken, maxRes) => {
    const paginationItems = paginationList.children;

    if (onSubmitFn) {
      elem.removeEventListener('submit', onSubmitFn, false);
    }

    onSubmitFn = (e) => {
      e.preventDefault();
      removePagination(paginationItems.length);
      requestYouTube(defaultToken, maxRes);
    };

    elem.addEventListener('submit', onSubmitFn, false);
  };
}
