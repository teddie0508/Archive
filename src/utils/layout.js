function fetchHtml(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(html => (new DOMParser()).parseFromString(html, 'text/html'));
}

function getHeader(callback) {
    const header = document.getElementById('header');
    if (!header) return;
    fetchHtml('/src/layouts/header.html').then(html => {
        header.innerHTML = html.body.innerHTML;
        if (typeof callback === 'function') callback();
    });
}

function getFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    fetchHtml('/src/layouts/footer.html').then(html => {
        footer.innerHTML = html.body.innerHTML;
    });
}

// Chỉ gọi callback sau khi header đã xong
window.addEventListener('DOMContentLoaded', () => {
    getHeader(function () {
        // Gọi hàm khởi tạo logic chính ở đây
        if (window.initMainScripts) window.initMainScripts();
    });
    getFooter();
});