const qq = document.querySelectorAll.bind(document);

document.addEventListener('DOMContentLoaded', () => {
  qq('a').forEach(a => {
    // Make all external links open in a new tab.
    if (a.host != location.host) a.target = '_blank';
  });
});