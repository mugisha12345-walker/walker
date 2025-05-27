document.querySelector('form').addEventListener('submit', function(e) {
    // Example: Basic client-side validation (already handled by 'required', but for demo)
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        e.preventDefault();
        return false;
    }

    // You can add more validation or AJAX submission here if needed
});
document.querySelector('form').addEventListener('submit', function(e) {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (username && email && password) {
        const user = {
            username: username,
            email: email,
            password: password
        };
        localStorage.setItem('user', JSON.stringify(user));
    }
});
document.querySelector('form').addEventListener('submit', function(e) {
    // Redirect to index page after successful registration
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (username && email && password) {
        window.location.href = 'index.html';
    }
});