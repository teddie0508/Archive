// MegaMenu
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const megaMenu = document.getElementById('megaMenu');
    let isMenuOpen = false;

    // Kiểm tra xem elements có tồn tại không
    if (!menuToggle || !megaMenu) {
        console.error('Menu elements not found');
        return;
    }

    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (isMenuOpen) {
            closeMegaMenu();
        } else {
            openMegaMenu();
        }
    });

    function openMegaMenu() {
        megaMenu.classList.remove('hidden');
        setTimeout(() => {
            megaMenu.classList.add('show');
        }, 10);
        isMenuOpen = true;
    }

    function closeMegaMenu() {
        megaMenu.classList.remove('show');
        setTimeout(() => {
            megaMenu.classList.add('hidden');
        }, 300);
        isMenuOpen = false;
    }

    // Đóng menu khi click outside
    document.addEventListener('click', function (e) {
        if (isMenuOpen && !document.getElementById('header').contains(e.target)) {
            closeMegaMenu();
        }
    });

    // Đóng menu khi resize window
    window.addEventListener('resize', function () {
        if (isMenuOpen) {
            closeMegaMenu();
        }
    });
});