/**
 * Navigation Component
 * Handles all navigation functionality including mobile menu toggle
 */
class Navigation {
  constructor() {
    this.toggleBtn = document.getElementById("menu-toggle");
    this.nav = document.getElementById("main-nav");
    this.navLinks = document.querySelectorAll("#main-nav a");

    this.init();
  }

  init() {
    // Toggle menu on click
    this.toggleBtn.addEventListener("click", () => this.toggleMenu());

    // Close menu when clicking a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.nav.contains(e.target) &&
        !this.toggleBtn.contains(e.target) &&
        this.nav.classList.contains("active")
      ) {
        this.closeMenu();
      }
    });

    // Add scroll event for header
    this.handleHeaderScroll();
  }

  toggleMenu() {
    this.toggleBtn.classList.toggle("active");
    this.nav.classList.toggle("active");
  }

  closeMenu() {
    this.nav.classList.remove("active");
    this.toggleBtn.classList.remove("active");
  }

  handleHeaderScroll() {
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

// Initialize navigation when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.navigationComponent = new Navigation();
});
