/* ---------- Dark Mode Toggle ---------- */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Check for saved user preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

/* ---------- Back to Top Button ---------- */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ---------- Active Navbar Link ---------- */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ---------- Scroll Reveal (IntersectionObserver) ---------- */
const revealElements = document.querySelectorAll(
  ".hero-left, .hero-right, .skill-box, .project-card, .contact form, .education-item"
);

// Add reveal class to elements initially
revealElements.forEach(el => el.classList.add("reveal"));

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

/* ---------- Staggered Animation Logic ---------- */
// Stagger Skills
const skillBoxes = document.querySelectorAll('.skill-box');
skillBoxes.forEach((box, index) => {
  const delayClass = `reveal-delay-${((index % 4) + 1) * 100}`;
  box.classList.add(delayClass);
});

// Stagger Projects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  const delayClass = `reveal-delay-${((index % 3) + 1) * 100}`;
  card.classList.add(delayClass);
});

/* ---------- Contact Form (SAFE) ---------- */
const form = document.querySelector(".contact form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) valid = false;
    });

    if (!valid) {
      alert("Please fill all fields.");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
  });
}
/* ---------- Typing Effect ---------- */
const words = ["Developer", "Engineer", "Programmer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.querySelector(".typing");

if (typingElement) {
  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingElement.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      typingElement.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 70 : 120);
  }

  typeEffect();
}

/* ---------- 3D Tilt Effect for Project Cards ---------- */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-10deg to 10deg)
    const xRot = -1 * ((y - rect.height / 2) / (rect.height / 2)) * 10;
    const yRot = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

