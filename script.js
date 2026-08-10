/* =========================================================
   OISHIK DAS — WEBSITE INTERACTIONS
   ========================================================= */


/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

  });

  navItems.forEach((item) => {

    item.addEventListener("click", () => {

      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");

    });

  });

}


/* HERO IMAGE ROTATION */

const heroImages = document.querySelectorAll(".hero-image");
const heroCurrent = document.querySelector(".hero-current");

let currentImage = 0;

function changeHeroImage() {

  heroImages[currentImage].classList.remove("active");

  currentImage = (currentImage + 1) % heroImages.length;

  heroImages[currentImage].classList.add("active");

  if (heroCurrent) {
    heroCurrent.textContent =
      String(currentImage + 1).padStart(2, "0");
  }

}

if (heroImages.length > 1) {

  setInterval(changeHeroImage, 5000);

}


/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        navigationLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }

      }

    });

  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => {
  observer.observe(section);
});


/* IMAGE LOAD FADE */

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach((image) => {

  image.addEventListener("load", () => {
    image.classList.add("loaded");
  });

});


/* PREVENT BROKEN HASH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});
