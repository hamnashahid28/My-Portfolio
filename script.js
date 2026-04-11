// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  easing: "ease-out-cubic",
  offset: 80,
});

// Smooth scrolling for in-page navigation (for older browsers and fine control)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  });
});

// Animate skills progress bars when they enter the viewport
const progressBars = document.querySelectorAll(".progress-bar");

if ("IntersectionObserver" in window && progressBars.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.getAttribute("data-progress");
          if (target) {
            bar.style.width = `${target}%`;
          }
          obs.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  progressBars.forEach((bar) => observer.observe(bar));
} else {
  // Fallback: set widths immediately
  progressBars.forEach((bar) => {
    const target = bar.getAttribute("data-progress");
    if (target) {
      bar.style.width = `${target}%`;
    }
  });
}

// Basic contact form handling (front-end only)
const contactForm = document.querySelector(".contact-form");
const statusText = document.querySelector(".form-status");

if (contactForm && statusText) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    statusText.textContent =
      "Thank you for your message. I will get back to you as soon as possible.";
    contactForm.reset();
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Project screenshot carousels (arrows only; slide images link to live site)
document.querySelectorAll("[data-project-carousel]").forEach((card) => {
  const root = card.querySelector(".project-carousel");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".project-slide"));
  const prevBtn = root.querySelector(".project-carousel-prev");
  const nextBtn = root.querySelector(".project-carousel-next");
  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) index = 0;

  const show = (nextIndex) => {
    const i = ((nextIndex % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, j) => {
      slide.classList.toggle("is-active", j === i);
    });
    index = i;
  };

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    show(index - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    show(index + 1);
  });
});

