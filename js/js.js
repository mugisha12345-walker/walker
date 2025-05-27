document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('.container');
        const loginBtn = document.getElementById('login');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }

            // Example: simple static check (replace with real authentication)
            if (username === 'admin' && password === 'password') {
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password.');
            }
        });

        // Prevent default button behavior if inside <a>
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        });
    });
    const loginInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Create error message element
    let errorMsg = document.createElement('div');
    errorMsg.style.color = 'red';
    errorMsg.style.marginTop = '10px';
    errorMsg.style.textAlign = 'center';
    errorMsg.style.fontSize = '14px';

    // Insert error message below the login button
    const loginButton = document.getElementById('login');
    if (loginButton && loginButton.parentNode) {
        loginButton.parentNode.insertBefore(errorMsg, loginButton.nextSibling);
    }

    function showError(message) {
        errorMsg.textContent = message;
    }

    function clearError() {
        errorMsg.textContent = '';
    }

    // Update form event to show error below button
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = loginInput.value.trim();
        const password = passwordInput.value.trim();

        clearError();

        if (!username || !password) {
            showError('Please enter both username and password.');
            errorMsg.style.color = 'white';
            return;
            }

            showError('Invalid username or password.');
        }
    );
    const user = {
        username: 'yves walker',
        email: 'mugishay382@gmaill.com',
        password: '55@$12yves'
    };
    function saveLoginInfo(username, email) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
    }

    // Update form submit event to save login info on success
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = loginInput.value.trim();
        const password = passwordInput.value.trim();

        clearError();

        if (!username || !password) {
            showError('Please enter both username and password.');
            errorMsg.style.color = 'white';
            return;
        }

        if (username === user.username && password === user.password) {
            saveLoginInfo(user.username, user.email);
            window.location.href = 'index.html';
        } else {
            showError('Invalid username or password.');
        }
    });

    // Check login status on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = 'index.html';
        }
    });
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
    }
    