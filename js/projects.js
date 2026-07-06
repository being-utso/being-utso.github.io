// Central project data source used by both Home and Portfolio pages.
const projects = [
  // Graphic Design
  {
    id: "poster-&-social-design",
    title: "Poster & Social Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/p2.jpg",
    imageAlt: "Campaign poster graphic design project by Shahriyer Sayem",
    description: "Creative poster compositions and campaign-oriented visual storytelling.",
    gallery: [
      {
        src: "images/p/p1.jpg",
        alt: "Poster Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/p2.jpg",
        alt: "Poster Design project sample two by Shahriyer Sayem"
      },
      {
        src: "images/p/p3.jpg",
        alt: "Poster Design project sample three by Shahriyer Sayem"
      },
      {
        src: "images/p/p4.jpg",
        alt: "Poster Design project sample four by Shahriyer Sayem"
      }
    ],
    featured: true,
    featuredOrder: 1,
    homeImage: "images/p/p2.jpg",
    homeAlt: "Poster design project preview"
  },
  {
    id: "logo-design",
    title: "Logo Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/l3.png",
    imageAlt: "Brand visual set graphic design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/l3.png",
        alt: "Logo Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/l1.png",
        alt: "Logo Design project sample two by Shahriyer Sayem"
      },
      {
        src: "images/p/l2.png",
        alt: "Logo Design project sample three by Shahriyer Sayem"
      }
    ],
    featured: true,
    featuredOrder: 5,
    homeImage: "images/p/l3.png",
    homeAlt: "Branding concept project preview"
  },
  {
    id: "cv-design",
    title: "CV Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/cv.jpg",
    imageAlt: "CV design graphic project by Shahriyer Sayem",
    description: "Structured resume and profile visual layouts with clean hierarchy and readability.",
    gallery: [
      {
        src: "images/p/cv.jpg",
        alt: "CV Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/cv1.jpg",
        alt: "CV Design project sample two by Shahriyer Sayem"
      },
    ],
    featured: false
  },
  {
    id: "t-shirt-design",
    title: "T-Shirt Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/s2.jpg",
    imageAlt: "T-Shirt design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/s2.jpg",
        alt: "T-Shirt Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/s1.jpg",
        alt: "T-Shirt Design project sample two by Shahriyer Sayem"
      },
    ],
    featured: true,
    featuredOrder: 5,
    homeImage: "images/p/s2.jpg",
    homeAlt: "Branding concept project preview"
  },
  {
    id: "banner-&-event-design",
    title: "Banner & Event Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/b2.jpg",
    imageAlt: "Banner & Event design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/b2.jpg",
        alt: "Banner & Event Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/b1.jpg",
        alt: "Banner & Event Design project sample two by Shahriyer Sayem"
      },
      {
        src: "images/p/b3.jpg",
        alt: "Banner & Event Design project sample three by Shahriyer Sayem"
      },
    ],
    featured: true,
    featuredOrder: 5,
    homeImage: "images/p/b2.jpg",
    homeAlt: "Branding concept project preview"
  },
  {
    id: "id-card-design",
    title: "ID Card Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/i1.jpg",
    imageAlt: "ID Card design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/i1.jpg",
        alt: "ID Card Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/i2.jpg",
        alt: "ID Card Design project sample two by Shahriyer Sayem"
      },
    ],
    featured: false,
    featuredOrder: 5,
    homeImage: "images/p/i1.jpg",
    homeAlt: "Branding concept project preview"
  },
  {
    id: "bactch-cover-design",
    title: "Batch Cover Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/d3.jpg",
    imageAlt: "Batch Cover design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/d3.jpg",
        alt: "Batch Cover Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/d2.jpg",
        alt: "Batch Cover Design project sample two by Shahriyer Sayem"
      },
      {
        src: "images/p/d1.jpg",
        alt: "Batch Cover Design project sample three by Shahriyer Sayem"
      }
    ],
    featured: true,
    featuredOrder: 5,
    homeImage: "images/p/d3.jpg",
    homeAlt: "Branding concept project preview"
  },
  {
    id: "hoodie-design",
    title: "Hoodie Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/h2.jpg",
    imageAlt: "Hoodie design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/h1.jpg",
        alt: "Hoodie Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/h2.jpg",
        alt: "Hoodie Design project sample two by Shahriyer Sayem"
      },
    ],
    featured: false
  },
  {
    id: "brochure-design",
    title: "Brochure Design",
    category: "graphic-design",
    categoryLabel: "Graphic Design",
    projectType: "graphic",
    image: "images/p/br2.jpg",
    imageAlt: "brochure design project by Shahriyer Sayem",
    description: "Identity mark exploration focused on balance, scalability, and brand clarity.",
    gallery: [
      {
        src: "images/p/br1.jpg",
        alt: "Brochure Design project sample one by Shahriyer Sayem"
      },
      {
        src: "images/p/br2.jpg",
        alt: "Brochure Design project sample two by Shahriyer Sayem"
      },
      {
        src: "images/p/br3.jpg",
        alt: "Brochure Design project sample three by Shahriyer Sayem"
      }
    ],
    featured: false
  },

  // Video Production
  {
    id: "farewell-documentary-45th-intake",
    title: "Farewell Documentary of 45th Intake",
    category: "video-production",
    categoryLabel: "Video Production",
    projectType: "video",
    image: "images/video-1.JPG",
    imageAlt: "Event highlight reel preview",
    description: "Fast-paced edit focused on event energy and highlight storytelling.",
    youtubeId: "Cod3Pgfxez0",
    featured: true,
    featuredOrder: 6,
    homeImage: "images/video-1.JPG",
    homeAlt: "Video production project preview"
  },
  {
    id: "from-the-diary-of-45th-intake-ccr",
    title: "From the Diary of 45th Intake | CCR",
    category: "video-production",
    categoryLabel: "Video Production",
    projectType: "video",
    image: "images/video-2.jpg",
    imageAlt: "Documentary edit preview",
    description: "Narrative documentary sequence balancing pacing and subject clarity.",
    youtubeId: "uV4lNjKfSXs",
    featured: false
  },
  {
    id: "rangpur-cadet-college-beyond-the-gates",
    title: "Rangpur Cadet College | Beyond the Gates",
    category: "video-production",
    categoryLabel: "Video Production",
    projectType: "video",
    image: "images/video-3.jpg",
    imageAlt: "Story edit reel preview",
    description: "Story-first edit sequence designed around emotional progression.",
    youtubeId: "WqzD2fr9Hsg",
    featured: true,
    featuredOrder: 2,
    homeImage: "images/video-3.jpg",
    homeAlt: "Story edit reel preview"
  },
  {
    id: "rangpur-cadet-college-college-documentary-2024",
    title: "Rangpur Cadet College | College Documentary 2024",
    category: "video-production",
    categoryLabel: "Video Production",
    projectType: "video",
    image: "images/project-film.svg",
    imageAlt: "College documentary 2024 preview",
    description: "Short film visual study with emphasis on framing rhythm.",
    youtubeId: "0FkJoe_II74",
    featured: false
  },
  {
    id: "rangpur-cadet-college-logo-intro",
    title: "Rangpur Cadet College | Logo Intro",
    category: "video-production",
    categoryLabel: "Video Production",
    projectType: "video",
    image: "images/project-film.svg",
    imageAlt: "Logo intro preview",
    description: "Mood-driven sequence using light and pacing shifts.",
    youtubeId: "UI0WUSSJ8q0",
    featured: false
  },
  {
    id: "rangpur-cadet-college-theme-song",
    title: "Rangpur Cadet College | Theme Song",
    category: "video-production",
    categoryLabel: "Video Production",
    projectType: "video",
    image: "images/project-film.svg",
    imageAlt: "Theme song preview",
    description: "Shot-by-shot narrative build with strong visual continuity.",
    youtubeId: "nTBOZbX6rlw",
    featured: false
  },

  // Photography Collections
  {
    id: "photo-street",
    title: "City",
    category: "photography",
    categoryLabel: "Photography",
    projectType: "photo-collection",
    image: "images/Edited/c3.jpg",
    imageAlt: "City photography collection cover by Shahriyer Sayem",
    subtitle: "Frames from the Urban Rhythm",
    gallery: [
      {
        src: "images/Edited/c1.jpg",
        alt: "City scene photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/c2.jpg",
        alt: "Urban passage photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/c3.jpg",
        alt: "City corner photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/c4.jpg",
        alt: "City motion photo by Shahriyer Sayem"
      }
    ],
    featured: true,
    featuredOrder: 3,
    homeImage: "images/Edited/c3.jpg",
    homeAlt: "City photography project preview"
  },
  {
    id: "photo-nature",
    title: "Nature",
    category: "photography",
    categoryLabel: "Photography",
    projectType: "photo-collection",
    image: "images/Edited/n4.jpg",
    imageAlt: "Nature photography collection cover by Shahriyer Sayem",
    subtitle: "Where the Earth Feels Alive",
    gallery: [
      {
        src: "images/Edited/n1.jpg",
        alt: "Landscape detail by Shahriyer Sayem"
      },
      {
        src: "images/Edited/n5.jpg",
        alt: "Sunset nature scene by Shahriyer Sayem"
      },
      {
        src: "images/Edited/n3.jpg",
        alt: "Natural light photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/n4.jpg",
        alt: "Green field photo by Shahriyer Sayem"
      }
    ],
    featured: false
  },
  {
    id: "photo-portrait",
    title: "Macro",
    category: "photography",
    categoryLabel: "Photography",
    projectType: "photo-collection",
    image: "images/Edited/m1.jpg",
    imageAlt: "Macro photography collection cover by Shahriyer Sayem",
    subtitle: "Beauty in the Smallest Details",
    gallery: [
      {
        src: "images/Edited/m2.jpg",
        alt: "Macro study by Shahriyer Sayem"
      },
      {
        src: "images/Edited/m3.jpg",
        alt: "Macro frame by Shahriyer Sayem"
      },
      {
        src: "images/Edited/m4.jpg",
        alt: "Expression macro by Shahriyer Sayem"
      },
      {
        src: "images/Edited/m5.jpg",
        alt: "Creative macro edit by Shahriyer Sayem"
      },
      {
        src: "images/Edited/m7.jpg",
        alt: "Macro visual treatment by Shahriyer Sayem"
      },
      {
        src: "images/Edited/m6.jpg",
        alt: "Macro perspective photo by Shahriyer Sayem"
      }
    ],
    featured: true
  },
  {
    id: "photo-travel",
    title: "Landscape",
    category: "photography",
    categoryLabel: "Photography",
    projectType: "photo-collection",
    image: "images/Edited/l1.jpg",
    imageAlt: "Landscape photography collection cover by Shahriyer Sayem",
    subtitle: "The World in Wider Frames",
    gallery: [
      {
        src: "images/Edited/l2.jpg",
        alt: "Landscape scene photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/l1.jpg",
        alt: "Landscape view by Shahriyer Sayem"
      },
      {
        src: "images/Edited/l4.jpg",
        alt: "On-route scene by Shahriyer Sayem"
      },
      {
        src: "images/Edited/l3.jpg",
        alt: "Landscape snapshot by Shahriyer Sayem"
      },
      {
        src: "images/Edited/l5.jpg",
        alt: "Destination view by Shahriyer Sayem"
      }
    ],
    featured: false
  },
  {
    id: "photo-travel",
    title: "Sky",
    category: "photography",
    categoryLabel: "Photography",
    projectType: "photo-collection",
    image: "images/Edited/s7.jpg",
    imageAlt: "Sky photography collection cover by Shahriyer Sayem",
    subtitle: "Colors Above the Ordinary",
    gallery: [
      {
        src: "images/Edited/s2.jpg",
        alt: "Sky scene photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s1.jpg",
        alt: "Sky view by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s4.jpg",
        alt: "On-route sky scene by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s3.jpg",
        alt: "Sky snapshot by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s5.jpg",
        alt: "Destination sky view by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s6.jpg",
        alt: "Sky perspective photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s7.jpg",
        alt: "Sky perspective photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/s8.jpg",
        alt: "Sky perspective photo by Shahriyer Sayem"
      }
    ],
    featured: false
  },
  {
    id: "photo-travel",
    title: "Moon",
    category: "photography",
    categoryLabel: "Photography",
    projectType: "photo-collection",
    image: "images/Edited/moon2.JPG",
    imageAlt: "Moon photography collection cover by Shahriyer Sayem",
    subtitle: "A Light Beyond Our Reach",
    gallery: [
      {
        src: "images/Edited/moon2.JPG",
        alt: "Moon scene photo by Shahriyer Sayem"
      },
      {
        src: "images/Edited/moon1.JPG",
        alt: "Moon view by Shahriyer Sayem"
      },
      {
        src: "images/Edited/moon4.JPG",
        alt: "On-route moon scene by Shahriyer Sayem"
      },
      {
        src: "images/Edited/moon3.JPG",
        alt: "Moon snapshot by Shahriyer Sayem"
      }
    ],
    featured: true,
    featuredOrder: 5,
    homeImage: "images/Edited/moon2.JPG",
    homeAlt: "Moon photography collection cover by Shahriyer Sayem"
  },

  // Web Projects
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    category: "web-design",
    categoryLabel: "Web Design",
    projectType: "web",
    image: "images/web/web-preview.png",
    imageAlt: "Portfolio website project preview by Shahriyer Sayem",
    description: "Responsive personal website with theme switching and project-driven sections.",
    status: "live",
    statusLabel: "Live",
    modalTarget: "#webProjectModalPortfolio",
    liveUrl: "https://being-utso.github.io/malihaupoma/",
    featured: true,
    featuredOrder: 4,
    homeImage: "images/web/web-preview.png",
    homeAlt: "Portfolio website preview"
  },
  {
    id: "titumir-house-website",
    title: "Titumir House Website",
    category: "web-design",
    categoryLabel: "Web Design",
    projectType: "web",
    image: "images/web/titumir-preview.jpeg",
    imageAlt: "Titumir House website project preview by Shahriyer Sayem",
    description: "A structured house website for Rangpur Cadet College, presenting history, identity, and house activities with clear navigation.",
    status: "completed",
    statusLabel: "Completed",
    modalTarget: "#webProjectModalStudio",
    liveUrl: "https://being-utso.github.io/titumir-house/",
    featured: false
  },
  {
    id: "votex",
    title: "Votex",
    category: "web-design",
    categoryLabel: "Web Design",
    projectType: "web",
    image: "images/web/votex-preview.jpeg",
    imageAlt: "Votex web app preview by Shahriyer Sayem",
    description: "A controlled voting system for design evaluation, with admin-managed access, limited vote logic, and hidden results until final publication.",
    status: "development",
    statusLabel: "In Development",
    modalTarget: "#webProjectModalVotex",
    liveUrl: "https://votex-webapp.vercel.app/",
    isFeaturedProject: true,
    featured: true,
    featuredOrder: 4,
    homeImage: "images/web/votex-preview.jpeg",
    homeAlt: "Web app project preview"
  }
];

window.projects = projects;
window.portfolioProjects = projects;
