document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     HERO PHOTO SLIDESHOW
     11 PHOTOS
  ======================================================= */

  const slides = document.querySelectorAll(".hero-slide");
  const currentCounter = document.getElementById("slide-current");

  let currentSlide = 0;

  if (slides.length > 1) {

    setInterval(() => {

      slides[currentSlide].classList.remove("active");

      currentSlide =
        (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add("active");

      if (currentCounter) {

        currentCounter.textContent =
          String(currentSlide + 1).padStart(2, "0");

      }

    }, 5000);

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section, .journey-point, .creative-links a, .gallery-grid img"
  );

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08
    }
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navigationLinks =
    document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        navigationLinks.forEach(link => {

          link.classList.remove("active");

          if (
            link.getAttribute("href") ===
            `#${entry.target.id}`
          ) {
            link.classList.add("active");
          }

        });

      });

    },
    {
      threshold: 0.45
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

});
