import random from './random';

export default function changeTheme() {
  const body = document.getElementsByTagName('body')[0];
  body.style.backgroundColor = `hsl(${random(0, 360)},${random(0, 100)}%,${random(0, 55)}%)`;
}
