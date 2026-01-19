AOS.init({ duration: 700 });

// Countdown to February 21, 2026 09:00 local (only if countdown elements exist)
(() => {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;
  const target = new Date("2026-02-21T09:00:00");
  function tick() {
    const now = new Date();
    const d = Math.max(0, target - now);
    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((d % (1000 * 60)) / 1000);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minsEl.textContent = mins;
    secsEl.textContent = secs;
  }
  setInterval(tick, 1000);
  tick();
})();

// Theme toggle
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  if (localStorage.getItem("wes-theme") === "light") {
    document.documentElement.classList.add("light");
    themeBtn.textContent = "☀️";
  }
  themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    const isLight = document.documentElement.classList.contains("light");
    themeBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("wes-theme", isLight ? "light" : "dark");
  });
}

// Navbar Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("open");
});


// Register choice modal behavior
let registerChoiceListenersBound = false;
const bioModal = document.getElementById("bioModal");
const openRegister = document.getElementById("openRegister");
const heroRegister = document.getElementById("heroRegister");
const clickRegister = document.getElementById("clickRegister");
function openRegisterChoice(e) {
  const modal = document.getElementById("registerChoiceModal");
  if (modal) {
    if (e) e.preventDefault();
    modal.style.display = "flex";
    if (!registerChoiceListenersBound) {
      const closeBtn = modal.querySelector(".close");
      if (closeBtn) closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
      window.addEventListener("click", (evt) => {
        if (evt.target === modal) modal.style.display = "none";
      });
      registerChoiceListenersBound = true;
    }
  } else {
    window.location.href = "register.html";
  }
}
if (openRegister) openRegister.addEventListener("click", openRegisterChoice);
if (heroRegister) heroRegister.addEventListener("click", openRegisterChoice);
if (clickRegister) clickRegister.addEventListener("click", openRegisterChoice);

// Close behavior is bound lazily on first open

// Speaker bios
document.querySelectorAll(".view-bio").forEach((btn) => {
  btn.addEventListener("click", () => {
    const idx = btn.getAttribute("data-index");
    const card = document.querySelectorAll(".speaker-card")[idx - 1];
    const name = card.querySelector("h3").textContent;
    const role = card.querySelector(".role").textContent;
    const img = card.querySelector("img").src;
    document.getElementById("bioName").textContent = name;
    document.getElementById("bioTitle").textContent = role;
    document.getElementById("bioText").textContent =
      "Improving the GDP and bringing about high rates of employment in every Nation to champion an emergent economy in all developing countries through an ecosystem of self sustaining entrepreneurs.";
    document.getElementById("bioImg").src = img;
    bioModal.style.display = "flex";
  });
});

// Bio modal close handlers
if (bioModal) {
  const bioCloseBtn = bioModal.querySelector(".close, .bioClose");
  if (bioCloseBtn) {
    bioCloseBtn.addEventListener("click", () => {
      bioModal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === bioModal) bioModal.style.display = "none";
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") bioModal.style.display = "none";
  });
}

// Form demos
// document
//   .getElementById("registerForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     alert("Registration submitted successfully");
//     this.reset();
//     registerModal.style.display = "none";
//   });
// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   alert("Message sent");
//   this.reset();
// });
// document.getElementById("newsForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   alert("Subscribed");
//   this.reset();
// });

// Preselect ticket on register page based on query params
(function preselectRegisterTicket() {
  const ticketSelect = document.querySelector('.register-form select[name="ticket"], .register-form select[name="Type of ticket"], .register-form select[name="type_of_ticket"]');
  if (!ticketSelect) return;
  const params = new URLSearchParams(window.location.search);
  const ticketParam = params.get('ticket');
  const intentParam = params.get('intent');
  let desiredLabel = '';

  if (ticketParam) {
    switch (ticketParam.toLowerCase()) {
      case 'californium':
        desiredLabel = 'Californium Summit';
        break;
      case 'palladium':
        desiredLabel = 'Palladium Summit';
        break;
      case 'platinum':
      case 'platinium':
        desiredLabel = 'Platinium Summit';
        break;
      default:
        break;
    }
  } else if (intentParam) {
    switch (intentParam.toLowerCase()) {
      case 'sponsor':
        desiredLabel = 'Sponsor';
        break;
      case 'speaker':
        desiredLabel = 'Speaker';
        break;
      case 'ambassador':
        desiredLabel = 'Ambassador';
        break;
      case 'partner':
        desiredLabel = 'Partner';
        break;
      default:
        break;
    }
  }

  if (!desiredLabel) return;

  for (const opt of ticketSelect.options) {
    if (opt.text.trim().toLowerCase() === desiredLabel.toLowerCase()) {
      opt.selected = true;
      break;
    }
  }
})();

// Fetch submit for register form only
(function submitRegisterWithEmailJS() {
  const registerForm = document.querySelector('.register-form');
  if (!registerForm) return;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Replace with your EmailJS service + template IDs
    const serviceID = "service_iyawf42";
    const templateID = "template_jqpsscp";

    // Collect form data
    const formData = {
      name: registerForm.querySelector('input[name="name"]').value,
      email: registerForm.querySelector('input[name="email"]').value,
      phone: registerForm.querySelector('input[name="phone"]').value,
      type_of_ticket: registerForm.querySelector('select[name="type_of_ticket"]').value,
      company: registerForm.querySelector('input[name="company"]').value
    };

    // Send using EmailJS
    emailjs.send(serviceID, templateID, formData)
      .then(() => {
        // ✅ Success
        window.location.href = "thank-you.html";
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        // ❌ Failure
        window.location.href = "error.html";
      });
  });
})();




// Removed custom Formcarry AJAX override to allow native POST + Formcarry redirects
