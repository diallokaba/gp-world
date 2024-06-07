"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleForm = document.getElementById('toggleForm');
    const toggleFormLogin = document.getElementById('toggleFormLogin');
    const loginUserName = document.getElementById('loginUserName');
    const loginPwd = document.getElementById('loginPwd');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    const registerUserName = document.getElementById('registerUserName');
    const registerPwd = document.getElementById('registerPwd');
    const registerEmailError = document.getElementById('registerEmailError');
    const registerPasswordError = document.getElementById('registerPasswordError');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = loginUserName.value;
        const password = loginPwd.value;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordValid = password.length >= 6;
        loginEmailError === null || loginEmailError === void 0 ? void 0 : loginEmailError.classList.toggle('hidden', emailValid);
        loginPasswordError === null || loginPasswordError === void 0 ? void 0 : loginPasswordError.classList.toggle('hidden', passwordValid);
        if (emailValid && passwordValid) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                alert('Login successful!');
            }
            else {
                alert('Invalid email or password.');
            }
        }
    });
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = registerUserName.value;
        const password = registerPwd.value;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordValid = password.length >= 6;
        registerEmailError === null || registerEmailError === void 0 ? void 0 : registerEmailError.classList.toggle('hidden', emailValid);
        registerPasswordError === null || registerPasswordError === void 0 ? void 0 : registerPasswordError.classList.toggle('hidden', passwordValid);
        if (emailValid && passwordValid) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! You can now login.');
            toggleForms();
        }
    });
    toggleForm.addEventListener('click', function (event) {
        event.preventDefault();
        toggleForms();
    });
    toggleFormLogin.addEventListener('click', function (event) {
        event.preventDefault();
        toggleForms();
    });
    function toggleForms() {
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
        toggleForm.classList.toggle('hidden');
        toggleFormLogin.classList.toggle('hidden');
    }
});
