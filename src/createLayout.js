export default function createLayout(template, selector) {
  const body = document.getElementsByTagName('body')[0];
  let fragment = document.createElement('div');
  fragment.innerHTML = template;
  const parent = fragment.querySelector(selector);
  fragment = null;
  body.insertBefore(parent, body.firstChild);
}
