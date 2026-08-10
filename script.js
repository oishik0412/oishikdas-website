/* =========================================================
   OISHIK DAS
   WEBSITE INTERACTIONS
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation"
        : "Open navigation"
    );

  });


  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    });

  });

}


/* =========================================================
   HOME IMAGE SLIDESHOW
========================================================= */

const heroImages = document.querySelectorAll(".hero-image");
const heroCurrent = document.querySelector(".hero-current");

let currentImage = 0;

function showHeroImage(index) {

  heroImages.forEach((image, imageIndex) => {

    image.classList.toggle(
      "image-active",
      imageIndex === index
    );

  });

  if (heroCurrent) {

    heroCurrent.textContent =
      String(index + 1).padStart(2, "0");

  }

}


if (heroImages.length > 1) {

  showHeroImage(0);

  setInterval(() => {

    currentImage =
      (currentImage + 1) % heroImages.length;

    showHeroImage(currentImage);

  }, 5000);

}


/* =========================================================
   PRELOAD ALL HOME IMAGES
========================================================= */

const imageSources = [

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

imageSources.forEach((source) => {

  const image = new Image();

  image.src = source;

});


/* =========================================================
   KEYBOARD CONTROL FOR HOME SLIDESHOW
========================================================= */

document.addEventListener("keydown", (event) => {

  if (!heroImages.length) {
    return;
  }

  if (event.key === "ArrowRight") {

    currentImage =
      (currentImage + 1) % heroImages.length;

    showHeroImage(currentImage);

  }

  if (event.key === "ArrowLeft") {

    currentImage =
      (currentImage - 1 + heroImages.length)
      % heroImages.length;

    showHeroImage(currentImage);

  }

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".section-label, " +
  ".intro-content, " +
  ".journey-introduction, " +
  ".journey-chapter, " +
  ".research-introduction, " +
  ".research-statement, " +
  ".creative-introduction, " +
  ".creative-item, " +
  ".press-content, " +
  ".gallery-introduction, " +
  ".gallery-image, " +
  ".social-heading, " +
  ".social-grid, " +
  ".contact-content"
);


revealElements.forEach((element) => {

  element.classList.add("reveal");

});


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks =
  document.querySelectorAll(".nav-links a");


const navigationObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        const currentSection =
          entry.target.getAttribute("id");

        navigationLinks.forEach((link) => {

          const linkTarget =
            link.getAttribute("href");

          link.classList.toggle(
            "active",
            linkTarget === `#${currentSection}`
          );

        });

      });

    },
    {
      threshold: 0.25
    }
  );


sections.forEach((section) => {

  navigationObserver.observe(section);

});


/* =========================================================
   SMOOTH ANCHOR POSITIONING
========================================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

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

  });

});


/* =========================================================
   GALLERY IMAGE LOAD EFFECT
========================================================= */

const galleryImages =
  document.querySelectorAll(".gallery-image img");


galleryImages.forEach((image) => {

  if (image.complete) {

    image.classList.add("loaded");

  } else {

    image.addEventListener(
      "load",
      () => {

        image.classList.add("loaded");

      },
      {
        once: true
      }
    );

  }

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const footerYear =
  document.querySelector(".footer-bottom span");

if (footerYear) {

  footerYear.textContent =
    `© ${new Date().getFullYear()} Oishik Das`;

}
