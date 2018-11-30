export default function controlPaginationPrev() {
  const paginationList = document.querySelector('.pagination__list');
  const paginationItems = paginationList.children;

  for (let i = 0, len = paginationItems.length; i < len; i += 1) {
    if (paginationItems[i].classList.contains('pagination__item_is-active')) {
      if (paginationItems[i].getAttribute('data-page') > 1) {
        if (paginationItems[i].getAttribute('data-page') > 5) {
          const currentAttr = paginationItems[i].getAttribute('data-page');
          paginationItems[i].setAttribute('data-page', +currentAttr - 1);
          paginationItems[i].innerHTML = +currentAttr - 1;
          break;
        }
        paginationItems[i].classList.remove('pagination__item_is-active');
        paginationItems[i].previousElementSibling.classList.add('pagination__item_is-active');
      }
    }
  }
}
