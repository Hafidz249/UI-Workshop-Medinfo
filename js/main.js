/**
 * Main JavaScript Entry Point
 * Coordinates all components and initializes the application
 */
class App {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.setupCustomAnimations();
  }

  init() {
    console.log("Medinfo App Initialized");

    // Add a 'loaded' class to body when page is fully loaded
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");

      // Delay a bit for initial animations
      setTimeout(() => {
        this.animateHeroElements();
      }, 300);
    });
  }

  setupEventListeners() {
    // Window resize handler
    window.addEventListener("resize", this.handleResize.bind(this));

    // Custom button handlers
    this.setupButtonHandlers();
  }

  setupButtonHandlers() {
    // Get action buttons
    const learnMoreBtn = document.querySelector(".hero .btn-primary");
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          const headerHeight = document.querySelector("header").offsetHeight;
          window.scrollTo({
            top: aboutSection.offsetTop - headerHeight - 20,
            behavior: "smooth",
          });
        }
      });
    }

    // Other action buttons can be hooked up here
  }

  handleResize() {
    // Handle responsive adjustments if needed
    console.log("Window resized");
  }

  setupCustomAnimations() {
    // Add custom animations not defined in HTML
    // Example: animate elements that are dynamically added

    // Dynamically add CSS for active-link class
    const style = document.createElement("style");
    style.textContent = `
      .active-link {
        color: var(--accent-color) !important;
      }
      
      .active-link::after {
        width: 100% !important;
      }
      
      /* Add animation for header scroll effect */
      header.scrolled {
        padding: 10px 5%;
        background-color: rgba(30, 42, 68, 0.95);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      
      /* Transition for the back-to-top button */
      .back-to-top {
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .back-to-top:hover {
        transform: translateY(-5px);
      }
      
      /* Add fade-in animation for page load */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      body.loaded {
        animation: fadeIn 1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  animateHeroElements() {
    // Add some custom animations to hero elements if needed
    const heroElements = document.querySelectorAll(".hero *");

    heroElements.forEach((element, index) => {
      // Ensure AOS animations play nice with custom animations
      element.style.opacity = "1";
    });
  }
}

// Initialize the main app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
