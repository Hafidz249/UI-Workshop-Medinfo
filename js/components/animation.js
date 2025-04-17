/**
 * Animation Component
 * Initializes and configures AOS (Animate On Scroll) animations
 */
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 800, // Default animation duration
      easing: "ease-in-out", // Default easing for AOS animations
      once: false, // Whether animation should happen only once
      mirror: true, // Whether elements should animate out while scrolling past them
      offset: 120, // Offset (in px) from the original trigger point
      delay: 0, // Default delay before animation starts
      anchorPlacement: "top-bottom", // Define which position of the element regarding to window should trigger the animation
    });

    // Refresh AOS on window resize
    window.addEventListener("resize", () => {
      AOS.refresh();
    });
  }

  // Add custom animation to any element
  addCustomAnimation(element, animationType, delay = 0, duration = 800) {
    if (!element) return;

    element.setAttribute("data-aos", animationType);
    element.setAttribute("data-aos-delay", delay);
    element.setAttribute("data-aos-duration", duration);

    // Refresh AOS to apply new animations
    AOS.refresh();
  }
}

// Initialize animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.animationManager = new AnimationManager();
});
