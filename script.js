document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const projectData = {
    'nova-pay': {
      title: 'NovaPay Dashboard',
      category: 'Fintech',
      year: '2025',
      summary: 'A modern banking platform redesign focused on trust, speed, and clarity.',
      details: [
        'Reframed the banking flow to make critical actions easier to find and understand in seconds.',
        'Introduced a cleaner information hierarchy that guided users from overview to transactions without overwhelming them.',
        'Improved dashboard readability and confidence through better contrast, spacing, and data prioritization.'
      ],
      tags: ['UX Strategy', 'Dashboard UX', 'Design System', 'Fintech'],
      visualClass: 'image-one'
    },
    'peak-studio': {
      title: 'Peak Studio',
      category: 'Startup',
      year: '2024',
      summary: 'Creative brand and website for a boutique studio launching its new offer.',
      details: [
        'Developed a visually distinctive brand system that balanced creativity with strong conversion intent.',
        'Structured a flexible landing page that explained services clearly and encouraged direct client inquiries.',
        'Built a premium online presence designed to position the studio as a trusted creative partner.'
      ],
      tags: ['Brand Design', 'Web Design', 'Creative Direction', 'Launch'],
      visualClass: 'image-two'
    },
    'orbit-goods': {
      title: 'Orbit Goods',
      category: 'E-commerce',
      year: '2024',
      summary: 'Conversion-focused storefront with a premium look and streamlined UX.',
      details: [
        'Simplified the shopping journey by reducing friction in product discovery and purchase flow.',
        'Designed rich product storytelling and a premium visual system that supported higher trust and engagement.',
        'Created a stronger mobile experience to improve conversion across key product and checkout touchpoints.'
      ],
      tags: ['E-commerce', 'UX Design', 'Conversion', 'Frontend'],
      visualClass: 'image-three'
    }
  };

  const certificateFiles = [
    'IMG-20260920-WA0051.jpg',
    'IMG-20260920-WA0056.jpg',
    'IMG-20260920-WA0057.jpg',
    'IMG-20260920-WA0060.jpg',
    'IMG-20260920-WA0061.jpg',
    'IMG-20260920-WA0062.jpg',
    'IMG-20260920-WA0063.jpg',
    'IMG-20260920-WA0064.jpg',
    'IMG-20260920-WA0065.jpg',
    'IMG-20260920-WA0066.jpg',
    'IMG-20260920-WA0067.jpg',
    'IMG-20260920-WA0068(1).jpg',
    'IMG-20260920-WA0069.jpg',
    'IMG-20260920-WA0070(1).jpg',
    'IMG-20260920-WA0071(1).jpg',
    'IMG-20260920-WA0072(1).jpg',
    'IMG-20260920-WA0073(1).jpg',
    'IMG-20261008-WA0009.jpg',
    'IMG-20261013-WA0036.jpg',
    'IMG-20261013-WA0037.jpg'
  ];

  const certificateTrack = document.querySelector('.certificate-track');
  const certificateDotsEl = document.querySelector('.certificate-dots');
  const lightbox = document.getElementById('certificateLightbox');
  const lightboxImage = document.getElementById('certificateLightboxImage');
  const lightboxCaption = document.getElementById('certificateLightboxCaption');

  if (certificateTrack && certificateFiles.length) {
    const titleFromFile = (file) => file
      .replace(/\.(jpg|jpeg)$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());

    certificateTrack.innerHTML = certificateFiles
      .map((file) => {
        const title = titleFromFile(file);
        return `
          <figure class="certificate-item" data-title="${title}" data-image="assets/${file}">
            <img src="assets/${file}" alt="${title}" loading="lazy" />
            <figcaption>${title}</figcaption>
          </figure>
        `;
      })
      .join('');

    const slides = [...certificateTrack.querySelectorAll('.certificate-item')];
    let activeIndex = 0;
    let autoSlideId = null;
    const loadVisibleCertificates = () => {
      const trackBounds = certificateTrack.getBoundingClientRect();
      slides.forEach((slide) => {
        const slideBounds = slide.getBoundingClientRect();
        if (slideBounds.right > trackBounds.left && slideBounds.left < trackBounds.right) {
          const image = slide.querySelector('img');
          if (image) image.loading = 'eager';
        }
      });
    };

    const goToSlide = (index) => {
      const safeIndex = (index + slides.length) % slides.length;
      activeIndex = safeIndex;
      [0, 1, 2].forEach((offset) => {
        const image = slides[(safeIndex + offset) % slides.length].querySelector('img');
        if (image) image.loading = 'eager';
      });

      const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
      const gap = 16;
      certificateTrack.scrollTo({ left: safeIndex * (slideWidth + gap), behavior: 'smooth' });

      const dots = [...certificateDotsEl.querySelectorAll('.certificate-dot')];
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === safeIndex);
      });
    };

    certificateTrack.addEventListener('scroll', loadVisibleCertificates, { passive: true });
    loadVisibleCertificates();

    const startAutoSlide = () => {
      if (autoSlideId) window.clearInterval(autoSlideId);
      autoSlideId = window.setInterval(() => {
        goToSlide(activeIndex + 1);
      }, 3200);
    };

    if (certificateDotsEl) {
      certificateDotsEl.innerHTML = slides
        .map((_, index) => `<button type="button" class="certificate-dot ${index === 0 ? 'is-active' : ''}" aria-label="Go to certificate ${index + 1}" data-index="${index}"></button>`)
        .join('');

      const dots = [...certificateDotsEl.querySelectorAll('.certificate-dot')];
      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          goToSlide(Number(dot.dataset.index));
          startAutoSlide();
        });
      });
    }

    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        if (!lightbox || !lightboxImage || !lightboxCaption) return;
        lightboxImage.src = slide.dataset.image;
        lightboxImage.alt = slide.dataset.title;
        lightboxCaption.textContent = slide.dataset.title;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      });
    });

    const certificatePrev = document.querySelector('.certificate-nav.prev');
    const certificateNext = document.querySelector('.certificate-nav.next');

    certificatePrev?.addEventListener('click', () => {
      goToSlide(activeIndex - 1);
      startAutoSlide();
    });

    certificateNext?.addEventListener('click', () => {
      goToSlide(activeIndex + 1);
      startAutoSlide();
    });

    lightbox?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }
    });

    const lightboxClose = document.querySelector('.certificate-lightbox-close');
    lightboxClose?.addEventListener('click', () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }
    });

    goToSlide(0);
    startAutoSlide();
  }

  const modal = document.getElementById('projectModal');
  const categoryEl = document.getElementById('projectModalCategory');
  const yearElModal = document.getElementById('projectModalYear');
  const titleEl = document.getElementById('projectModalTitle');
  const summaryEl = document.getElementById('projectModalSummary');
  const detailsEl = document.getElementById('projectModalDetails');
  const tagsEl = document.getElementById('projectModalTags');
  const visualEl = document.getElementById('projectModalVisual');
  const closeBtn = document.querySelector('.project-modal-close');

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  const openProjectModal = (projectKey) => {
    const project = projectData[projectKey];
    if (!project || !modal) return;

    visualEl.className = `project-modal-visual ${project.visualClass}`;
    titleEl.textContent = project.title;
    categoryEl.textContent = project.category;
    yearElModal.textContent = project.year;
    summaryEl.textContent = project.summary;

    detailsEl.innerHTML = '';
    project.details.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      detailsEl.appendChild(li);
    });

    tagsEl.innerHTML = '';
    project.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      tagsEl.appendChild(span);
    });

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeProjectModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card.dataset.project);
      }
    });
  });

  closeBtn?.addEventListener('click', closeProjectModal);

  modal?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeProjectModal();
    }
  });
});
