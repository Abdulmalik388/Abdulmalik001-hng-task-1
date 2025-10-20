// script.js - form validation + UX + toast redirect

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const successToastEl = document.getElementById('successToast');
  let toast;

  if (successToastEl) {
    toast = new bootstrap.Toast(successToastEl);
  }

  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successEl = document.getElementById('success');

    const errors = {
      name: document.getElementById('error-name'),
      email: document.getElementById('error-email'),
      subject: document.getElementById('error-subject'),
      message: document.getElementById('error-message')
    };

    function clearErrors() {
      Object.values(errors).forEach(el => el.textContent = '');
      successEl.textContent = '';
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      let valid = true;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Validation logic
      if (!name) {
        errors.name.textContent = 'Full name is required.';
        nameInput.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        nameInput.removeAttribute('aria-invalid');
      }

      if (!email) {
        errors.email.textContent = 'Email is required.';
        emailInput.setAttribute('aria-invalid', 'true');
        valid = false;
      } else if (!validateEmail(email)) {
        errors.email.textContent = 'Enter a valid email (name@example.com).';
        emailInput.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        emailInput.removeAttribute('aria-invalid');
      }

      if (!subject) {
        errors.subject.textContent = 'Subject is required.';
        subjectInput.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        subjectInput.removeAttribute('aria-invalid');
      }

      if (!message) {
        errors.message.textContent = 'Message is required.';
        messageInput.setAttribute('aria-invalid', 'true');
        valid = false;
      } else if (message.length < 10) {
        errors.message.textContent = 'Message must be at least 10 characters.';
        messageInput.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        messageInput.removeAttribute('aria-invalid');
      }

      if (!valid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // ✅ On success: show toast + redirect
      form.reset();

      if (toast) {
        toast.show();
      } else {
        // Fallback in case toast element missing
        successEl.textContent = 'Message sent successfully! Redirecting...';
      }

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    });
  }

  // Accessibility: ensure skip-to-content works
  const skipLink = document.querySelector('.skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
        main.removeAttribute('tabindex');
      }
    });
  }
});
