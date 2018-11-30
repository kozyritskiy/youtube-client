export default function controlPaginationNext() {
  const paginationList = document.querySelector('.pagination__list');
  const paginationItems = paginationList.children;

  for (let i = 0, len = paginationItems.length; i < len; i += 1) {
    if (paginationItems[i].classList.contains('pagination__item_is-active')) {
      const condition1 = paginationItems[i].getAttribute('data-page') >= 5;
      const condition2 = Number(paginationItems[i].getAttribute('data-page')) === 4 || len === 5;
      const condition3 = len === 3 && Number(paginationItems[i].getAttribute('data-page')) === 1;
      const condition4 = len === 4 && Number(paginationItems[i].getAttribute('data-page')) === 2;
      const condition5 = len === 4 && Number(paginationItems[i].getAttribute('data-page')) === 1;

      if (condition1) {
        const currentAttr = paginationItems[i].getAttribute('data-page');
        paginationItems[i].setAttribute('data-page', +currentAttr + 1);
        paginationItems[i].innerHTML = +currentAttr + 1;
        break;
      }
      if (condition2 || condition3 || condition4 || condition5) {
        paginationItems[i].classList.remove('pagination__item_is-active');
        paginationItems[i].nextElementSibling.classList.add('pagination__item_is-active');
        break;
      }

      const page = paginationItems[i].getAttribute('data-page');
      const newItem = document.createElement('li');
      newItem.classList.add('pagination__item');
      newItem.setAttribute('data-page', +page + 2);
      newItem.innerHTML = +page + 2;
      paginationList.appendChild(newItem);
      paginationItems[i].classList.remove('pagination__item_is-active');
      paginationItems[i].nextElementSibling.classList.add('pagination__item_is-active');
      break;
    }
  }
}
