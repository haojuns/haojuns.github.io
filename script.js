const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

const linkById = new Map(
  navLinks
    .map((link) => [link.getAttribute("href")?.slice(1), link])
    .filter(([id]) => Boolean(id)),
);

const setActive = (id) => {
  navLinks.forEach((link) => link.classList.remove("is-active"));
  linkById.get(id)?.classList.add("is-active");
};

const observer = new IntersectionObserver(
  (entries) => {
    if (window.scrollY < 120) {
      setActive("home");
      return;
    }

    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    setActive(visible.target.id);
  },
  {
    rootMargin: "-18% 0px -70% 0px",
    threshold: [0.05, 0.2, 0.45],
  },
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY < 120) setActive("home");
});
