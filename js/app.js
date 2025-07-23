document.addEventListener('DOMContentLoaded', () => {
    const showLoginBtn = document.getElementById('showLogin');
    const loginPopup = document.getElementById('loginPopup');
    const closeLoginBtn = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');

    // Function to show the popup
    const showPopup = () => {
        loginPopup.classList.add('visible');
        // Add RGB gradient animation to inputs when popup opens
        usernameInput.style.animation = 'rgb-border 2s linear infinite';
        passwordInput.style.animation = 'rgb-border 2s linear infinite';
    };

    // Function to hide the popup
    const hidePopup = () => {
        loginPopup.classList.remove('visible');
        // Remove RGB gradient animation from inputs when popup closes
        usernameInput.style.animation = 'none';
        passwordInput.style.animation = 'none';
        loginMessage.textContent = ''; // Clear message on close
        loginForm.reset(); // Reset form
    };

    // Show popup when login button is clicked
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        showPopup();
    });

    // Hide popup when close button is clicked
    closeLoginBtn.addEventListener('click', hidePopup);

    // Hide popup when clicking outside the popup content
    loginPopup.addEventListener('click', (e) => {
        if (e.target === loginPopup) {
            hidePopup();
        }
    });

    // Simulate login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        loginMessage.textContent = ''; // Clear previous messages

        if (username === 'admin' && password === 'password') {
            loginMessage.style.color = '#28a745'; // Green for success
            loginMessage.textContent = 'Login Berhasil! Selamat datang, Admin.';
            setTimeout(() => {
                hidePopup();
                // Optionally redirect or show admin dashboard content
                alert('Anda berhasil login sebagai Admin!');
            }, 1500);
        } else {
            loginMessage.style.color = '#dc3545'; // Red for error
            loginMessage.textContent = 'Username atau password salah.';
        }
    });
});