document.addEventListener("DOMContentLoaded", async () => {
    // DOM elements
    const navbar = document.getElementById("navbar");
    initNavLinks(); // Add this line

    
    
    // Variables for navbar behavior
    let lastScroll = window.scrollY;
    let navbarIsVisible = true;
    const navbarShowDistance = 100; // Distance from the top of the page to show navbar when cursor is near
    const navbarHideDistance = 100; // Distance from the top to hide navbar when cursor moves further down

    // Handle scroll behavior for hiding and showing navbar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 0 && window.scrollY > lastScroll && window.scrollY > 50) {
            // Hide navbar when scrolling down
            navbar.style.transform = "translateY(-100%)"; 
            navbarIsVisible = false;
        } else if (window.scrollY === 0) {
            // Keep navbar visible when at the top of the page
            navbar.style.transform = "translateY(0)";
            navbarIsVisible = true;
        } else {
            // Show navbar when scrolling up
            navbar.style.transform = "translateY(0)";
            navbarIsVisible = true;
        }
        lastScroll = window.scrollY;
    });

    // Handle mouse movement to show or hide navbar based on cursor position
    window.addEventListener("mousemove", (event) => {
        const mouseY = event.clientY;

        if (window.scrollY === 0) {
            // Always keep navbar visible when at the top
            navbar.style.transform = "translateY(0)";
            navbarIsVisible = true;
        } else if (mouseY < navbarShowDistance && !navbarIsVisible) {
            // Show navbar when cursor is near the top
            navbar.style.transform = "translateY(0)";
            navbarIsVisible = true;
        } else if (mouseY > navbarHideDistance && navbarIsVisible) {
            // Hide navbar when cursor moves further down
            navbar.style.transform = "translateY(-100%)";
            navbarIsVisible = false;
        }
    });

    function initNavLinks() {
        document.querySelectorAll('#nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle internal page links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                // External links will behave normally
            });
        });
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navbar.classList.toggle('navbar-active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navbar.classList.remove('navbar-active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });

    // Update initNavLinks to close menu on mobile
    function initNavLinks() {
        document.querySelectorAll('#nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    navbar.classList.remove('navbar-active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                }
                // Rest of your existing click handler...
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navbar.classList.remove('navbar-active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });
});

