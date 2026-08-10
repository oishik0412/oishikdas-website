document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

```
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


/* Close menu after selecting a section */

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
```

}

/* =========================================================
SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
".direction-card, .feature-layout, .press-preview, .intro-content, .journey-line, .creative-heading, .social-grid"
);

revealElements.forEach((element) => {
element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
(entries, observer) => {

```
  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    }

  });

},
{
  threshold: 0.12,
  rootMargin: "0px 0px -60px 0px"
}
```

);

revealElements.forEach((element) => {
revealObserver.observe(element);
});

/* =========================================================
CURRENT SECTION IN NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
"main section[id]"
);

const navigationLinks = document.querySelectorAll(
".nav-links a"
);

const sectionObserver = new IntersectionObserver(
(entries) => {

```
  entries.forEach((entry) => {

    if (!entry.isIntersecting) {
      return;
    }

    navigationLinks.forEach((link) => {
      link.classList.remove("active");
    });


    const activeLink = document.querySelector(
      `.nav-links a[href="#${entry.target.id}"]`
    );


    if (activeLink) {
      activeLink.classList.add("active");
    }

  });

},
{
  threshold: 0.35
}
```

);

sections.forEach((section) => {
sectionObserver.observe(section);
});

/* =========================================================
SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

```
link.addEventListener("click", (event) => {

  const targetId = link.getAttribute("href");

  if (!targetId || targetId === "#") {
    return;
  }


  const target = document.querySelector(targetId);

  if (!target) {
    return;
  }


  event.preventDefault();


  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});
```

});

/* =========================================================
FOOTER YEAR
========================================================= */

const yearElement = document.querySelector(
".footer-bottom span:first-child"
);

if (yearElement) {

```
yearElement.textContent =
  `© ${new Date().getFullYear()} Oishik Das`;
```

}

/* =========================================================
REDUCED MOTION ACCESSIBILITY
========================================================= */

const prefersReducedMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {

```
document.documentElement.style.scrollBehavior = "auto";

document.querySelectorAll(".reveal").forEach((element) => {

  element.classList.add("visible");

});
```

}

});
