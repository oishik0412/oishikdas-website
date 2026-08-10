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
  }


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


  const heroImage = document.getElementById("heroImage");
  const heroCounter = document.getElementById("heroCounter");


  if (heroImage) {

    let currentImage = 0;

    const changeHeroImage = () => {

      currentImage =
        (currentImage + 1) % images.length;

      heroImage.classList.add("image-changing");

      setTimeout(() => {

        heroImage.src =
          "images/" + images[currentImage];

        if (heroCounter) {
          heroCounter.textContent =
            String(currentImage + 1).padStart(2, "0") +
            " / " +
            String(images.length).padStart(2, "0");
        }

        heroImage.onload = () => {
          heroImage.classList.remove("image-changing");
        };

      }, 350);
    };

    setInterval(changeHeroImage, 4000);
  }


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
        "Oishik Das photograph " +
        String(index + 1);

      imageElement.loading =
        index === 0 ? "eager" : "lazy";

      const caption =
        document.createElement("figcaption");

      caption.textContent =
        String(index + 1).padStart(2, "0");

      figure.appendChild(imageElement);
      figure.appendChild(caption);

      galleryGrid.appendChild(figure);

    });

  }


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
          threshold: 0.08
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      if (
        link.hostname === window.location.hostname &&
        link.getAttribute("href") &&
        !link.getAttribute("href").startsWith("#")
      ) {

        document.body.classList.add("page-leaving");

      }

    });

  });

});
