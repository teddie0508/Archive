function fetchHtml(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      return parser.parseFromString(html, 'text/html');
    });
}

function getHeader(callback) {
  const header = document.getElementById('header');
  if (!header) {
    console.error('Header element not found');
    return;
  }

  fetchHtml('/src/layouts/header.html').then(html => {
    header.innerHTML = html.body.innerHTML;
    if (typeof callback === 'function') callback();
    initHeaderSticky();
  }).catch(error => {
    console.error('Error fetching header:', error);
  });
}

function getFooter() {
  const footer = document.getElementById('footer');
  if (!footer) {
    console.error('Footer element not found');
    return;
  }

  fetchHtml('/src/layouts/footer.html').then(html => {
    footer.innerHTML = html.body.innerHTML;
  }).catch(error => {
    console.error('Error fetching footer:', error);
  });
}

function initHeaderSticky() {
  // Code sticky header như trên
}

function initHeaderScripts() {
  // Tất cả logic header scripts
}

window.addEventListener('DOMContentLoaded', () => {
  getHeader(function () {
    initHeaderScripts();
  });
  getFooter();
});