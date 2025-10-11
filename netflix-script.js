// Netflix Login/Logout/Signup Script

// Login Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Vui lòng nhập đầy đủ thông tin!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Vui lòng nhập email hợp lệ!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
                return;
            }
            
            // Simulate login process
            showNotification('Đang đăng nhập...', 'info');
            
            setTimeout(() => {
                // Store login status
                localStorage.setItem('netflix_logged_in', 'true');
                localStorage.setItem('netflix_user_email', email);
                if (remember) {
                    localStorage.setItem('netflix_remember', 'true');
                }
                
                showNotification('Đăng nhập thành công!', 'success');
                
                // Redirect to main page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 1500);
        });
        
        // Auto-fill email if remembered
        const rememberedEmail = localStorage.getItem('netflix_user_email');
        const isRemembered = localStorage.getItem('netflix_remember');
        
        if (rememberedEmail && isRemembered === 'true') {
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('remember').checked = true;
        }
    }
    
    // Signup Form Functionality
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const country = document.getElementById('country').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const newsletter = document.getElementById('newsletter').checked;
            
            // Validation
            if (!fullName || !email || !password || !confirmPassword || !country) {
                showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Vui lòng nhập email hợp lệ!', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }
            
            if (!isPasswordValid(password)) {
                showNotification('Mật khẩu không đáp ứng yêu cầu!', 'error');
                return;
            }
            
            if (!agreeTerms) {
                showNotification('Vui lòng đồng ý với điều khoản sử dụng!', 'error');
                return;
            }
            
            // Simulate signup process
            showNotification('Đang tạo tài khoản...', 'info');
            
            setTimeout(() => {
                // Store user data
                const userData = {
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    country: country,
                    newsletter: newsletter,
                    signupDate: new Date().toISOString()
                };
                
                localStorage.setItem('netflix_user_data', JSON.stringify(userData));
                localStorage.setItem('netflix_logged_in', 'true');
                localStorage.setItem('netflix_user_email', email);
                
                showNotification('Đăng ký thành công!', 'success');
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 1500);
        });
        
        // Password validation real-time
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', validatePasswordRealtime);
        }
    }
    
    // Check if user is already logged in and redirect
    checkLoginStatus();
    
    // Add floating labels effect
    addFloatingLabels();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation function
function isPasswordValid(password) {
    const hasLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return hasLength && hasUpper && hasLower && hasNumber;
}

// Real-time password validation
function validatePasswordRealtime() {
    const password = document.getElementById('password').value;
    const requirements = {
        length: document.getElementById('req-length'),
        upper: document.getElementById('req-upper'),
        lower: document.getElementById('req-lower'),
        number: document.getElementById('req-number')
    };
    
    // Check each requirement
    const hasLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    // Update visual indicators
    if (requirements.length) {
        requirements.length.classList.toggle('valid', hasLength);
    }
    if (requirements.upper) {
        requirements.upper.classList.toggle('valid', hasUpper);
    }
    if (requirements.lower) {
        requirements.lower.classList.toggle('valid', hasLower);
    }
    if (requirements.number) {
        requirements.number.classList.toggle('valid', hasNumber);
    }
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('netflix_logged_in');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (isLoggedIn === 'true' && currentPage === 'login.html') {
        // User is already logged in, redirect to dashboard
        showNotification('Bạn đã đăng nhập rồi!', 'info');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
}

// Add floating labels effect
function addFloatingLabels() {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
            if (!this.value) {
                this.classList.remove('has-value');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const bgColor = type === 'success' ? '#28a745' : 
                   type === 'error' ? '#dc3545' : 
                   type === 'warning' ? '#ffc107' : '#007bff';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Helvetica Neue', Arial, sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Logout functionality
function performLogout() {
    // Clear stored login data
    localStorage.removeItem('netflix_logged_in');
    localStorage.removeItem('netflix_user_email');
    localStorage.removeItem('netflix_remember');
    
    // Show logout message
    showNotification('Đã đăng xuất thành công!', 'success');
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Check if logout page should redirect
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'logout.html') {
        const isLoggedIn = localStorage.getItem('netflix_logged_in');
        
        if (isLoggedIn !== 'true') {
            // User is not logged in, redirect to login
            showNotification('Bạn chưa đăng nhập!', 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    }
});

// Add logout animation
function addLogoutAnimations() {
    const successIcon = document.querySelector('.success-icon');
    const logoutContent = document.querySelector('.logout-content');
    
    if (successIcon && logoutContent) {
        // Animate elements on page load
        setTimeout(() => {
            successIcon.style.opacity = '0';
            successIcon.style.transform = 'scale(0.5)';
            successIcon.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                successIcon.style.opacity = '1';
                successIcon.style.transform = 'scale(1)';
            }, 100);
        }, 500);
        
        // Animate content
        setTimeout(() => {
            logoutContent.style.opacity = '0';
            logoutContent.style.transform = 'translateY(20px)';
            logoutContent.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                logoutContent.style.opacity = '1';
                logoutContent.style.transform = 'translateY(0)';
            }, 200);
        }, 300);
    }
}

// Initialize logout animations
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'logout.html') {
        addLogoutAnimations();
    }
});
