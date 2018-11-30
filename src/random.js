export default function random(a, b) {
  return Math.floor(Math.random() * (b - a + Math.sin(3.14)) + a);
}
