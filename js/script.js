const THEME_STORAGE_KEY = "portfolio-theme";
const SYSTEM_DARK_QUERY = "(prefers-color-scheme: dark)";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mreyprzr";

initPreloader();

function initPreloader() {
  const preloader = document.querySelector("#preloader");

  if (!preloader) {
    return;
  }

  let dismissed = false;

  const hidePreloader = () => {
    if (dismissed) {
      return;
    }

    dismissed = true;
    preloader.classList.add("preloader-hidden");

    window.setTimeout(() => {
      preloader.remove();
    }, 320);
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader, { once: true });
    window.setTimeout(hidePreloader, 4000);
  }
}

if (document.body) {
  applyTheme(getPreferredTheme(), { animateIcon: false });
} else {
  document.addEventListener(
    "DOMContentLoaded",
    () => applyTheme(getPreferredTheme(), { animateIcon: false }),
    { once: true }
  );
}

// Shared front-end interactions for all pages.
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSystemThemeListener();
  initActiveNavigation();
  initBackToTopButton();
  initProjectRendering();
  initImageEnhancements();
  initPortfolioCardOverlayTitles();
  initPortfolioFilters();
  initPortfolioExpandable();
  initGraphicsProjectModal();
  initPhotographyCollections();
  initGalleryPreview();
  initSmartAboutLink();
  initSmoothScroll();
  initScrollReveal();
  initDynamicContactField();
  initContactForm();
});

function getPreferredTheme() {
  const storedTheme = getStoredTheme();

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  if (window.matchMedia && window.matchMedia(SYSTEM_DARK_QUERY).matches) {
    return "dark";
  }

  return "light";
}

function initThemeToggle() {
  const themeToggleInput = document.querySelector("#theme-toggle");

  if (!themeToggleInput) {
    return;
  }

  updateThemeToggleUi(getActiveTheme(), false);

  themeToggleInput.addEventListener("change", () => {
    const nextTheme = themeToggleInput.checked ? "light" : "dark";
    applyTheme(nextTheme, { animateIcon: true });
    saveTheme(nextTheme);
  });
}

function initSystemThemeListener() {
  if (getStoredTheme()) {
    return;
  }

  if (!window.matchMedia) {
    return;
  }

  const mediaQuery = window.matchMedia(SYSTEM_DARK_QUERY);
  const onChange = (event) => {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light", { animateIcon: false });
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(onChange);
  }
}

function applyTheme(theme, options = {}) {
  const normalizedTheme = theme === "light" ? "light" : "dark";

  document.body.classList.remove("dark-mode", "light-mode");
  document.body.classList.add(`${normalizedTheme}-mode`);
  document.documentElement.setAttribute("data-theme", normalizedTheme);
  updateThemeToggleUi(normalizedTheme, Boolean(options.animateIcon));
}

function getActiveTheme() {
  return document.body.classList.contains("light-mode") ? "light" : "dark";
}

function updateThemeToggleUi(activeTheme, animateIcon) {
  const themeToggleInput = document.querySelector("#theme-toggle");

  if (!themeToggleInput) {
    return;
  }

  const isLight = activeTheme === "light";
  const nextTheme = isLight ? "dark" : "light";
  const slider = themeToggleInput.nextElementSibling;

  themeToggleInput.checked = isLight;
  themeToggleInput.setAttribute("aria-label", `Switch to ${nextTheme} mode`);

  if (!slider || !animateIcon) {
    return;
  }

  slider.classList.remove("is-animating");
  requestAnimationFrame(() => {
    slider.classList.add("is-animating");
    window.setTimeout(() => slider.classList.remove("is-animating"), 320);
  });
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Ignore storage failures and keep the in-memory theme only.
  }
}

function initActiveNavigation() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  if (!navLinks.length) {
    return;
  }

  const currentPath = normalizePath(window.location.pathname);

  navLinks.forEach((link) => {
    link.classList.remove("active", "active-nav");

    const href = link.getAttribute("href") || "";

    if (!href || href.startsWith("#")) {
      return;
    }

    const hrefPath = normalizePath(href.split("#")[0]);

    if (hrefPath === currentPath) {
      link.classList.add("active", "active-nav");
    }
  });
}

function normalizePath(path) {
  const lowerPath = (path || "").toLowerCase();

  if (lowerPath.includes("blog-posts/")) {
    return "blog.html";
  }

  const normalized = lowerPath.split("/").pop() || "index.html";

  if (
    normalized === "graphics-design.html" ||
    normalized === "poster-design.html" ||
    normalized === "social-media-design.html" ||
    normalized === "logo-design.html"
  ) {
    return "portfolio.html";
  }

  return normalized;
}

function initBackToTopButton() {
  const footerBackToTopButton = document.querySelector("#footer-back-to-top");

  if (footerBackToTopButton) {
    footerBackToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  let backToTopButton = document.querySelector("#back-to-top");

  // Prefer the footer button when it exists and avoid duplicate controls.
  if (footerBackToTopButton) {
    if (backToTopButton) {
      backToTopButton.remove();
    }
    return;
  }

  if (!backToTopButton) {
    backToTopButton = document.createElement("button");
    backToTopButton.id = "back-to-top";
    backToTopButton.className = "back-to-top";
    backToTopButton.type = "button";
    backToTopButton.setAttribute("aria-label", "Back to top");
    backToTopButton.textContent = "\u2191";
    document.body.appendChild(backToTopButton);
  }

  const toggleBackToTopVisibility = () => {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("is-visible");
    } else {
      backToTopButton.classList.remove("is-visible");
    }
  };

  toggleBackToTopVisibility();
  window.addEventListener("scroll", toggleBackToTopVisibility, { passive: true });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
function initImageEnhancements() {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    if (!image.classList.contains("img-fluid")) {
      image.classList.add("img-fluid");
    }

    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }

    if (!image.hasAttribute("decoding")) {
      image.setAttribute("decoding", "async");
    }
  });
}

function getProjectsData() {
  if (Array.isArray(window.projects)) {
    return window.projects;
  }

  if (Array.isArray(window.portfolioProjects)) {
    return window.portfolioProjects;
  }

  return [];
}

function initProjectRendering() {
  const projects = getProjectsData();

  if (!projects.length) {
    return;
  }

  renderFeaturedProjects(projects);
  renderPortfolioProjects(projects);
}

function renderFeaturedProjects(projects) {
  const featuredContainer = document.querySelector("[data-featured-projects]");

  if (!featuredContainer) {
    return;
  }

  const featuredProjects = projects
    .filter((project) => project && project.featured === true)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));

  featuredContainer.innerHTML = featuredProjects
    .map((project) => createProjectCard(project, { context: "home" }))
    .join("");
}

function renderPortfolioProjects(projects) {
  const categoryContainers = document.querySelectorAll("[data-project-list]");

  if (!categoryContainers.length) {
    return;
  }

  categoryContainers.forEach((container) => {
    const category = (container.dataset.projectList || "").trim();

    if (!category) {
      container.innerHTML = "";
      return;
    }

    const categoryProjects = projects.filter(
      (project) => project && project.category === category
    );

    container.innerHTML = categoryProjects
      .map((project) => createProjectCard(project, { context: "portfolio" }))
      .join("");
  });
}

function createProjectCard(project, options = {}) {
  if (!project || typeof project !== "object") {
    return "";
  }

  const context = options.context || "portfolio";

  if (context === "home") {
    return createHomeProjectCard(project);
  }

  switch (project.projectType) {
    case "graphic":
      return createGraphicPortfolioCard(project);
    case "video":
      return createVideoPortfolioCard(project);
    case "photo-collection":
      return createPhotographyCollectionCard(project);
    case "web":
      return createWebProjectCard(project);
    default:
      return "";
  }
}

function createHomeProjectCard(project) {
  const title = escapeHtml(project.homeTitle || project.title || "Project");
  const categoryLabel = escapeHtml(project.categoryLabel || "Project");
  const imageSource = escapeHtml(project.homeImage || project.image || "images/web/project-web.svg");
  const imageAlt = escapeHtml(project.homeAlt || project.imageAlt || `${project.title || "Project"} preview`);
  const filter = typeof project.category === "string" ? project.category : "";
  const targetUrl = filter ? `portfolio.html?filter=${encodeURIComponent(filter)}` : "portfolio.html";

  return `
    <div class="col-md-6 col-lg-4">
      <a class="card-work d-block" href="${escapeHtml(targetUrl)}">
        <div class="card-work-image">
          <img class="img-fluid" src="${imageSource}" alt="${imageAlt}" loading="lazy" decoding="async">
          <div class="card-overlay"></div>
        </div>
        <div class="card-work-body">
          <span class="card-label">${categoryLabel}</span>
          <h3>${title}</h3>
        </div>
      </a>
    </div>
  `;
}

function createGraphicPortfolioCard(project) {
  const title = escapeHtml(project.title || "Graphic Project");
  const description = escapeHtml(project.description || "Project details and visual outputs.");
  const imageSource = escapeHtml(project.image || "");
  const imageAlt = escapeHtml(project.imageAlt || `${project.title || "Graphic project"} by Shahriyer Sayem`);
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const galleryImages = gallery
    .map((image, index) => {
      const imageSrc = escapeHtml((image && image.src) || "");
      const altText = escapeHtml(
        (image && image.alt) || `${project.title || "Graphic project"} sample ${index + 1}`
      );

      return `<img src="${imageSrc}" class="img-fluid" loading="lazy" decoding="async" alt="${altText}">`;
    })
    .join("");

  return `
    <div class="col-sm-12 col-md-6 col-lg-4" data-portfolio-item data-category="graphic-design">
      <article class="portfolio-grid-card graphics-project-card" data-graphics-project data-project-title="${title}" data-project-description="${description}" role="button" tabindex="0" aria-label="Open ${title} project gallery">
        <img class="img-fluid" loading="lazy" decoding="async" src="${imageSource}" alt="${imageAlt}">
        <div class="portfolio-grid-card-body">
          <h3>${title}</h3>
        </div>
      </article>
      <div class="project-gallery d-none" aria-hidden="true">
        ${galleryImages}
      </div>
    </div>
  `;
}

function createVideoPortfolioCard(project) {
  const title = escapeHtml(project.title || "Video Project");
  const youtubeId = escapeHtml(project.youtubeId || "");

  if (!youtubeId) {
    return "";
  }

  return `
    <article class="video-card" data-portfolio-item data-category="video-production">
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${youtubeId}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <h3 class="video-title">${title}</h3>
    </article>
  `;
}

function createPhotographyCollectionCard(project) {
  const title = escapeHtml(project.title || "Photography Collection");
  const subtitle = escapeHtml(project.subtitle || "");
  const imageSource = escapeHtml(project.image || "");
  const imageAlt = escapeHtml(project.imageAlt || `${project.title || "Photography collection"} cover`);
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const galleryImages = gallery
    .map((image, index) => {
      const imageSrc = escapeHtml((image && image.src) || "");
      const altText = escapeHtml(
        (image && image.alt) || `${project.title || "Photography collection"} image ${index + 1}`
      );

      return `<img src="${imageSrc}" class="img-fluid" loading="lazy" decoding="async" alt="${altText}">`;
    })
    .join("");

  return `
    <article class="photo-collection-card" data-portfolio-item data-category="photography" data-photo-collection role="button" tabindex="0" data-collection-title="${title}" data-collection-subtitle="${subtitle}">
      <img src="${imageSource}" class="img-fluid" loading="lazy" decoding="async" alt="${imageAlt}">
      <div class="photo-collection-overlay">
        <div class="photo-collection-text">
          <h3>${title}</h3>
          <p>${subtitle}</p>
        </div>
      </div>
      <div class="photo-collection-gallery d-none" aria-hidden="true">
        ${galleryImages}
      </div>
    </article>
  `;
}

function createWebProjectCard(project) {
  const title = escapeHtml(project.title || "Web Project");
  const description = escapeHtml(project.description || "Web project details.");
  const imageSource = escapeHtml(project.image || "images/project-web.svg");
  const imageAlt = escapeHtml(project.imageAlt || `${project.title || "Web project"} preview`);
  const status = escapeHtml(project.statusLabel || "Completed");
  const statusClass = getStatusBadgeClass(project.status);
  const modalTarget = escapeHtml(project.modalTarget || "");
  const liveUrl = escapeHtml(project.liveUrl || "#");
  const featuredCardClass = project.isFeaturedProject ? " featured-project" : "";
  const featuredTag = project.isFeaturedProject
    ? '<span class="featured-tag">Featured Project</span>'
    : "";

  return `
    <div class="web-project-item" data-portfolio-item data-category="web-design">
      <article class="web-project-card${featuredCardClass}">
        <div class="web-project-media">
          <img src="${imageSource}" class="img-fluid" loading="lazy" decoding="async" alt="${imageAlt}">
          ${featuredTag}
          <span class="status-badge card-badge ${statusClass}">${status}</span>
          <div class="web-project-overlay">
            <div class="project-actions">
              <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="${modalTarget}">View Details</button>
              <a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light btn-sm">Live Site</a>
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      </article>
    </div>
  `;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "live":
      return "status-live";
    case "development":
      return "status-development";
    case "completed":
    default:
      return "status-completed";
  }
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function initPortfolioCardOverlayTitles() {
  const cards = document.querySelectorAll(".portfolio-grid-card");

  cards.forEach((card) => {
    if (card.dataset.title) {
      return;
    }

    const heading = card.querySelector(".portfolio-grid-card-body h3");

    if (heading) {
      card.dataset.title = heading.textContent.trim();
    }
  });
}

function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const portfolioItems = document.querySelectorAll("[data-portfolio-item]");

  if (!filterButtons.length || !portfolioItems.length) {
    return;
  }

  const categoryBlocks = document.querySelectorAll(".category-block");

  const applyFilter = (selectedCategory) => {
    portfolioItems.forEach((item) => {
      const itemCategory = item.dataset.category || "";
      const shouldShow = selectedCategory === "all" || itemCategory === selectedCategory;
      item.classList.toggle("is-hidden", !shouldShow);
    });

    categoryBlocks.forEach((block) => {
      const visibleItems = block.querySelectorAll("[data-portfolio-item]:not(.is-hidden)");
      block.classList.toggle("is-hidden", visibleItems.length === 0);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter || "all";

      filterButtons.forEach((otherButton) => {
        const isActive = otherButton === button;
        otherButton.classList.toggle("active", isActive);
        otherButton.classList.toggle("active-filter", isActive);
        otherButton.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      applyFilter(selectedCategory);
    });
  });

  const requestedFilter = getPortfolioFilterFromUrl(filterButtons);
  const defaultButton =
    (requestedFilter && document.querySelector(`[data-filter="${requestedFilter}"]`)) ||
    document.querySelector('[data-filter="all"]') ||
    filterButtons[0];

  if (defaultButton) {
    defaultButton.classList.add("active", "active-filter");
    defaultButton.setAttribute("aria-pressed", "true");
    applyFilter(defaultButton.dataset.filter || "all");
  }
}

function initPortfolioExpandable() {
  const portfolioItems = document.querySelectorAll("[data-portfolio-item]");

  if (!portfolioItems.length) {
    return;
  }

  const categoryLabels = {
    "graphic-design": "Graphic Design",
    "video-production": "Video Production",
    photography: "Photography",
    "web-design": "Web Design"
  };

  const categoryDescriptions = {
    "graphic-design": "This project focuses on visual communication through composition, hierarchy, and color direction.",
    "video-production": "This project explores storytelling through pacing, framing, and post-production craft.",
    photography: "This project captures mood and narrative through light, moment, and visual perspective.",
    "web-design": "This project emphasizes clean structure, responsive flow, and practical user-focused design."
  };

  const categoryImageMap = {
    "graphic-design": ["images/graphic-1.svg", "images/graphic-2.svg", "images/graphic-3.svg"],
    "video-production": ["images/video-1.svg", "images/video-2.svg", "images/project-film.svg"],
    photography: ["images/photo-1.svg", "images/photo-2.svg", "images/project-photo.svg"],
    "web-design": ["images/web-1.svg", "images/web-2.svg", "images/project-web.svg"]
  };

  let activeEntry = null;

  const buildRelatedImages = (category, coverSrc) => {
    const merged = [coverSrc].concat(categoryImageMap[category] || []).filter(Boolean);
    const unique = merged.filter((src, index) => merged.indexOf(src) === index);
    return unique.slice(0, 3);
  };

  const createExpandableSection = (sectionId, title, category, categoryLabel, coverSrc) => {
    const relatedImages = buildRelatedImages(category, coverSrc);
    const description =
      title +
      " belongs to " +
      categoryLabel +
      ". " +
      (categoryDescriptions[category] || "Additional details and related previews are available below.");

    const section = document.createElement("section");
    section.className = "portfolio-expandable";
    section.id = sectionId;
    section.setAttribute("aria-hidden", "true");

    const inner = document.createElement("div");
    inner.className = "portfolio-expandable-inner";

    const detailText = document.createElement("p");
    detailText.className = "portfolio-expandable-text";
    detailText.textContent = description;

    const galleryGrid = document.createElement("div");
    galleryGrid.className = "row g-3 portfolio-detail-grid";

    relatedImages.forEach((src, index) => {
      const imageAlt = title + " related preview " + (index + 1);

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";

      const thumbButton = document.createElement("button");
      thumbButton.type = "button";
      thumbButton.className = "portfolio-detail-thumb";
      thumbButton.setAttribute("data-gallery-image", src);
      thumbButton.setAttribute("data-gallery-title", title);
      thumbButton.setAttribute("data-gallery-caption", categoryLabel + " project preview");
      thumbButton.setAttribute("data-gallery-alt", imageAlt);

      const thumbImage = document.createElement("img");
      thumbImage.className = "img-fluid";
      thumbImage.setAttribute("loading", "lazy");
      thumbImage.setAttribute("decoding", "async");
      thumbImage.src = src;
      thumbImage.alt = imageAlt;

      const overlay = document.createElement("span");
      overlay.className = "portfolio-detail-overlay";
      overlay.innerHTML = '<i class="bi bi-eye" aria-hidden="true"></i><span>Preview</span>';

      thumbButton.appendChild(thumbImage);
      thumbButton.appendChild(overlay);
      col.appendChild(thumbButton);
      galleryGrid.appendChild(col);
    });

    const hideButton = document.createElement("button");
    hideButton.type = "button";
    hideButton.className = "btn btn-outline-dark btn-pill btn-sm mt-3";
    hideButton.setAttribute("data-hide-project", "true");
    hideButton.textContent = "Hide Project";

    inner.appendChild(detailText);
    inner.appendChild(galleryGrid);
    inner.appendChild(hideButton);
    section.appendChild(inner);

    return section;
  };

  const closeEntry = (entry) => {
    if (!entry) {
      return;
    }

    entry.card.classList.remove("is-expanded");
    entry.trigger.setAttribute("aria-expanded", "false");
    entry.section.setAttribute("aria-hidden", "true");
    entry.section.style.maxHeight = "0px";

    if (activeEntry === entry) {
      activeEntry = null;
    }
  };

  const openEntry = (entry) => {
    if (!entry) {
      return;
    }

    entry.card.classList.add("is-expanded");
    entry.trigger.setAttribute("aria-expanded", "true");
    entry.section.setAttribute("aria-hidden", "false");
    entry.section.style.maxHeight = entry.section.scrollHeight + "px";
    activeEntry = entry;
  };

  const entries = [];

  portfolioItems.forEach((item, index) => {
    const card = item.querySelector(".portfolio-grid-card");
    const cardBody = card ? card.querySelector(".portfolio-grid-card-body") : null;
    const titleElement = cardBody ? cardBody.querySelector("h3") : null;
    const coverImage = card ? card.querySelector("img") : null;

    if (!card || !cardBody || !titleElement || !coverImage || card.querySelector(".portfolio-card-trigger")) {
      return;
    }

    const category = item.dataset.category || "project";

    if (category === "graphic-design" || category === "photography") {
      return;
    }

    const categoryLabel = categoryLabels[category] || "Project";
    const title = titleElement.textContent.trim();
    const coverSrc = coverImage.getAttribute("src") || "";

    if (!cardBody.querySelector(".card-label")) {
      const categoryTag = document.createElement("span");
      categoryTag.className = "card-label";
      categoryTag.textContent = categoryLabel;
      cardBody.insertBefore(categoryTag, titleElement);
    }

    const trigger = document.createElement("button");
    const sectionId = "portfolio-project-" + (index + 1);

    trigger.type = "button";
    trigger.className = "portfolio-card-trigger";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", sectionId);

    Array.from(card.children).forEach((child) => {
      if (!child.classList.contains("portfolio-expandable")) {
        trigger.appendChild(child);
      }
    });

    const expandableSection = createExpandableSection(sectionId, title, category, categoryLabel, coverSrc);

    card.appendChild(trigger);
    card.appendChild(expandableSection);

    const entry = {
      card,
      trigger,
      section: expandableSection
    };

    entries.push(entry);

    trigger.addEventListener("click", () => {
      if (entry.card.classList.contains("is-expanded")) {
        closeEntry(entry);
        return;
      }

      if (activeEntry && activeEntry !== entry) {
        closeEntry(activeEntry);
      }

      openEntry(entry);
    });

    const hideProjectButton = expandableSection.querySelector("[data-hide-project]");

    if (hideProjectButton) {
      hideProjectButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeEntry(entry);
        trigger.focus();
      });
    }

    expandableSection.querySelectorAll("img").forEach((image) => {
      image.addEventListener("load", () => {
        if (entry.card.classList.contains("is-expanded")) {
          entry.section.style.maxHeight = entry.section.scrollHeight + "px";
        }
      });
    });
  });

  document.querySelectorAll("[data-filter]").forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      if (activeEntry) {
        closeEntry(activeEntry);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (activeEntry) {
      activeEntry.section.style.maxHeight = activeEntry.section.scrollHeight + "px";
    }
  });
}

function initGraphicsProjectModal() {
  const projectCards = document.querySelectorAll("[data-graphics-project]");
  const modalElement = document.querySelector("#graphicsProjectModal");

  if (!projectCards.length || !modalElement || typeof bootstrap === "undefined") {
    return;
  }

  const modalTitle = document.querySelector("#graphicsProjectModalLabel");
  const modalDescription = document.querySelector("#graphicsProjectModalDescription");
  const modalGallery = document.querySelector("#graphicsProjectModalGallery");

  if (!modalTitle || !modalDescription || !modalGallery) {
    return;
  }

  const graphicsModal = bootstrap.Modal.getOrCreateInstance(modalElement);

  const openProject = (card) => {
    const item = card.closest("[data-portfolio-item]");
    const galleryImages = item ? item.querySelectorAll(".project-gallery img") : [];

    if (!galleryImages.length) {
      return;
    }

    const title = card.dataset.projectTitle || "Graphic Design Project";
    const description = card.dataset.projectDescription || "Project details and visual outputs.";

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalGallery.innerHTML = "";

    galleryImages.forEach((sourceImage, index) => {
      const imageSrc = sourceImage.getAttribute("src");

      if (!imageSrc) {
        return;
      }

      const imageAlt =
        sourceImage.getAttribute("alt") ||
        `${title} project preview ${index + 1}`;

      const thumbButton = document.createElement("button");
      thumbButton.type = "button";
      thumbButton.className = "graphics-modal-thumb";
      thumbButton.setAttribute("data-gallery-image", imageSrc);
      thumbButton.setAttribute("data-gallery-title", title);
      thumbButton.setAttribute("data-gallery-caption", imageAlt);
      thumbButton.setAttribute("data-gallery-alt", imageAlt);

      const previewImage = document.createElement("img");
      previewImage.className = "img-fluid";
      previewImage.src = imageSrc;
      previewImage.alt = imageAlt;
      previewImage.setAttribute("loading", "lazy");
      previewImage.setAttribute("decoding", "async");

      const overlay = document.createElement("span");
      overlay.className = "graphics-gallery-overlay";
      overlay.innerHTML = '<i class="bi bi-eye" aria-hidden="true"></i><span>Preview</span>';

      thumbButton.appendChild(previewImage);
      thumbButton.appendChild(overlay);
      modalGallery.appendChild(thumbButton);
    });

    graphicsModal.show();
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProject(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card);
      }
    });
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    modalGallery.innerHTML = "";
  });
}

function initPhotographyCollections() {
  const collectionCards = document.querySelectorAll("[data-photo-collection]");
  const collectionModalElement = document.querySelector("#photoCollectionModal");

  if (!collectionCards.length || !collectionModalElement || typeof bootstrap === "undefined") {
    return;
  }

  const modalTitle = document.querySelector("#photoCollectionModalLabel");
  const modalSubtitle = document.querySelector("#photoCollectionModalSubtitle");
  const modalGrid = document.querySelector("#photoCollectionModalGrid");
  const lightboxViewer = document.querySelector("#photoLightboxViewer");
  const lightboxImage = document.querySelector("#photoLightboxImage");
  const lightboxClose = document.querySelector("#photoLightboxClose");
  const lightboxPrev = document.querySelector("#photoLightboxPrev");
  const lightboxNext = document.querySelector("#photoLightboxNext");

  if (
    !modalTitle ||
    !modalSubtitle ||
    !modalGrid ||
    !lightboxViewer ||
    !lightboxImage ||
    !lightboxClose ||
    !lightboxPrev ||
    !lightboxNext
  ) {
    return;
  }

  const collectionModal = bootstrap.Modal.getOrCreateInstance(collectionModalElement);
  let currentCollectionImages = [];
  let currentLightboxIndex = 0;

  const closeLightbox = () => {
    lightboxViewer.classList.remove("is-active");
    lightboxViewer.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    lightboxImage.removeAttribute("alt");
  };

  const showLightboxImage = (index) => {
    if (!currentCollectionImages.length) {
      return;
    }

    const total = currentCollectionImages.length;
    currentLightboxIndex = ((index % total) + total) % total;
    const activeImage = currentCollectionImages[currentLightboxIndex];

    if (!activeImage) {
      return;
    }

    lightboxImage.src = activeImage.src;
    lightboxImage.alt = activeImage.alt;
    lightboxViewer.classList.add("is-active");
    lightboxViewer.setAttribute("aria-hidden", "false");
  };

  const renderCollectionGallery = (card) => {
    const collectionImages = card.querySelectorAll(".photo-collection-gallery img");

    currentCollectionImages = Array.from(collectionImages)
      .map((image, index) => {
        const source = image.getAttribute("src");

        if (!source) {
          return null;
        }

        const altText = image.getAttribute("alt") || `Photo collection image ${index + 1}`;

        return {
          src: source,
          alt: altText
        };
      })
      .filter(Boolean);

    modalGrid.innerHTML = "";

    currentCollectionImages.forEach((image, index) => {
      const itemButton = document.createElement("button");
      itemButton.type = "button";
      itemButton.className = "photo-gallery-item";
      itemButton.setAttribute("data-photo-index", String(index));

      const itemImage = document.createElement("img");
      itemImage.className = "img-fluid";
      itemImage.src = image.src;
      itemImage.alt = image.alt;
      itemImage.setAttribute("loading", "lazy");
      itemImage.setAttribute("decoding", "async");

      itemButton.appendChild(itemImage);
      modalGrid.appendChild(itemButton);
    });
  };

  const openCollection = (card) => {
    const collectionTitle = card.dataset.collectionTitle || "Photography Collection";
    const collectionSubtitle = card.dataset.collectionSubtitle || "";

    modalTitle.textContent = collectionTitle;
    modalSubtitle.textContent = collectionSubtitle;
    renderCollectionGallery(card);
    closeLightbox();
    collectionModal.show();
  };

  collectionCards.forEach((card) => {
    card.addEventListener("click", () => openCollection(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCollection(card);
      }
    });
  });

  modalGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-photo-index]");

    if (!trigger) {
      return;
    }

    const requestedIndex = Number(trigger.getAttribute("data-photo-index"));

    if (Number.isNaN(requestedIndex)) {
      return;
    }

    showLightboxImage(requestedIndex);
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => showLightboxImage(currentLightboxIndex - 1));
  lightboxNext.addEventListener("click", () => showLightboxImage(currentLightboxIndex + 1));

  lightboxViewer.addEventListener("click", (event) => {
    if (event.target === lightboxViewer) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightboxViewer.classList.contains("is-active")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showLightboxImage(currentLightboxIndex + 1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showLightboxImage(currentLightboxIndex - 1);
    }
  });

  collectionModalElement.addEventListener("hidden.bs.modal", () => {
    modalGrid.innerHTML = "";
    currentCollectionImages = [];
    closeLightbox();
  });
}

function getPortfolioFilterFromUrl(filterButtons) {
  const params = new URLSearchParams(window.location.search);
  const requested = (params.get("filter") || "").trim().toLowerCase();

  if (!requested) {
    return null;
  }

  const validFilters = new Set(
    Array.from(filterButtons).map((button) => (button.dataset.filter || "").toLowerCase())
  );

  return validFilters.has(requested) ? requested : null;
}
function initGalleryPreview() {
  const modalElement = document.querySelector("#galleryPreviewModal");

  if (!modalElement || typeof bootstrap === "undefined") {
    return;
  }

  const previewImage = document.querySelector("#galleryPreviewImage");
  const previewTitle = document.querySelector("#galleryPreviewLabel");
  const previewCaption = document.querySelector("#galleryPreviewCaption");

  if (!previewImage || !previewTitle || !previewCaption) {
    return;
  }

  const galleryModal = bootstrap.Modal.getOrCreateInstance(modalElement);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-gallery-image]");

    if (!trigger) {
      return;
    }

    event.preventDefault();

    const imageSource = trigger.dataset.galleryImage;

    if (!imageSource) {
      return;
    }

    const titleText = trigger.dataset.galleryTitle || "Design Preview";
    const captionText = trigger.dataset.galleryCaption || titleText;
    const altText = trigger.dataset.galleryAlt || captionText;

    previewImage.src = imageSource;
    previewImage.alt = altText;
    previewTitle.textContent = titleText;
    previewCaption.textContent = captionText;
    galleryModal.show();
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    previewImage.removeAttribute("src");
    previewImage.removeAttribute("alt");
    previewTitle.textContent = "Design Preview";
    previewCaption.textContent = "";
  });
}
function initSmartAboutLink() {
  const smartAboutLink = document.querySelector("[data-smart-about]");
  const aboutSection = document.querySelector("#about-preview");

  if (!smartAboutLink || !aboutSection) {
    return;
  }

  smartAboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    collapseMobileNavbar();

    if (isAboutSectionVisible(aboutSection)) {
      window.location.href = "about.html";
      return;
    }

    aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function isAboutSectionVisible(section) {
  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const navbarHeight = getNavbarHeight();
  const topInsideViewport = rect.top >= navbarHeight && rect.top <= viewportHeight * 0.75;
  const sectionOverlapsViewport = rect.bottom > navbarHeight && rect.top < viewportHeight;

  return topInsideViewport || (sectionOverlapsViewport && rect.top <= navbarHeight + 120);
}

function getNavbarHeight() {
  const navbar = document.querySelector(".site-navbar");
  return navbar ? navbar.getBoundingClientRect().height : 0;
}

function collapseMobileNavbar() {
  const expandedNavbar = document.querySelector(".navbar-collapse.show");

  if (!expandedNavbar || typeof bootstrap === "undefined") {
    return;
  }

  const collapseInstance = bootstrap.Collapse.getOrCreateInstance(expandedNavbar);
  collapseInstance.hide();
}

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([data-smart-about])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId.length < 2) {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();
      collapseMobileNavbar();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("in-view"));
    return;
  }

  // Show elements that are already visible as soon as the page loads.
  const revealVisibleNow = () => {
    revealElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add("in-view");
      }
    });
  };

  revealVisibleNow();
  requestAnimationFrame(revealVisibleNow);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -5% 0px"
    }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("in-view")) {
      observer.observe(element);
    }
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const visibleVertically = rect.bottom > 0 && rect.top < viewportHeight;
  const visibleHorizontally = rect.right > 0 && rect.left < viewportWidth;

  return visibleVertically && visibleHorizontally;
}

function initDynamicContactField() {
  const preferredMethodSelect = document.querySelector("#preferredContactMethod");
  const preferredValueLabel = document.querySelector("#preferredContactValueLabel");
  const preferredValueInput = document.querySelector("#preferredContactValue");

  if (!preferredMethodSelect || !preferredValueLabel || !preferredValueInput) {
    return;
  }

  const methodMap = {
    email: {
      label: "Email Address",
      placeholder: "Enter your email address",
      type: "email",
      inputMode: "email"
    },
    phone: {
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "tel",
      inputMode: "tel"
    },
    whatsapp: {
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "tel",
      inputMode: "tel"
    },
    linkedin: {
      label: "Profile Link",
      placeholder: "Paste your profile link",
      type: "url",
      inputMode: "url"
    },
    instagram: {
      label: "Profile Link",
      placeholder: "Paste your profile link",
      type: "url",
      inputMode: "url"
    },
    facebook: {
      label: "Profile Link",
      placeholder: "Paste your profile link",
      type: "url",
      inputMode: "url"
    }
  };

  const applyPreferredContactField = () => {
    const selectedMethod = (preferredMethodSelect.value || "email").toLowerCase();
    const selectedConfig = methodMap[selectedMethod] || methodMap.email;

    preferredValueLabel.textContent = selectedConfig.label;
    preferredValueInput.type = selectedConfig.type;
    preferredValueInput.placeholder = selectedConfig.placeholder;

    if (selectedConfig.inputMode) {
      preferredValueInput.setAttribute("inputmode", selectedConfig.inputMode);
    } else {
      preferredValueInput.removeAttribute("inputmode");
    }
  };

  preferredMethodSelect.addEventListener("change", applyPreferredContactField);

  const parentForm = preferredMethodSelect.closest("form");

  if (parentForm) {
    parentForm.addEventListener("reset", () => {
      window.setTimeout(applyPreferredContactField, 0);
    });
  }

  applyPreferredContactField();
}
function initContactForm() {
  const contactForm = document.querySelector("#contactForm");
  const feedback = document.querySelector("#formFeedback");

  if (!contactForm || !feedback) {
    return;
  }

  if (!contactForm.getAttribute("action")) {
    contactForm.setAttribute("action", FORMSPREE_ENDPOINT);
  }

  if (!contactForm.getAttribute("method")) {
    contactForm.setAttribute("method", "POST");
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      setFormFeedback(feedback, "Please complete all required fields.", true);
      return;
    }

    const formData = new FormData(contactForm);

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      contactForm.classList.remove("was-validated");
      contactForm.reset();
      setFormFeedback(feedback, "Message sent successfully.", false);
    } catch (error) {
      setFormFeedback(feedback, "Could not send the message right now. Please try again.", true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

function setFormFeedback(element, message, isError) {
  element.textContent = message;
  element.classList.add("show");
  element.classList.toggle("is-error", isError);
}

