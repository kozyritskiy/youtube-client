export default function removePagination(length) {
  const paginationList = document.querySelector('.pagination__list');
  const paginationItems = paginationList.children;

  for (let i = 0, len = paginationItems.length; i < len; i += 1) {
    paginationItems[i].classList.remove('pagination__item_is-active');
  }
  if (length === 3) {
    paginationList.removeChild(paginationItems[2]);
  }
  if (length === 4) {
    paginationList.removeChild(paginationItems[3]);
    paginationList.removeChild(paginationItems[2]);
  }
  if (length === 5) {
    paginationList.removeChild(paginationItems[4]);
    paginationList.removeChild(paginationItems[3]);
    paginationList.removeChild(paginationItems[2]);
  }
  paginationList.firstElementChild.classList.add('pagination__item_is-active');
}
