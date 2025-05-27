document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            const messageDiv = document.getElementById('message');
            messageDiv.textContent = '';
            messageDiv.className = '';

            if (username.length < 3) {
                messageDiv.textContent = 'Username must be at least 3 characters.';
                messageDiv.className = 'error-message';
                return;
            }
            if (!email.includes('@')) {
                messageDiv.textContent = 'Please enter a valid email.';
                messageDiv.className = 'error-message';
                return;
            }
            if (password.length < 6) {
                messageDiv.textContent = 'Password must be at least 6 characters.';
                messageDiv.className = 'error-message';
                return;
            }
            // Simulate successful signup
            messageDiv.textContent = 'Sign up successful!';
            messageDiv.className = 'success-message';
            // Reset form
            document.getElementById('signupForm').reset();
            localStorage.setItem('signup_username', username);
            localStorage.setItem('signup_email', email);
            localStorage.setItem('signup_password', password);
        });
// Sign up form submission
fetch('/api/signup', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
}).then(res => {
  if (res.ok) {
    // Optional: auto login
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(loginRes => {
      if (loginRes.ok) {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Handle login error
        loginRes.text().then(err => {
          document.getElementById('message').textContent = 'Login failed: ' + err;
        });
      }
    }
  ).catch(err => {
      document.getElementById('message').textContent = 'Login error: ' + err;
    });
    } else {
    // Handle signup error 
    res.text().then(err => {
      document.getElementById('message').textContent = 'Signup failed: ' + err;
    });
    }
}
).catch(err => {
  document.getElementById('message').textContent = 'Signup error: ' + err;
});