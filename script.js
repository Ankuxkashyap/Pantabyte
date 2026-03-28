document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const sections = document.querySelectorAll(".pb-legal-section");
  const tocLinks = document.querySelectorAll(".pb-toc-link");

  // const filterBtns = document.querySelectorAll(".pb-filter-btn");
  // const categories = document.querySelectorAll(".pb-product-category");

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

  const filterBtns = document.querySelectorAll(".pb-filter-btn");
  const items = document.querySelectorAll("[data-cat]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("pb-filter-active"));
      btn.classList.add("pb-filter-active");

      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const cat = item.dataset.cat;

        item.style.display = filter === "all" || filter === cat ? "" : "none";
      });
      const sections = document.querySelectorAll(".pb-product-category");

      sections.forEach((section) => {
        const items = section.querySelectorAll("[data-cat]");
        let hasVisible = false;

        items.forEach((item) => {
          if (item.style.display !== "none") {
            hasVisible = true;
          }
        });

        section.style.display = hasVisible ? "" : "none";
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

  const marketingSliders = document.querySelectorAll("[data-marketing-slider]");

  marketingSliders.forEach((slider) => {
    const track = slider.querySelector("[data-marketing-track]");
    const slides = slider.querySelectorAll(".pb-ms-slide");
    const prevBtn = slider.querySelector("[data-marketing-prev]");
    const nextBtn = slider.querySelector("[data-marketing-next]");
    const dots = slider.querySelectorAll("[data-marketing-dot]");

    if (!track || !slides.length || !prevBtn || !nextBtn) return;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = track.querySelectorAll(".pb-ms-slide");

    let currentIndex = 1;
    const slideWidth = 100;

    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    const updateDots = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex - 1);
      });
    };

    const moveToSlide = () => {
      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      updateDots();
    };

    nextBtn.addEventListener("click", () => {
      if (currentIndex >= allSlides.length - 1) return;
      currentIndex++;
      moveToSlide();
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      moveToSlide();
    });

    track.addEventListener("transitionend", () => {
      if (allSlides[currentIndex] === firstClone) {
        track.style.transition = "none";
        currentIndex = 1;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      }

      if (allSlides[currentIndex] === lastClone) {
        track.style.transition = "none";
        currentIndex = allSlides.length - 2;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      }
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index + 1;
        moveToSlide();
      });
    });
  });
  const track = document.getElementById("testimonialTrack");
  const dots = document.querySelectorAll("#dots span");

  track.addEventListener("scroll", () => {
    const cards = track.querySelectorAll(".testimonial-card");
    const scrollLeft = track.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 16; // card + gap
    const index = Math.round(scrollLeft / cardWidth);
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  });
});
// carousel

const row1 = [
  {
    image: ``,
    name: "Callum James",
    role: "Vice President, Oliver Publishing",
    desc: "I have worked with Eunders (formerly Logimetry) for over a year on various projects, including a very large project to convert many courses from a proprietary format to SCORM. The Eunders team are excellent; they listen carefully and work quickly. They have great attention to detail. They work independently, but are prepared to ask for more direction when appropriate. Eunders' team have excellent technical skills, especially related to e-learning authorware (e.g. Captivate, Storyline, etc.) and SCORM standards. I highly recommend working with them.",
  },
  {
    image: ``,
    name: "Lucy",
    role: "Practice Manager, Physiocentric",
    desc: "Very helpful and did their best to accommodate our queries and concerns. Will continue using this service. We've had great comments about our new website and feel that it is modern and reaches the correct demographic. Thank you.",
  },
  {
    image: `https://web.archive.org/web/20250719171831im_/https://assets.eunders.org/web/themes/agency/assets/img/testimonials/erik-van-alstine.jpg`,
    name: "Erik Van Alstine",
    role: "ErikVanAlstine.com",
    desc: "Pranshu and his team have done excellent work for our company. I definitely plan to work with them again!",
  },
];

function buildCard(item) {
  return `
      <div class="c-card">
        <img 
          src="${item.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}" 
          onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'" 
          alt="User" 
          class="profile-img"
        >
        <div class="c-card-title">${item.name}</div>
        <div class="c-card-role">${item.role}</div>
        <div class="c-card-desc">${item.desc}</div>
      </div>`;
}

function fillTrack(trackId, items) {
  const track = document.getElementById(trackId);
  const doubled = [...items];
  // const doubled = [...items, ...items];
  track.innerHTML = doubled.map(buildCard).join("");
}

fillTrack("track1", row1);
