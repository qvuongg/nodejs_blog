document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector('a[href="/auth/logout"]');

    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

            const csrfToken = document.querySelector('meta[name="csrf-token"]') 
                ? document.querySelector('meta[name="csrf-token"]').getAttribute('content') 
                : '';

            if (!csrfToken) {
                console.error('CSRF token not found!');
                return;
            }

            fetch('/auth/logout', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            })
            .then(response => {
                // Kiểm tra xem phản hồi có hợp lệ không
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Chuyển đổi phản hồi thành JSON
            })
            .then(data => {
                if (data.message === 'Đăng xuất thành công!') {
                    const userMenu = document.querySelector('.navbar-nav.ml-auto');
                    if (userMenu) { 
                        userMenu.innerHTML = `
                            <li class="nav-item">
                                <a class="nav-link" href="/auth/login">Sign in</a>
                            </li>
                        `;
                    }

                    // Điều hướng tới trang đăng nhập
                    window.location.href = '/auth/login';
                } else {
                    console.error('Error in response message:', data.message);
                }
            })
            .catch(err => console.error('Error:', err));
        });
    } else {
        console.error('Logout link not found!');
    }
});