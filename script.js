// NovaStackHub — Contact Form validation & interactivity

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const overlay = document.getElementById("overlay");
  const popupClose = document.getElementById("popupClose");

  const fields = {
    fullName: {
      input: document.getElementById("fullName"),
      error: document.getElementById("err-fullName"),
      validate: (value) => {
        if (!value.trim()) return "Please enter your full name.";
        if (value.trim().length < 2) return "Name looks too short.";
        return "";
      },
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("err-email"),
      validate: (value) => {
        if (!value.trim()) return "Please enter your email address.";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value.trim())) return "Please enter a valid email address.";
        return "";
      },
    },
    phone: {
      input: document.getElementById("phone"),
      error: document.getElementById("err-phone"),
      validate: (value) => {
        if (!value.trim()) return ""; // optional field
        const phonePattern = /^[+]?[\d\s().-]{7,16}$/;
        if (!phonePattern.test(value.trim())) return "Please enter a valid phone number.";
        return "";
      },
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("err-message"),
      validate: (value) => {
        if (!value.trim()) return "Your message cannot be empty.";
        if (value.trim().length < 10) return "Tell us a little more (min 10 characters).";
        return "";
      },
    },
  };

  function showError(key, message) {
    const { input, error } = fields[key];
    const fieldWrapper = input.closest(".field");
    error.textContent = message;
    fieldWrapper.classList.toggle("has-error", Boolean(message));
  }

  function validateField(key) {
    const { input, validate } = fields[key];
    const message = validate(input.value);
    showError(key, message);
    return !message;
  }

  // live validation as the user types / leaves a field
  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => {
      if (fields[key].input.closest(".field").classList.contains("has-error")) {
        validateField(key);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = Object.keys(fields).map((key) => validateField(key));
    const isFormValid = results.every(Boolean);

    if (!isFormValid) {
      const firstInvalid = form.querySelector(".has-error input, .has-error textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // simulate sending the message
    openPopup();
    form.reset();
    Object.keys(fields).forEach((key) => showError(key, ""));
  });

  function openPopup() {
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  popupClose.addEventListener("click", closePopup);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });
});