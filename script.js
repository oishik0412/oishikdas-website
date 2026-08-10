document.addEventListener("DOMContentLoaded", () => {

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


    // Close mobile navigation after clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  // Reveal sections as they enter the viewport
  const revealElements = document.querySelectorAll(
    ".direction-card, .feature-layout, .press-preview, .social-grid, .creative-link"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  });


  // Current year
  const yearElement = document.querySelector(".footer-bottom span");

  if (yearElement) {

    yearElement.textContent =
      `© ${new Date().getFullYear()} Oishik Das`;

  }

});
