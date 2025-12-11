// script.js
// Disable right-click context menu on entire page
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Optional: Show custom message
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
// Loader Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// Current Date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = today;
    }
}
updateDate();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            
            // Animate theme change
            createThemeParticles();
        } else {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            createThemeParticles();
        }
    });
}

// Theme Change Particles
function createThemeParticles() {
    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx;
            y += vy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Notification Bell Animation
const notificationBell = document.getElementById('notificationBell');
if (notificationBell) {
    notificationBell.addEventListener('click', () => {
        notificationBell.style.animation = 'none';
        setTimeout(() => {
            notificationBell.style.animation = 'bounce 0.5s ease';
        }, 10);
        
        // Show notification dropdown (can be expanded)
        alert('3 new notifications:\n\n1. Project by: DIMAS DK\n2. Origin from: Github\n3. Wm: PAPER©');
    });
}

// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    observer.observe(counter);
});

// Skill Bar Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.skill-progress');
            if (progress && !progress.classList.contains('animated')) {
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.transition = 'width 1.5s ease-in-out';
                    progress.style.width = progress.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
                }, 100);
                progress.classList.add('animated');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Project Filter (for projects.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects with animation
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                }, 10);
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Account Tabs (for account.html)
const accountTabs = document.querySelectorAll('.account-tab');
const tabContents = document.querySelectorAll('.tab-content');

accountTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Update active tab
        accountTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding content
        tabContents.forEach(content => {
            if (content.id === tabName) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// Dark Mode Toggle in Preferences
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    darkModeToggle.checked = savedTheme === 'dark';
    
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            if (themeToggle) themeToggle.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            if (themeToggle) themeToggle.classList.replace('fa-sun', 'fa-moon');
        }
        createThemeParticles();
    });
}

// FAQ Accordion (for contact.html)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Contact Form Submission
function submitContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
    
    if (isValid) {
        // Create success animation
        const button = document.querySelector('.btn-submit');
        button.textContent = 'Sending...';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            // Confetti animation
            createConfetti();
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                button.style.background = '';
                form.reset();
            }, 3000);
        }, 1500);
    } else {
        alert('Please fill in all required fields!');
    }
}

// Confetti Animation
function createConfetti() {
    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translateY(${window.innerHeight + 100}px) rotate(${rotation}deg)`, 
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect on Hero Section
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}


// Add hover effect to all cards
document.querySelectorAll('.stat-card, .skill-card, .project-card, .tier-card, .supporter-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Save Button Animation
document.querySelectorAll('.btn-save').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Saved Successfully!';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        }, 1500);
    });
});

// Project Card Like Animation
document.querySelectorAll('.project-likes').forEach(likes => {
    likes.style.cursor = 'pointer';
    
    likes.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const icon = this.querySelector('i');
        const currentCount = parseInt(this.textContent.trim());
        
        if (icon.classList.contains('fas')) {
            icon.classList.replace('fas', 'far');
            this.innerHTML = `<i class="far fa-heart"></i> ${currentCount - 1}`;
        } else {
            icon.classList.replace('far', 'fas');
            this.innerHTML = `<i class="fas fa-heart"></i> ${currentCount + 1}`;
            
            // Heart animation
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.color = '#ec4899';
            heart.style.fontSize = '24px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            
            heart.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-50px) scale(1.5)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            setTimeout(() => heart.remove(), 1000);
        }
    });
});

// Add floating animation to hero floating cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
});

// Typing Effect for Hero Title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect if on home page
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && !sessionStorage.getItem('typingDone')) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
    sessionStorage.setItem('typingDone', 'true');
}

// Add ripple effect to buttons
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

console.log('🚀 Profile website loaded successfully!');
console.log('✨ All animations and interactions are active!');

// Welcome screen fade-out
window.addEventListener("load", () => {
    const welcome = document.getElementById("welcomeScreen");

    setTimeout(() => {
        welcome.classList.add("hidden");
    }, 1500); // 1.5 detik sebelum hilang
});
