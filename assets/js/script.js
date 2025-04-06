document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const nav = document.querySelector("nav");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.getElementById("nav-links");

    // ✅ Menu Toggle Button for Mobile
    menuToggle.addEventListener("click", function () {
        navLinksContainer.classList.toggle("show");
    });

    // ✅ Close menu when clicking a link (mobile UX)
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinksContainer.classList.remove("show");
        });
    });

    // ✅ Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: "smooth"
            });
        });
    });

    // ✅ Highlight active section on scroll
    function setActiveLink() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", function () {
        setActiveLink();

        // ✅ Change navbar background on scroll
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    setActiveLink(); // Run once on load

    // ✅ Intersection animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
