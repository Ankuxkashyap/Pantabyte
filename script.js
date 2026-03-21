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

  // Smooth scrolling for all anchor links
  //   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  //     anchor.addEventListener("click", function (e) {
  //       if (this.getAttribute("href") !== "#") {
  //         e.preventDefault();
  //         const targetId = this.getAttribute("href").substring(1);
  //         const targetElement = document.getElementById(targetId);

  //         if (targetElement) {
  //           targetElement.scrollIntoView({
  //             behavior: "smooth",
  //             block: "start",
  //           });
  //         }
  //       }
  //     });
  //   });
});
