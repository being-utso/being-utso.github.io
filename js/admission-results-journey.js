(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".arj-page");

    if (!page) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progressFill = document.getElementById("arjProgressFill");

    initTopProgress(progressFill);
    initStars(prefersReducedMotion);

    const gsapAvailable = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

    if (gsapAvailable && !prefersReducedMotion) {
      initGsap();
    } else {
      initFallbackReveals();
    }
  });

  function initTopProgress(progressFill) {
    if (!progressFill) {
      return;
    }

    const update = () => {
      const doc = document.documentElement;
      const top = doc.scrollTop || document.body.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? (top / max) * 100 : 0;
      progressFill.style.width = Math.max(0, Math.min(100, ratio)) + "%";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initStars(reducedMotion) {
    const canvas = document.getElementById("arjStars");

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
    const stars = [];
    let rafId = null;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * deviceRatio);
      canvas.height = Math.floor(height * deviceRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

      const density = reducedMotion ? 32 : width >= 1200 ? 78 : width >= 768 ? 56 : 40;
      stars.length = 0;

      for (let i = 0; i < density; i += 1) {
        stars.push(createStar(width, height, reducedMotion));
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(148, 163, 184, 0.82)";

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

      context.globalAlpha = 1;
      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("beforeunload", () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    });
  }

  function createStar(width, height, reducedMotion) {
    const baseSpeed = reducedMotion ? 0.01 : 0.04;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * baseSpeed,
      vy: (Math.random() - 0.5) * baseSpeed,
      radius: Math.random() * 1.6 + 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      minOpacity: 0.16,
      maxOpacity: 0.95,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
      fadeSpeed: Math.random() * 0.004 + 0.0015
    };
  }

  function initGsap() {
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.from("[data-hero]", {
      opacity: 0,
      y: 30,
      duration: 0.95,
      stagger: 0.12,
      ease: "power3.out"
    });

    window.gsap.to(".arj-hero-glow", {
      yPercent: 18,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    window.gsap.utils.toArray(".arj-reveal").forEach((element) => {
      window.gsap.from(element, {
        opacity: 0,
        y: 42,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          toggleActions: "play none none none"
        }
      });
    });

    window.gsap.utils.toArray(".arj-reveal-group").forEach((group) => {
      const cards = group.querySelectorAll(".arj-milestone-card");

      if (!cards.length) {
        return;
      }

      window.gsap.from(cards, {
        opacity: 0,
        y: 34,
        duration: 0.72,
        stagger: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: group,
          start: "top 82%",
          toggleActions: "play none none none"
        }
      });
    });

    const resultPills = window.gsap.utils.toArray(".arj-result-pill");

    if (resultPills.length) {
      window.gsap.set(resultPills, {
        opacity: 0,
        y: 12,
        scale: 0.96
      });

      window.ScrollTrigger.create({
        trigger: "#complete-results",
        start: "top 75%",
        once: true,
        onEnter: () => {
          window.gsap.to(resultPills, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            onComplete: () => {
              resultPills.forEach((pill, index) => {
                window.gsap.to(pill, {
                  y: -4,
                  duration: 2 + (index % 3) * 0.3,
                  delay: index * 0.02,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut"
                });
              });
            }
          });
        }
      });
    }
  }

  function initFallbackReveals() {
    const items = Array.from(document.querySelectorAll(".arj-reveal, .arj-milestone-card, .arj-result-pill"));

    if (!items.length) {
      return;
    }

    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
  }
})();
