const dayNames = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy"
];

//Cap nhat ngay thang nam
function updateDate() {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const now = new Date();
    const dayName = days[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    document.querySelector('.c-sologan.onecms__currentTime').innerHTML =
        `<p><b>${dayName},</b> ${day}/${month}/${year}</p>`;
}
updateDate();
setInterval(updateDate, 60 * 1000);

// Cap nhat thoi tiet
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

      document.querySelector('.c-weather.onecms__weather ul.current-city').innerHTML = `
        <li>
          <strong>${data.name}</strong>
          <span><em>${temp}°C</em> / ${tempMin} - ${tempMax}°C</span>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
        </li>
      `;
    }
  } catch (e) {
    console.error('Không lấy được dữ liệu thời tiết:', e);
  }
}
updateWeather();

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.c-menu-expand');
    const megaMenu = document.querySelector('.c-mega-menu');
    const closeBtn = document.querySelector('.c-mega-menu__close');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('is-open');
        megaMenu.classList.toggle('active');
    });

    closeBtn.addEventListener('click', function () {
        menuBtn.classList.remove('is-open');
        megaMenu.classList.remove('active');
    });
});