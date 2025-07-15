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

function getFooter(callback) {
  const footer = document.getElementById('footer');
  if (!footer) {
    console.error('Footer element not found');
    return;
  }

  fetchHtml('/src/layouts/footer.html').then(html => {
    footer.innerHTML = html.body.innerHTML;
    if (typeof callback === 'function') callback(); // Thêm callback cho footer
  }).catch(error => {
    console.error('Error fetching footer:', error);
  });
}

function loadLayouts() {
  return Promise.all([
    new Promise((resolve) => {
      getHeader(() => {
        initHeaderScripts();
        resolve();
      });
    }),
    new Promise((resolve) => {
      getFooter(() => {
        resolve();
      });
    })
  ]);
}

window.addEventListener('DOMContentLoaded', () => {
  loadLayouts().then(() => {
    // Dispatch event để thông báo layouts đã load xong
    window.dispatchEvent(new Event('layoutsLoaded'));
  });
});