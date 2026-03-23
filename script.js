document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const sections = document.querySelectorAll(".pb-legal-section");
  const tocLinks = document.querySelectorAll(".pb-toc-link");

  const filterBtns = document.querySelectorAll(".pb-filter-btn");
  const categories = document.querySelectorAll(".pb-product-category");

  window.addEventListener(
    "scroll",
    () => {
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute("id");
        }
      });
      tocLinks.forEach((link) => {
        link.classList.remove("pb-toc-active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("pb-toc-active");
        }
      });
    },
    { passive: true },
  );

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("pb-filter-active"));
      btn.classList.add("pb-filter-active");

      const filter = btn.dataset.filter;

      categories.forEach((cat) => {
        if (filter === "all") {
          cat.style.display = "block";
        } else {
          const catName = cat
            .querySelector(".pb-product-cat-title")
            .textContent.toLowerCase();
          cat.style.display = catName === filter ? "block" : "none";
        }
      });
    });
  });

  const nav = document.querySelector(".pb-nav");
  window.addEventListener(
    "scroll",
    () => {
      nav.style.background =
        window.scrollY > 50
          ? "rgba(255,255,255,0.98)"
          : "rgba(255,255,255,0.94)";
    },
    { passive: true },
  );

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) {
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
