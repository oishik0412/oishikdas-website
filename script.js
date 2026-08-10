document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------
     MOBILE NAVIGATION
  -------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });


    navLinks.querySelectorAll("a").forEach(link => {

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


  /* --------------------------------
     MASTER IMAGE ARCHIVE
  -------------------------------- */

  const images = [
    "20250924_133130~2.jpg",
    "20251014_180851.jpg",
    "20260125_193828.jpg",
    "20260125_201909.jpg",
    "20260206_160230.jpg",
    "20260319_170756.jpg",
    "20260319_172505.jpg",
    "20260320_001553.jpg",
    "20260320_002604.jpg",
    "20260405_014526.jpg",
    "IMG-20251227-WA0002.jpg"
  ];


  /* --------------------------------
     HOME BACKGROUND SLIDESHOW
  -------------------------------- */

  const heroBackground =
    document.getElementById("heroBackground");

  const heroCounter =
    document.getElementById("heroCounter");


  if (heroBackground) {

    let currentImage = 0;
    let slideshowTimer = null;

    const preloadImages = () => {

      images.forEach(image => {

        const img = new Image();

        img.src = "images/" + image;

      });

    };


    const changeHeroImage = () => {

      currentImage =
        (currentImage + 1) % images.length;

      heroBackground.classList.add("changing");

      window.setTimeout(() => {

        heroBackground.style.backgroundImage =
          `url("images/${images[currentImage]}")`;

        if (heroCounter) {

          heroCounter.textContent =
            String(currentImage + 1).padStart(2, "0") +
            " / " +
            String(images.length).padStart(2, "0");

        }

        window.requestAnimationFrame(() => {

          heroBackground.classList.remove("changing");

        });

      }, 450);

    };


    preloadImages();

    slideshowTimer =
      window.setInterval(
        changeHeroImage,
        4500
      );


    document.addEventListener(
      "visibilitychange",
      () => {

        if (document.hidden) {

          window.clearInterval(slideshowTimer);

        } else {

          slideshowTimer =
            window.setInterval(
              changeHeroImage,
              4500
            );

        }

      }
    );

  }


  /* --------------------------------
     DYNAMIC GALLERY
  -------------------------------- */

  const galleryGrid =
    document.getElementById("galleryGrid");


  if (galleryGrid) {

    images.forEach((image, index) => {

      const figure =
        document.createElement("figure");

      figure.className =
        "gallery-item page-reveal";


      const imageElement =
        document.createElement("img");

      imageElement.src =
        "images/" + image;

      imageElement.alt =
        `Oishik Das photograph ${index + 1}`;

      imageElement.loading =
        index === 0
          ? "eager"
          : "lazy";


      const caption =
        document.createElement("figcaption");

      caption.textContent =
        String(index + 1).padStart(2, "0");


      figure.appendChild(imageElement);
      figure.appendChild(caption);

      galleryGrid.appendChild(figure);

    });

  }


  /* --------------------------------
     SCROLL REVEALS
  -------------------------------- */

  const revealElements =
    document.querySelectorAll(".page-reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observerInstance.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      element => observer.observe(element)
    );

  } else {

    revealElements.forEach(
      element => element.classList.add("visible")
    );

  }


  /* --------------------------------
     INTERNAL PAGE TRANSITION
  -------------------------------- */

  document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", event => {

      const href =
        link.getAttribute("href");

      if (!href) {
        return;
      }

      const isInternal =
        link.hostname === window.location.hostname;

      const isAnchor =
        href.startsWith("#");

      const isDownload =
        link.hasAttribute("download");

      const opensNewTab =
        link.target === "_blank";

      if (
        isInternal &&
        !isAnchor &&
        !isDownload &&
        !opensNewTab
      ) {

        event.preventDefault();

        document.body.classList.add(
          "page-leaving"
        );

        window.setTimeout(() => {

          window.location.href = href;

        }, 180);

      }

    });

  });


  /* --------------------------------
     ACTIVE NAVIGATION
  -------------------------------- */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() || "index.html";


  document.querySelectorAll(
    ".nav-links a"
  ).forEach(link => {

    const href =
      link.getAttribute("href");

    if (href === currentPage) {

      link.classList.add("active");

    }

  });


  /* --------------------------------
     REDUCE MOTION
  -------------------------------- */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (prefersReducedMotion.matches) {

    document
      .querySelectorAll(".page-reveal")
      .forEach(element => {

        element.classList.add("visible");

      });

  }

});
