```javascript
/* =========================================================
   OISHIK DAS — WEBSITE INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     MOBILE NAVIGATION
     ------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });

  }


  /* -------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".section, .direction-card, .journey-point, .feature-layout, .press-preview, .social-grid, .creative-link"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("is-visible");

    });

  }


  /* -------------------------------------------------------
     ACTIVE NAVIGATION
     ------------------------------------------------------- */

  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          const currentSection = entry.target.getAttribute("id");

          navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

              link.classList.add("active");

            }

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(section => {

      sectionObserver.observe(section);

    });

  }


  /* -------------------------------------------------------
     HERO IMAGE ROTATION
     ------------------------------------------------------- */

  const heroImage = document.querySelector(".hero-image");

  if (heroImage) {

    const images = [
      "images/20250924_133130~2.jpg",
      "images/20251014_180851.jpg",
      "images/20260125_193828.jpg",
      "images/20260125_201909.jpg",
      "images/20260206_160230.jpg",
      "images/20260319_170756.jpg",
      "images/20260319_172505.jpg",
      "images/20260320_001553.jpg",
      "images/20260320_002604.jpg",
      "images/20260405_014526.jpg",
      "images/IMG-20251227-WA0002.jpg"
    ];

    let currentImage = 0;

    const changeImage = () => {

      heroImage.classList.add("changing");

      setTimeout(() => {

        currentImage =
          (currentImage + 1) % images.length;

        heroImage.src = images[currentImage];

        heroImage.onload = () => {

          heroImage.classList.remove("changing");

        };

      }, 350);

    };

    setInterval(changeImage, 4500);

  }


  /* -------------------------------------------------------
     GALLERY LIGHTBOX
     ------------------------------------------------------- */

  const galleryImages = document.querySelectorAll(
    ".gallery-image"
  );

  const lightbox = document.querySelector(
    ".lightbox"
  );

  const lightboxImage = document.querySelector(
    ".lightbox img"
  );

  const lightboxClose = document.querySelector(
    ".lightbox-close"
  );

  if (
    galleryImages.length &&
    lightbox &&
    lightboxImage
  ) {

    galleryImages.forEach(image => {

      image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightboxImage.alt =
          image.alt || "Oishik Das";

        lightbox.classList.add("open");

        document.body.classList.add(
          "lightbox-open"
        );

      });

    });


    const closeLightbox = () => {

      lightbox.classList.remove("open");

      document.body.classList.remove(
        "lightbox-open"
      );

    };


    if (lightboxClose) {

      lightboxClose.addEventListener(
        "click",
        closeLightbox
      );

    }


    lightbox.addEventListener(
      "click",
      event => {

        if (event.target === lightbox) {

          closeLightbox();

        }

      }
    );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          lightbox.classList.contains("open")
        ) {

          closeLightbox();

        }

      }
    );

  }


  /* -------------------------------------------------------
     SMOOTH ANCHOR NAVIGATION
     ------------------------------------------------------- */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener(
        "click",
        event => {

          const targetId =
            anchor.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* -------------------------------------------------------
     CURRENT YEAR
     ------------------------------------------------------- */

  const yearElement =
    document.querySelector("[data-current-year]");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* -------------------------------------------------------
     IMAGE FALLBACK
     ------------------------------------------------------- */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.classList.add(
            "image-error"
          );

        }
      );

    });

});
```
