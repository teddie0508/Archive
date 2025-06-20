// toggle active menuExpand
document.addEventListener('DOMContentLoaded', function () {
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
                weatherBox.innerHTML = `
          <strong>${data.name}</strong>
          <span><em>${temp}°C</em> / ${tempMin} - ${tempMax}°C</span>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="max-w-6 max-h-6" />
        `;
            }
        }
    } catch (e) {
        console.error('Không lấy được dữ liệu thời tiết:', e);
    }
}

document.addEventListener('DOMContentLoaded', updateWeather);

