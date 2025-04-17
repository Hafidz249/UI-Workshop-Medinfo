/**
 * Form Handler Component
 * Handles form submissions and validation
 */
class FormHandler {
  constructor() {
    this.contactForm = document.getElementById("contact-form");

    this.init();
  }

  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    // Add input event listeners for real-time validation
    const formInputs = document.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("input", () => this.validateInput(input));
      input.addEventListener("blur", () => this.validateInput(input));
    });
  }

  validateInput(input) {
    // Simple validation based on required attribute
    if (input.hasAttribute("required") && !input.value.trim()) {
      this.setError(input, "Field cannot be empty");
      return false;
    }

    // Email validation
    if (input.type === "email" && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        this.setError(input, "Please enter a valid email address");
        return false;
      }
    }

    // Clear any error
    this.clearError(input);
    return true;
  }

  setError(input, message) {
    // Remove existing error
    this.clearError(input);

    // Create error element
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    error.style.color = "red";
    error.style.fontSize = "0.8rem";
    error.style.display = "block";
    error.style.marginTop = "5px";

    // Insert error after input
    input.parentNode.appendChild(error);
    input.style.borderColor = "red";
  }

  clearError(input) {
    // Remove existing error if any
    const parent = input.parentNode;
    const existingError = parent.querySelector(".error-message");
    if (existingError) {
      parent.removeChild(existingError);
    }
    input.style.borderColor = "";
  }

  handleSubmit(e) {
    e.preventDefault();

    // Validate all inputs first
    let isValid = true;
    const inputs = this.contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show success message
    this.showMessage("Form submitted successfully! We will contact you soon.");

    // Reset form
    this.contactForm.reset();

    // In a real application, you would send the form data to a server here
    // For demo purposes, we're just showing a success message
  }

  showMessage(message, isError = false) {
    // Create message element
    const messageElement = document.createElement("div");
    messageElement.className = isError ? "error-alert" : "success-alert";
    messageElement.textContent = message;
    messageElement.style.padding = "10px";
    messageElement.style.marginTop = "20px";
    messageElement.style.borderRadius = "5px";
    messageElement.style.backgroundColor = isError ? "#ffebee" : "#e8f5e9";
    messageElement.style.color = isError ? "#c62828" : "#2e7d32";

    // Remove existing messages
    const existingMessage = this.contactForm.nextElementSibling;
    if (
      existingMessage &&
      (existingMessage.className === "success-alert" ||
        existingMessage.className === "error-alert")
    ) {
      existingMessage.remove();
    }

    // Add the message after the form
    this.contactForm.parentNode.insertBefore(
      messageElement,
      this.contactForm.nextSibling
    );

    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
      }
    }, 5000);
  }
}

// Initialize form handler when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.formHandler = new FormHandler();
});
