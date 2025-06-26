document.addEventListener('DOMContentLoaded', function () {
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
});




// Ngay thang cap nhat
function updateDate() {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    document.querySelector('.header__currentTime').innerHTML =
        `<p><strong>${dayName},</strong> ${day}/${month}/${year}</p>`;
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

document.addEventListener('DOMContentLoaded', updateWeather);

