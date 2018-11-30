export default function getPageX(e) {
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent);
  if (mobile) return e.changedTouches[0].pageX;
  return e.pageX;
}
