
        // Save login info to localStorage on submit
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Store username and password (not secure, for demo only)
            localStorage.setItem('login_username', username);
            localStorage.setItem('login_password', password);
            alert('Login info saved to local storage!');
        });

        // Optionally, prefill form if data exists
        window.onload = function() {
            const savedUsername = localStorage.getItem('login_username');
            const savedPassword = localStorage.getItem('login_password');
            if (savedUsername) document.getElementById('username').value = savedUsername;
            if (savedPassword) document.getElementById('password').value = savedPassword;
        };
        // Register form handling
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const regUsername = document.getElementById('reg_username').value;
            const regPassword = document.getElementById('reg_password').value;
            // Store registration info (not secure, for demo only)
            localStorage.setItem('registered_username', regUsername);
            localStorage.setItem('registered_password', regPassword);
            alert('Registration info saved! You can now log in.');
        });

        // Simple login check against registered credentials
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const regUsername = localStorage.getItem('registered_username');
            const regPassword = localStorage.getItem('registered_password');
            if (username === regUsername && password === regPassword) {
            alert('Login successful!');
            // Optionally, redirect or perform other actions
            } else {
            alert('Invalid credentials. Please register or try again.');
            }
        });