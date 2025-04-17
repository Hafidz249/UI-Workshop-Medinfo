/**
 * Scroll Effects Component
 * Handles smooth scrolling and other scroll-related effects
 */
class ScrollEffects {
  constructor() {
    this.init();
  }

  init() {
    // Smooth scrolling for navigation links
    this.setupSmoothScroll();

    // Parallax effect for hero section
    this.setupParallax();

    // Back to top button
    this.setupBackToTop();

    // Highlight active section in navigation
    this.setupActiveNavHighlight();
  }

  setupSmoothScroll() {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calculate header height for offset
          const headerHeight = document.querySelector("header").offsetHeight;

          // Scroll to element with offset for fixed header
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20,
            behavior: "smooth",
          });
        }
      });
    });
  }

  setupParallax() {
    // Simple parallax effect for hero section
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < window.innerHeight) {
        // Move background at a different rate than scroll
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  }

  setupBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement("button");
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = "back-to-top";
    backToTopBtn.style.position = "fixed";
    backToTopBtn.style.bottom = "20px";
    backToTopBtn.style.right = "20px";
    backToTopBtn.style.display = "none";
    backToTopBtn.style.backgroundColor = "var(--primary-color)";
    backToTopBtn.style.color = "#fff";
    backToTopBtn.style.borderRadius = "50%";
    backToTopBtn.style.border = "none";
    backToTopBtn.style.width = "40px";
    backToTopBtn.style.height = "40px";
    backToTopBtn.style.fontSize = "16px";
    backToTopBtn.style.cursor = "pointer";
    backToTopBtn.style.zIndex = "99";
    backToTopBtn.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";

    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.style.display = "block";
        backToTopBtn.style.opacity = "1";
      } else {
        backToTopBtn.style.opacity = "0";
        setTimeout(() => {
          if (window.scrollY <= 500) {
            backToTopBtn.style.display = "none";
          }
        }, 300);
      }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  setupActiveNavHighlight() {
    // Get all sections that have an ID
    const sections = document.querySelectorAll("section[id]");

    // Highlight active section in navigation menu
    window.addEventListener("scroll", () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + 150; // Added offset for better UX

      // Check each section to see if it's in view
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        // Find matching navigation link
        const navigationLink = document.querySelector(
          `a[href="#${sectionId}"]`
        );

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          // Add active class to highlight current section in menu
          if (navigationLink) {
            // Remove active from all links first
            document.querySelectorAll("#main-nav a").forEach((link) => {
              link.classList.remove("active-link");
            });

            // Add active to current link
            navigationLink.classList.add("active-link");
          }
        }
      });
    });
  }
}

// Initialize scroll effects when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.scrollEffects = new ScrollEffects();
});
