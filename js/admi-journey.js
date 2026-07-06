(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".eej-page");

    if (!page) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progressFill = document.getElementById("eejProgressFill");
    const sectionLinks = Array.from(document.querySelectorAll(".eej-side-nav [data-target]"));
    const sideLineProgress = document.getElementById("eejSideLineProgress");
    const shareButton = document.getElementById("eejShareButton");
    const copyLinkButton = document.getElementById("eejCopyLinkButton");
    const shareLinks = {
      facebook: document.getElementById("eejShareFacebook"),
      linkedIn: document.getElementById("eejShareLinkedIn"),
      x: document.getElementById("eejShareX")
    };
    const counterElements = Array.from(document.querySelectorAll("[data-countup]"));
    const buetRankElement = document.querySelector(".eej-static-rank");
    const resultsCloud = document.getElementById("eejResultsCloud");
    const resultPills = resultsCloud ? Array.from(resultsCloud.querySelectorAll("[data-result-pill]")) : [];

    initProgress(progressFill);
    initSideNav(sectionLinks, sideLineProgress);
    initShareButtons(shareButton, copyLinkButton, shareLinks);
    initParticles(prefersReducedMotion);

    const gsapAvailable = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

    if (gsapAvailable && !prefersReducedMotion) {
      initGsapAnimations({
        counterElements,
        resultPills,
        buetRankElement
      });
    } else {
      initFallbackReveals();
      initFallbackCounts(counterElements);
      initFallbackResultPills(resultPills);
    }
  });

  function initProgress(progressFill) {
    if (!progressFill) {
      return;
    }

    const updateProgress = () => {
      const doc = document.documentElement;
      const top = doc.scrollTop || document.body.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? (top / max) * 100 : 0;
      progressFill.style.width = Math.max(0, Math.min(100, ratio)) + "%";
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function initSideNav(links, lineProgressElement) {
    if (!links.length) {
      return;
    }

    const sections = links
      .map((link) => {
        const id = link.getAttribute("data-target");
        const section = id ? document.getElementById(id) : null;
        return section ? { id, link, section } : null;
      })
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    const setActive = (activeIndex) => {
      sections.forEach((item, index) => {
        item.link.classList.toggle("is-active", index === activeIndex);
        item.link.classList.toggle("is-complete", index < activeIndex);
      });
    };

    const updateLineProgress = () => {
      if (!lineProgressElement) {
        return;
      }

      const firstTop = sections[0].section.offsetTop;
      const lastTop = sections[sections.length - 1].section.offsetTop;
      const probe = window.scrollY + window.innerHeight * 0.45;
      const distance = lastTop - firstTop;
      const ratio = distance > 0 ? (probe - firstTop) / distance : 0;
      const progress = Math.max(0, Math.min(1, ratio));
      lineProgressElement.style.height = progress * 100 + "%";
    };

    const findActiveIndex = () => {
      const probe = window.scrollY + window.innerHeight * 0.45;
      let activeIndex = 0;

      sections.forEach((item, index) => {
        if (probe >= item.section.offsetTop) {
          activeIndex = index;
        }
      });

      return activeIndex;
    };

    const updateSideNavState = () => {
      setActive(findActiveIndex());
      updateLineProgress();
    };

    updateSideNavState();
    window.addEventListener("scroll", updateSideNavState, { passive: true });
    window.addEventListener("resize", updateSideNavState);

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("data-target");
        const section = id ? document.getElementById(id) : null;

        if (!section) {
          return;
        }

        const index = sections.findIndex((item) => item.id === id);

        if (index !== -1) {
          setActive(index);
        }

        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initShareButtons(shareButton, copyLinkButton, shareLinks) {
    const pageTitle = "My Admission Journey at a Glance";
    const pageText = "A visual story of my university admission journey and results across 11 competitive entrance exams in Bangladesh.";
    const pageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(pageText);

    if (shareLinks.facebook) {
      shareLinks.facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }

    if (shareLinks.linkedIn) {
      shareLinks.linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }

    if (shareLinks.x) {
      shareLinks.x.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    }

    if (shareButton) {
      shareButton.addEventListener("click", async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: pageTitle,
              text: pageText,
              url: pageUrl
            });
            return;
          } catch (error) {
            // fall through to clipboard copy on cancellation/errors
          }
        }

        copyToClipboard(pageUrl, shareButton, "Link copied");
      });
    }

    if (copyLinkButton) {
      copyLinkButton.addEventListener("click", () => {
        copyToClipboard(pageUrl, copyLinkButton, "Link copied");
      });
    }
  }

  async function copyToClipboard(text, button, successLabel) {
    const initialHtml = button ? button.innerHTML : "";

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "readonly");
        area.style.position = "absolute";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }

      if (button) {
        button.innerHTML = `<i class="bi bi-check2" aria-hidden="true"></i> ${successLabel}`;
        window.setTimeout(() => {
          button.innerHTML = initialHtml;
        }, 1800);
      }
    } catch (error) {
      if (button) {
        button.innerHTML = `<i class="bi bi-exclamation-triangle" aria-hidden="true"></i> Copy failed`;
        window.setTimeout(() => {
          button.innerHTML = initialHtml;
        }, 1800);
      }
    }
  }

  function initParticles(reducedMotion) {
    const canvas = document.getElementById("eejParticles");

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
    const stars = [];
    const glows = [];
    const motes = [];
    let rafId = null;

    const renderStatic = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);

      glows.forEach((glow) => {
        const gradient = context.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.radius);
        gradient.addColorStop(0, `rgba(148, 220, 255, ${glow.opacity})`);
        gradient.addColorStop(1, "rgba(148, 220, 255, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = "rgba(148, 163, 184, 0.8)";

      stars.forEach((star) => {
        context.globalAlpha = Math.max(star.minOpacity, Math.min(star.maxOpacity, star.opacity));
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = "rgba(191, 219, 254, 0.55)";
      motes.forEach((mote) => {
        context.globalAlpha = mote.opacity;
        context.beginPath();
        context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * deviceRatio);
      canvas.height = Math.floor(height * deviceRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

      const density = reducedMotion ? 34 : width >= 1200 ? 76 : width >= 768 ? 58 : 42;
      const glowCount = reducedMotion ? 5 : width >= 1200 ? 12 : width >= 768 ? 9 : 7;
      const moteCount = reducedMotion ? 10 : width >= 1200 ? 24 : width >= 768 ? 18 : 14;
      stars.length = 0;
      glows.length = 0;
      motes.length = 0;

      for (let i = 0; i < density; i += 1) {
        stars.push(createStar(width, height, reducedMotion));
      }

      for (let i = 0; i < glowCount; i += 1) {
        glows.push(createGlowStar(width, height, reducedMotion));
      }

      for (let i = 0; i < moteCount; i += 1) {
        motes.push(createMote(width, height, reducedMotion));
      }

      if (reducedMotion) {
        renderStatic();
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(148, 163, 184, 0.8)";

      glows.forEach((glow) => {
        glow.x += glow.vx;
        glow.y += glow.vy;
        glow.opacity += glow.fadeDirection * glow.fadeSpeed;

        if (glow.opacity >= glow.maxOpacity || glow.opacity <= glow.minOpacity) {
          glow.fadeDirection *= -1;
        }

        if (glow.x < -40 || glow.x > width + 40 || glow.y < -40 || glow.y > height + 40) {
          Object.assign(glow, createGlowStar(width, height, reducedMotion));
          return;
        }

        const gradient = context.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.radius);
        gradient.addColorStop(0, `rgba(148, 220, 255, ${glow.opacity})`);
        gradient.addColorStop(1, "rgba(148, 220, 255, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = "rgba(148, 163, 184, 0.8)";

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.opacity += star.fadeDirection * star.fadeSpeed;

        if (star.opacity >= star.maxOpacity || star.opacity <= star.minOpacity) {
          star.fadeDirection *= -1;
        }

        if (star.x < -2 || star.x > width + 2 || star.y < -2 || star.y > height + 2) {
          Object.assign(star, createStar(width, height, reducedMotion));
          return;
        }

        context.globalAlpha = Math.max(star.minOpacity, Math.min(star.maxOpacity, star.opacity));
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = "rgba(191, 219, 254, 0.55)";
      motes.forEach((mote) => {
        mote.x += mote.vx;
        mote.y += mote.vy;

        if (mote.x < -4 || mote.x > width + 4 || mote.y < -4 || mote.y > height + 4) {
          Object.assign(mote, createMote(width, height, reducedMotion));
          return;
        }

        context.globalAlpha = mote.opacity;
        context.beginPath();
        context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      rafId = window.requestAnimationFrame(draw);
    };

    resize();

    if (reducedMotion) {
      renderStatic();
    } else {
      draw();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("beforeunload", () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    });
  }

  function createStar(width, height, reducedMotion) {
    const baseSpeed = reducedMotion ? 0.012 : 0.045;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * baseSpeed,
      vy: (Math.random() - 0.5) * baseSpeed,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      minOpacity: 0.16,
      maxOpacity: 0.95,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
      fadeSpeed: Math.random() * 0.004 + 0.0015
    };
  }

  function createGlowStar(width, height, reducedMotion) {
    const baseSpeed = reducedMotion ? 0.004 : 0.012;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * baseSpeed,
      vy: (Math.random() - 0.5) * baseSpeed,
      radius: Math.random() * 22 + 14,
      opacity: Math.random() * 0.22 + 0.08,
      minOpacity: 0.05,
      maxOpacity: 0.28,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
      fadeSpeed: Math.random() * 0.0009 + 0.00025
    };
  }

  function createMote(width, height, reducedMotion) {
    const baseSpeed = reducedMotion ? 0.01 : 0.03;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * baseSpeed,
      vy: (Math.random() - 0.5) * baseSpeed,
      radius: Math.random() * 1.9 + 0.8,
      opacity: Math.random() * 0.28 + 0.08
    };
  }

  function initGsapAnimations(options) {
    const counterElements = options.counterElements || [];
    const resultPills = options.resultPills || [];
    const buetRankElement = options.buetRankElement || null;

    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.from(".eej-hero [data-hero]", {
      opacity: 0,
      y: 24,
      duration: 1.02,
      stagger: 0.14,
      ease: "power3.out"
    });

    window.gsap.to(".eej-hero-glow", {
      yPercent: 22,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    window.gsap.utils.toArray(".eej-section-head, .eej-feature-card").forEach((element) => {
      window.gsap.to(element, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: element.closest(".eej-section") || element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    window.gsap.utils.toArray(".eej-reveal").forEach((element) => {
      window.gsap.from(element, {
        opacity: 0,
        y: 42,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          toggleActions: "play none none none"
        }
      });
    });

    window.gsap.utils.toArray(".eej-stagger-group").forEach((group) => {
      const cards = group.querySelectorAll(".eej-result-card");

      if (!cards.length) {
        return;
      }

      window.gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.72,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: group,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    if (buetRankElement) {
      window.gsap.set(buetRankElement, {
        opacity: 0,
        scale: 0.95,
        transformOrigin: "50% 50%"
      });

      window.ScrollTrigger.create({
        trigger: "#buet",
        start: "top 74%",
        once: true,
        onEnter: () => {
          window.gsap.to(buetRankElement, {
            opacity: 1,
            scale: 1,
            duration: 0.72,
            ease: "power2.out"
          });
        }
      });
    }

    counterElements.forEach((element) => {
      const endValue = Number(element.getAttribute("data-countup"));
      const decimals = Number(element.getAttribute("data-decimals") || 0);
      const suffix = element.getAttribute("data-suffix") || "";

      if (Number.isNaN(endValue)) {
        return;
      }

      window.ScrollTrigger.create({
        trigger: element,
        start: "top 84%",
        once: true,
        onEnter: () => animateCount(element, endValue, decimals, suffix)
      });
    });

    if (resultPills.length) {
      window.gsap.set(resultPills, {
        opacity: 0,
        y: 40,
        scale: 0.92
      });
    }

    if (resultPills.length) {
      const resultsCloud = document.getElementById("eejResultsCloud");

      resultPills.forEach((pill) => {
        const driftX = (Math.random() * 6 - 3).toFixed(2) + "px";
        const driftY = (Math.random() * 12 - 6).toFixed(2) + "px";
        const driftRotate = (Math.random() * 2 - 1).toFixed(2) + "deg";
        const driftDuration = (4 + Math.random() * 4).toFixed(2) + "s";
        const driftDelay = (Math.random() * 1.6).toFixed(2) + "s";
        pill.style.setProperty("--drift-x", driftX);
        pill.style.setProperty("--drift-y", driftY);
        pill.style.setProperty("--drift-r", driftRotate);
        pill.style.setProperty("--drift-duration", driftDuration);
        pill.style.setProperty("--drift-delay", driftDelay);
      });

      if (resultsCloud) {
        window.gsap.to(resultsCloud, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: "#complete-results",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      window.ScrollTrigger.create({
        trigger: "#complete-results",
        start: "top 72%",
        once: true,
        onEnter: () => {
          window.gsap.to(resultPills, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.66,
            stagger: 0.08,
            ease: "power3.out"
          });
        }
      });
    }

    const closingBurstDots = document.querySelectorAll(".eej-closing-burst span");

    if (closingBurstDots.length) {
      window.ScrollTrigger.create({
        trigger: "#closing",
        start: "top 72%",
        once: true,
        onEnter: () => {
          window.gsap.to(closingBurstDots, {
            opacity: 0.88,
            scale: 1.9,
            x: (index) => (index % 2 === 0 ? -48 - index * 3 : 42 + index * 4),
            y: (index) => (index < 3 ? -52 - index * 7 : 40 + index * 5),
            duration: 1.16,
            ease: "power2.out",
            stagger: 0.05
          });

          window.gsap.to(closingBurstDots, {
            opacity: 0,
            duration: 0.95,
            delay: 0.55,
            stagger: 0.03
          });
        }
      });
    }
  }

  function animateCount(element, endValue, decimals, suffix) {
    const countupLib = window.countUp || window.CountUp;
    const useLibrary = countupLib && typeof countupLib.CountUp === "function";

    if (useLibrary) {
      const options = {
        duration: 1.9,
        decimalPlaces: decimals,
        separator: ","
      };

      const counter = new countupLib.CountUp(element, endValue, options);

      if (!counter.error) {
        counter.start(() => {
          element.textContent = formatValue(endValue, decimals) + suffix;
        });
        return;
      }
    }

    const start = performance.now();
    const duration = 1600;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = endValue * eased;
      element.textContent = formatValue(current, decimals) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        element.textContent = formatValue(endValue, decimals) + suffix;
      }
    };

    window.requestAnimationFrame(tick);
  }

  function formatValue(value, decimals) {
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function initFallbackReveals() {
    const elements = Array.from(document.querySelectorAll(".eej-reveal"));

    if (!elements.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(26px)";
      element.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
  }

  function initFallbackCounts(counterElements) {
    counterElements.forEach((element) => {
      const endValue = Number(element.getAttribute("data-countup"));
      const decimals = Number(element.getAttribute("data-decimals") || 0);
      const suffix = element.getAttribute("data-suffix") || "";

      if (Number.isNaN(endValue)) {
        return;
      }

      animateCount(element, endValue, decimals, suffix);
    });
  }

  function initFallbackResultPills(resultPills) {
    resultPills.forEach((pill) => {
      pill.style.opacity = "1";
      pill.style.transform = "none";
    });
  }
})();
