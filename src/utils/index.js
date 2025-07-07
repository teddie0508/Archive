//fetch data html from url

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

//add event DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    getHeader();
});

function getHeader() {
    const header = document.getElementById('header');
    if (!header) {
        console.error('Header element not found');
        return;
    }

    //fetch html from url
    fetchHtml('/src/layouts/header.html').then(html => {
        //append html to header
        header.innerHTML = html.body.innerHTML
    }).catch(error => {
        console.error('Error fetching header:', error);
    });
}


function getFooter() {
    //todo
}