// MegaMenu
function initHomepage() {
    // Đợi một chút để đảm bảo DOM đã render
    setTimeout(() => {
        const menuToggle = document.getElementById('menuToggle');
        const megaMenu = document.getElementById('megaMenu');
        let isMenuOpen = false;

        // Kiểm tra xem elements có tồn tại không
        if (!menuToggle || !megaMenu) {
            console.error('Menu elements not found');
            // Thử lại sau 500ms
            setTimeout(initHomepage, 500);
            return;
        }

        console.log('Menu initialized successfully');

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
    }, 100);
}

// Hàm kiểm tra và khởi tạo menu
function checkAndInitMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const megaMenu = document.getElementById('megaMenu');
    
    if (menuToggle && megaMenu) {
        initHomepage();
        return true;
    }
    return false;
}

// Đợi layouts load xong rồi mới chạy
window.addEventListener('layoutsLoaded', function () {
    console.log('Layouts loaded, initializing menu...');
    if (!checkAndInitMenu()) {
        // Nếu không thành công, thử lại
        setTimeout(() => {
            checkAndInitMenu();
        }, 200);
    }
});

// Fallback với nhiều lần thử
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, checking menu...');
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInit = () => {
        attempts++;
        if (checkAndInitMenu()) {
            console.log(`Menu initialized on attempt ${attempts}`);
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(tryInit, 200);
        } else {
            console.error('Failed to initialize menu after maximum attempts');
        }
    };
    
    tryInit();
});