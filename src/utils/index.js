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
    getHeader(function () {
        initHeaderScripts();
    });
    getFooter();

    updateAllTimeAgo();
    setInterval(updateAllTimeAgo, 60 * 1000);
});

function getHeader(callback) {
    const header = document.getElementById('header');
    if (!header) {
        console.error('Header element not found');
        return;
    }

    fetchHtml('/src/layouts/header.html').then(html => {
        header.innerHTML = html.body.innerHTML;
        if (typeof callback === 'function') callback();
        // Gọi hàm sticky header ở đây!
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

    //fetch html from url
    fetchHtml('/src/layouts/footer.html').then(html => {
        //append html to footer
        footer.innerHTML = html.body.innerHTML;
    }).catch(error => {
        console.error('Error fetching footer:', error);
    });
}

function initHeaderSticky() {
    const header = document.querySelector("header");
    const headerSticky = document.querySelector(".header-sticky");
    const topMenu = document.querySelector(".header__topMenu");
    const mainHeader = document.querySelector(".main-header");

    function toggleHeaderSticky() {
        if (!header || !headerSticky || !topMenu || !mainHeader) return;
        const headerBottom = header.getBoundingClientRect().bottom + window.scrollY;
        const isDesktop = window.innerWidth >= 768;

        if (window.scrollY >= headerBottom) {
            if (isDesktop) {
                headerSticky.classList.add("is-fixed");
                topMenu.classList.remove("is-fixed");
                mainHeader.classList.remove("is-fixed");
            } else {
                headerSticky.classList.add("is-fixed");
                mainHeader.classList.add("is-fixed");
                topMenu.classList.remove("is-fixed");
            }
        } else {
            headerSticky.classList.remove("is-fixed");
            topMenu.classList.remove("is-fixed");
            mainHeader.classList.remove("is-fixed");
        }
    }

    window.addEventListener("scroll", toggleHeaderSticky);
    window.addEventListener("resize", toggleHeaderSticky);
    toggleHeaderSticky();
}


function initHeaderScripts() {

    // toggle active menuExpand
    const menuExpand = document.querySelector('.header__menuExpand');
    const megaMenu = document.querySelector('.header__megaMenu');
    const menuClose = document.querySelector('.header__megaMenu__close');
    if (menuExpand && megaMenu) {
        menuExpand.addEventListener('click', function () {
            megaMenu.classList.toggle('active');
            menuExpand.classList.toggle('active');
        });
    }

    if (menuClose && megaMenu && menuExpand) {
        menuClose.addEventListener('click', function () {
            megaMenu.classList.toggle('active');
            menuExpand.classList.toggle('active');
        });
    }


    // Search Wrapper
    const searchBtn = document.querySelector('.header__search.header--button');
    const searchWrapper = document.querySelector('.header__searchWrapper');
    const currentTime = document.querySelector('.header__currentTime');

    if (searchBtn && searchWrapper) {
        searchBtn.addEventListener('click', function () {
            searchBtn.style.display = 'none';
            if (currentTime) currentTime.style.display = 'none';
            searchWrapper.style.display = 'block';
        });
    }

    // close searchWrapper
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn && searchBtn && searchWrapper && currentTime) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            searchWrapper.style.display = 'none';
            searchBtn.style.display = '';
            currentTime.style.display = '';
        });
    }

    // toggle city list
    const headerRightDiv = document.querySelector('.header__right > div');
    const cityList = document.querySelector('.header__right .city-list');
    const moreCityIcon = document.querySelector('.header__right .more-city');

    if (headerRightDiv && cityList && moreCityIcon) {
        headerRightDiv.addEventListener('click', function () {
            if (cityList.classList.contains('hidden')) {
                cityList.classList.remove('hidden');
            }
        });
        moreCityIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            if (cityList.classList.contains('hidden')) {
                cityList.classList.remove('hidden');
            } else {
                cityList.classList.add('hidden');
            }
        });
    }

    // topMenuFixed
    const header = document.querySelector('header');
    const topMenu = document.querySelector('.header__topMenu');
    const mainHeader = document.querySelector('.main-header');

    function toggleFixedMenu() {
        const isDesktop = window.innerWidth >= 768;
        const headerRect = header.getBoundingClientRect();
        const headerBottom = headerRect.bottom + window.scrollY;

        if (isDesktop) {
            if (window.scrollY >= headerBottom) {
                topMenu.classList.add('is-fixed');
            } else {
                topMenu.classList.remove('is-fixed');
            }
            mainHeader.classList.remove('is-fixed');
        } else {
            if (window.scrollY >= headerBottom) {
                mainHeader.classList.add('is-fixed');
            } else {
                mainHeader.classList.remove('is-fixed');
            }
            topMenu.classList.remove('is-fixed');
        }
    }

    window.addEventListener('scroll', toggleFixedMenu);
    window.addEventListener('resize', toggleFixedMenu);
    toggleFixedMenu();

    const backToTopBtn = document.getElementById('backToTop');


    function toggleBackToTop() {
        const headerBottom = header ? header.getBoundingClientRect().bottom + window.scrollY : 0;
        if (window.scrollY > headerBottom) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    backToTopBtn.style.display = 'none';

    window.addEventListener('scroll', toggleBackToTop);

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Font-settings
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const plusBtns = document.querySelectorAll('.font-settings .plus, .font-box .plus');
        const minusBtns = document.querySelectorAll('.font-settings .minus, .font-box .minus');
        const fontBtns = document.querySelectorAll('.font-settings .font, .font-box .font');

        const defaultFontSize = 18;
        const minFontSize = 14;
        const maxFontSize = 24;
        let currentFontSize = defaultFontSize;

        function updateFontSize(size) {
            currentFontSize = size;
            articleContent.querySelectorAll('*').forEach(el => {
                if (
                    el.tagName.toLowerCase() === 'h1' ||
                    el.classList.contains('abt-author-date') ||
                    el.closest('.abt-author-date')
                ) {
                    return;
                }
                el.style.fontSize = size + 'px';
            });
        }

        plusBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                if (currentFontSize < maxFontSize) {
                    updateFontSize(currentFontSize + 1);
                }
            });
        });

        minusBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                if (currentFontSize > minFontSize) {
                    updateFontSize(currentFontSize - 1);
                }
            });
        });

        fontBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                updateFontSize(defaultFontSize);
            });
        });

        updateFontSize(defaultFontSize);
    }

    // Ngay thang cap nhat
    function updateDate() {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const now = new Date();
        const dayName = days[now.getDay()];
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const currentTimeElem = document.querySelector('.header__currentTime');
        if (currentTimeElem) {
            currentTimeElem.innerHTML =
                `<p><strong>${dayName},</strong> ${day}/${month}/${year}</p>`;
        }
    }
    updateDate();
    setInterval(updateDate, 60 * 1000);

    // weather
    async function updateWeather() {
        const apiKey = '7fafe62c713db5033a479500b06e159d';
        const city = 'Hanoi';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.cod === 200) {
                const temp = Math.round(data.main.temp);
                const tempMin = Math.round(data.main.temp_min);
                const tempMax = Math.round(data.main.temp_max);
                const icon = data.weather[0].icon;
                const desc = data.weather[0].description;

                const weatherBox = document.querySelector('.header__right');
                if (weatherBox) {
                    const cityElem = weatherBox.querySelector('strong');
                    const tempElem = weatherBox.querySelector('em');
                    const tempRangeElem = weatherBox.querySelector('span');
                    const iconElem = weatherBox.querySelector('img');

                    if (cityElem) cityElem.textContent = data.name;
                    if (tempElem) tempElem.textContent = `${temp}°C`;
                    if (tempRangeElem) tempRangeElem.innerHTML = `<em>${temp}°C</em> / ${tempMin} - ${tempMax}°C`;
                    if (iconElem) {
                        iconElem.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                        iconElem.alt = desc;
                    }
                }
            }
        } catch (e) {
            console.error('Không lấy được dữ liệu thời tiết:', e);
        }
    }
    updateWeather();

    // sticky mobile font adjustment
    const fontLink = document.querySelector('.sticky-mobile .is-font-link');
    const fontBox = document.querySelector('.font-box');
    const closeButton = document.querySelector('.font-box button');

    if (fontLink && fontBox) {
        fontLink.addEventListener('click', function (e) {
            e.preventDefault();
            fontBox.classList.add('active');
        });
    }

    if (closeButton && fontBox) {
        closeButton.addEventListener('click', function () {
            fontBox.classList.remove('active');
        });
    }
}

function timeAgo(datetimeStr) {
    const now = new Date();
    const date = new Date(datetimeStr.replace(/-/g, '/'));
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Vừa xong';
    if (diffMin < 60) return `${diffMin}' trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 7) return `${diffDay} ngày trước`;

    return date.toLocaleDateString('vi-VN');
}

function updateAllTimeAgo() {
    document.querySelectorAll('.time-count span[datetime]').forEach(span => {
        const datetime = span.getAttribute('datetime');
        if (datetime) {
            span.textContent = timeAgo(datetime);
        }
    });
}