/* ============================================================
   AURUM INTERIORS — Site Engine
   Reads config.json and renders the entire website.
   Edit config.json to change all text, links, images, social.
   ============================================================ */

(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return document.querySelectorAll(sel); };

  /* ---------- Icon library (inline SVG) ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 2.2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm6.95-3.8a1.57 1.57 0 1 0 0 3.14 1.57 1.57 0 0 0 0-3.14z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.84 9.84 0 0 1 7 2.9 9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.87-9.9 9.87zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.95L.08 24l6.3-1.65a11.9 11.9 0 0 0 5.66 1.44h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.48-8.4z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.2A31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/></svg>',
    kitchen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21v-7.5A3.5 3.5 0 0 1 9.5 10h5A3.5 3.5 0 0 1 18 13.5V21"/><path d="M4 21h16"/><path d="M9 7.5V3.6"/><path d="M12 7.5V2.6"/><path d="M15 7.5V3.6"/></svg>',
    office: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3"/><path d="M3 13h18"/><path d="M12 11v4"/></svg>',
    lamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l-1.5 8h-7L7 3z"/><path d="M12 11v4"/><path d="M9 21h6"/><path d="M9.5 15h5l-1 6h-3l-1-6z"/></svg>',
    sofa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2"/><path d="M3 11h18a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2h-1l-1-3H6l-1 3H4a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z"/><path d="M5 17v3"/><path d="M19 17v3"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-.8 2-1.7 0-.8-.5-1.2-.5-2 0-1.4 1-2 2.6-2H19a2 2 0 0 0 2-2 9 9 0 0 0-9-9.3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/><circle cx="18" cy="11" r="1"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h4l1.5 4.5-2.25 1.75a14 14 0 0 0 6.5 6.5l1.75-2.25L21 15v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5 9.5 18 20 6.5"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H7a3 3 0 0 1 3-3V7zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3a3 3 0 0 1 3-3V7z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5"/><path d="M19 5 10.5 13.5"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>'
  };

  var icon = function (name) { return ICONS[name] || ''; };

  /* ---------- Fallback config (used if config.json cannot be fetched, e.g. opening from file://) ---------- */
  var DEFAULT_CONFIG = {
    site: { name: 'Aurum Interiors', logoLine1: 'AURUM', logoLine2: 'INTERIORS' },
    nav: {
      links: [
        { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' }, { label: 'Portfolio', href: '#portfolio' },
        { label: 'Testimonials', href: '#testimonials' }, { label: 'Contact', href: '#contact' }
      ],
      ctaButton: { label: 'Enquire Now', href: '#enquiry' }
    },
    hero: {
      eyebrow: 'Interior Design Studio', titleLine1: 'We Design Spaces',
      titleLine2: 'That Tell Your Story',
      subtitle: 'Bespoke interiors crafted with soul — from concept to the final cushion.',
      primaryCta: { label: 'Book a Consultation', href: '#enquiry' },
      secondaryCta: { label: 'View Portfolio', href: '#portfolio' },
      image: 'assets/images/hero-living-room.jpg'
    },
    about: {
      eyebrow: 'About the Studio', heading: 'Where Vision Meets Craftsmanship',
      text1: 'Aurum Interiors is a full-service design studio founded on a simple belief: great interiors should feel personal.',
      text2: 'From 1BHK apartments to sprawling villas, our team handles design, execution and styling end-to-end.',
      image1: 'assets/images/about-interior-studio.jpg', image2: 'assets/images/about-elegant-bedroom.jpg',
      image1Caption: 'Our design studio',
      stats: [
        { value: '12+', label: 'Years of Experience' }, { value: '450+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Satisfaction' }, { value: '25', label: 'Design Awards' }
      ]
    },
    services: {
      eyebrow: 'What We Do', heading: 'Our Services',
      items: [
        { icon: 'home', title: 'Residential Interiors', text: 'Complete home interiors designed around your daily rituals.', image: 'assets/images/service-residential.jpg' },
        { icon: 'kitchen', title: 'Modular Kitchens', text: 'Ergonomic modular kitchens with smart storage in every inch.', image: 'assets/images/service-modular-kitchen.jpg' },
        { icon: 'office', title: 'Office & Commercial', text: 'Workspaces that boost productivity and reflect your brand.', image: 'assets/images/service-commercial-office.jpg' },
        { icon: 'lamp', title: 'Lighting Design', text: 'Layered lighting plans that transform how your space feels.', image: 'assets/images/service-lighting-design.jpg' },
        { icon: 'sofa', title: 'Custom Furniture', text: 'Bespoke pieces made to order by our in-house craftsmen.', image: 'assets/images/service-custom-furniture.jpg' },
        { icon: 'palette', title: 'Space Styling', text: 'Accessorising and art placement for that magazine look.', image: 'assets/images/service-space-styling.jpg' }
      ]
    },
    portfolio: {
      eyebrow: 'Recent Work', heading: 'Our Portfolio',
      items: [
        { title: 'Velvet Living Room', category: 'Living Room', image: 'assets/images/portfolio-living-room-1.jpg' },
        { title: 'Serene Master Suite', category: 'Bedroom', image: 'assets/images/portfolio-bedroom-1.jpg' },
        { title: 'Charcoal Modular Kitchen', category: 'Kitchen', image: 'assets/images/portfolio-kitchen-1.jpg' }
      ]
    },
    testimonials: {
      eyebrow: 'Client Love', heading: 'What Our Clients Say',
      items: [
        { name: 'Priya & Rohan Mehta', role: '3BHK Apartment, Pune', quote: 'Aurum turned our empty shell into a home we never want to leave.' }
      ]
    },
    enquiry: {
      eyebrow: 'Get in Touch', heading: 'Book Your Free Consultation',
      subheading: 'Tell us a little about your project.',
      services: ['Full Home Interior', 'Modular Kitchen', 'Living Room', 'Other'],
      budgets: ['Under ₹5 Lakh', '₹5 – ₹10 Lakh', '₹10 – ₹25 Lakh', '₹25 Lakh+'],
      recipientEmail: 'hello@auruminteriors.com', submitText: 'Send Enquiry',
      successMessage: 'Thank you! Your enquiry has been noted.',
      image: 'assets/images/enquiry-luxury-home.jpg'
    },
    contact: {
      eyebrow: 'Contact Us', heading: 'Visit Our Studio',
      address: { label: 'Studio Address', value: '2nd Floor, Design House, Baner Road, Pune, Maharashtra 411045' },
      phone: { label: 'Call Us', value: '+91 98765 43210' },
      email: { label: 'Email Us', value: 'hello@auruminteriors.com' },
      timing: { label: 'Studio Hours', value: 'Mon – Sat, 10:00 AM – 7:00 PM' },
      mapEmbedUrl: 'https://www.google.com/maps?q=Baner%20Road%2C%20Pune%2C%20Maharashtra&z=14&output=embed',
      mapLink: 'https://www.google.com/maps?q=Baner%20Road%2C%20Pune%2C%20Maharashtra'
    },
    social: [
      { name: 'Instagram', url: 'https://instagram.com/', icon: 'instagram' },
      { name: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'whatsapp' }
    ],
    footer: { about: 'A full-service interior design studio.', copyrightName: 'Aurum Interiors', backToTop: 'Back to top' }
  };

  /* ---------- Load config ---------- */
  function loadConfig(cb) {
    fetch('config.json', { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(cb)
      .catch(function () { cb(DEFAULT_CONFIG); });
  }

  /* ---------- Helpers ---------- */
  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function setText(id, text) {
    var node = document.getElementById(id);
    if (node) node.textContent = text;
  }

  function setHtml(id, html) {
    var node = document.getElementById(id);
    if (node) node.innerHTML = html;
  }

  function setBg(id, url) {
    var node = document.getElementById(id);
    if (node) node.style.backgroundImage = "url('" + url + "')";
  }

  /* Images always fall back to a local placeholder so nothing ever shows blank */
  var FALLBACK_IMG = 'assets/images/fallback-placeholder.svg';

  function imgTag(src, alt, cls) {
    return '<img class="' + (cls || '') + '" src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt || '') + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + FALLBACK_IMG + '\'">';
  }

  var revealObserver = null;
  function observeReveals(scope) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('visible'); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    [].slice.call(scope.querySelectorAll('.reveal')).forEach(function (node) {
      if (!node.classList.contains('visible')) revealObserver.observe(node);
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var CONFIG = null;

  /* ============================================================
     RENDER FUNCTIONS
     ============================================================ */
  function renderNav() {
    var s = CONFIG.site, n = CONFIG.nav;
    setHtml('navLogoText', '<strong>' + escapeHtml(s.logoLine1) + '</strong><small>' + escapeHtml(s.logoLine2) + '</small>');
    var links = n.links.map(function (l) {
      return '<li><a href="' + escapeHtml(l.href) + '">' + escapeHtml(l.label) + '</a></li>';
    }).join('');
    var mobileCta = '<li class="mobile-cta"><a href="' + escapeHtml(n.ctaButton.href) + '" class="btn btn-accent">' + escapeHtml(n.ctaButton.label) + '</a></li>';
    setHtml('navLinks', links + mobileCta);
    setText('navCta', n.ctaButton.label);
    $('#navCta').href = n.ctaButton.href;
    document.title = s.name + ' | ' + s.tagline;
  }

  function renderHero() {
    var h = CONFIG.hero;
    setBg('heroImage', h.image);
    setText('heroEyebrow', h.eyebrow);
    setHtml('heroTitle', '<span>' + escapeHtml(h.titleLine1) + '</span><br><em>' + escapeHtml(h.titleLine2) + '</em>');
    setText('heroSubtitle', h.subtitle);
    setHtml('heroCtas',
      '<a href="' + escapeHtml(h.primaryCta.href) + '" class="btn btn-accent">' + escapeHtml(h.primaryCta.label) + '</a>' +
      '<a href="' + escapeHtml(h.secondaryCta.href) + '" class="btn btn-ghost">' + escapeHtml(h.secondaryCta.label) + '</a>'
    );
  }

  function renderAbout() {
    var a = CONFIG.about;
    setText('aboutEyebrow', a.eyebrow);
    setText('aboutHeading', a.heading);
    setText('aboutText1', a.text1);
    setText('aboutText2', a.text2);

    var img1 = imgTag(a.image1, a.image1Caption, 'img');
    var img2 = imgTag(a.image2, 'Studio work in progress', 'img');
    setHtml('aboutImage1', img1);
    setHtml('aboutImage2', img2);
    setHtml('aboutBadge', escapeHtml(a.image1Caption));

    setHtml('aboutFeatures', a.stats.map(function (st) {
      var short = st.label.split(' of ')[0];
      return '<div class="feature"><div class="feature-icon">' + icon('check') + '</div><div><h4>' +
        escapeHtml(st.value) + ' ' + escapeHtml(short) + '</h4><p>' + escapeHtml(st.label) + '</p></div></div>';
    }).join(''));

    setHtml('statsRow', a.stats.map(function (st) {
      return '<div class="stat"><div class="stat-value">' + escapeHtml(st.value) + '</div><div class="stat-label">' + escapeHtml(st.label) + '</div></div>';
    }).join(''));
  }

  function renderServices() {
    var sv = CONFIG.services;
    setText('servicesEyebrow', sv.eyebrow);
    setText('servicesHeading', sv.heading);
    setText('servicesSubheading', sv.subheading || '');
    setHtml('servicesGrid', sv.items.map(function (s, i) {
      return '<article class="service-card reveal reveal-delay-' + (i % 3) + '">' +
        '<div class="service-media">' + imgTag(s.image, s.title) +
        '<span class="service-icon">' + icon(s.icon) + '</span></div>' +
        '<div class="service-body"><h3>' + escapeHtml(s.title) + '</h3><p>' + escapeHtml(s.text) + '</p></div>' +
        '</article>';
    }).join(''));
  }

  var portfolioItems = [];
  var currentFilter = 'All';

  function renderPortfolio() {
    var p = CONFIG.portfolio;
    setText('portfolioEyebrow', p.eyebrow);
    setText('portfolioHeading', p.heading);
    setText('portfolioSubheading', p.subheading || '');
    portfolioItems = p.items;

    var cats = ['All'];
    p.items.forEach(function (it) {
      if (cats.indexOf(it.category) === -1) cats.push(it.category);
    });
    setHtml('filterBar', cats.map(function (c) {
      return '<button class="filter-btn' + (c === 'All' ? ' active' : '') + '" data-filter="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
    }).join(''));

    $$('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        drawPortfolio();
      });
    });
    drawPortfolio();
  }

  function drawPortfolio() {
    var filtered = currentFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter(function (it) { return it.category === currentFilter; });
    setHtml('portfolioGrid', filtered.map(function (it) {
      return '<figure class="work-card reveal" data-category="' + escapeHtml(it.category) + '">' +
        imgTag(it.image, it.title) +
        '<figcaption class="work-overlay"><div class="work-meta">' +
        '<span class="work-cat">' + escapeHtml(it.category) + '</span><h3>' + escapeHtml(it.title) + '</h3>' +
        '</div></figcaption></figure>';
    }).join(''));
    [].slice.call($('#portfolioGrid').querySelectorAll('.reveal'))
      .forEach(function (n) { n.classList.add('visible'); });
  }

  var sliderIndex = 0;
  var sliderCount = 0;

  function renderTestimonials() {
    var t = CONFIG.testimonials;
    setText('testimonialsEyebrow', t.eyebrow);
    setText('testimonialsHeading', t.heading);
    sliderCount = t.items.length;

    setHtml('testimonialTrack', '<div class="slider-slide-row">' + t.items.map(function (q) {
      var initials = q.name.split(' ').filter(function (w) { return w.length; }).slice(0, 2)
        .map(function (w) { return w[0]; }).join('').toUpperCase();
      return '<div class="t-slide">' +
        '<div class="t-quote-mark">' + icon('quote') + '</div>' +
        '<p class="t-quote">&ldquo;' + escapeHtml(q.quote) + '&rdquo;</p>' +
        '<div class="t-author"><span class="t-avatar">' + escapeHtml(initials) + '</span>' +
        '<div class="t-author-info"><strong>' + escapeHtml(q.name) + '</strong><span>' + escapeHtml(q.role) + '</span></div></div>' +
        '</div>';
    }).join('') + '</div>');

    var dots = [];
    for (var i = 0; i < sliderCount; i++) dots.push('<button class="slider-dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="Go to testimonial ' + (i + 1) + '"></button>');
    setHtml('sliderDots', dots.join(''));

    $('#sliderPrev').addEventListener('click', function () { sliderGo(sliderIndex - 1); });
    $('#sliderNext').addEventListener('click', function () { sliderGo(sliderIndex + 1); });
    $$('.slider-dot').forEach(function (d) {
      d.addEventListener('click', function () { sliderGo(parseInt(d.dataset.i, 10)); });
    });
    sliderGo(0);
  }

  function sliderGo(i) {
    sliderIndex = (i + sliderCount) % sliderCount;
    var row = $('.slider-slide-row');
    if (row) row.style.transform = 'translateX(-' + sliderIndex * 100 + '%)';
    $$('.slider-dot').forEach(function (d, di) { d.classList.toggle('active', di === sliderIndex); });
  }

  function renderEnquiry() {
    var e = CONFIG.enquiry;
    setText('enquiryEyebrow', e.eyebrow);
    setText('enquiryHeading', e.heading);
    setText('enquirySubheading', e.subheading || '');
    setText('enquirySubmit', e.submitText);

    setHtml('enquiryMedia',
      imgTag(e.image, CONFIG.site.name + ' project', 'img') +
      '<div class="enquiry-tag"><strong>' + escapeHtml(CONFIG.site.name) + '</strong><span>Transform your space with us.</span></div>'
    );

    setHtml('enqService', e.services.map(function (s) { return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + '</option>'; }).join(''));
    setHtml('enqBudget', '<option value="">Select budget</option>' + e.budgets.map(function (b) { return '<option value="' + escapeHtml(b) + '">' + escapeHtml(b) + '</option>'; }).join(''));

    $('#enquiryForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = true;
      ['enqName', 'enqPhone', 'enqService'].forEach(function (id) {
        var field = document.getElementById(id);
        var valid = field.value.trim().length > 0;
        field.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        showToast('Please fill the required fields.');
        return;
      }
      var subject = encodeURIComponent('New Enquiry from ' + $('#enqName').value.trim());
      var body = encodeURIComponent(
        'Name: ' + $('#enqName').value + '\n' +
        'Phone: ' + $('#enqPhone').value + '\n' +
        'Email: ' + $('#enqEmail').value + '\n' +
        'Service: ' + $('#enqService').value + '\n' +
        'Budget: ' + $('#enqBudget').value + '\n' +
        'Location: ' + $('#enqLocation').value + '\n\n' +
        'Project Details:\n' + $('#enqMessage').value
      );
      window.location.href = 'mailto:' + CONFIG.enquiry.recipientEmail + '?subject=' + subject + '&body=' + body;
      $('#enquiryForm').reset();
      showToast(CONFIG.enquiry.successMessage);
    });
  }

  function renderContact() {
    var c = CONFIG.contact;
    setText('contactEyebrow', c.eyebrow);
    setText('contactHeading', c.heading);
    setText('contactSubheading', c.subheading || '');

    var cards =
      '<a class="contact-card" href="' + escapeHtml(c.mapLink) + '" target="_blank" rel="noopener">' +
      '<span class="contact-card-icon">' + icon('pin') + '</span><div><h4>' + escapeHtml(c.address.label) + '</h4><p>' + escapeHtml(c.address.value) + '</p></div></a>' +
      '<a class="contact-card" href="tel:' + escapeHtml(String(c.phone.value).replace(/[^+\d]/g, '')) + '">' +
      '<span class="contact-card-icon">' + icon('phone') + '</span><div><h4>' + escapeHtml(c.phone.label) + '</h4><p>' + escapeHtml(c.phone.value) + '</p></div></a>' +
      '<a class="contact-card" href="mailto:' + escapeHtml(c.email.value) + '">' +
      '<span class="contact-card-icon">' + icon('mail') + '</span><div><h4>' + escapeHtml(c.email.label) + '</h4><p>' + escapeHtml(c.email.value) + '</p></div></a>' +
      '<div class="contact-card"><span class="contact-card-icon">' + icon('clock') + '</span><div><h4>' + escapeHtml(c.timing.label) + '</h4><p>' + escapeHtml(c.timing.value) + '</p></div></div>';

    setHtml('contactCards', cards);
    $('#mapFrame').src = c.mapEmbedUrl;
    var dirBtn = $('#mapDirections');
    dirBtn.href = c.mapLink;
    dirBtn.innerHTML = 'Get Directions ' + icon('external');
  }

  function renderFooter() {
    var f = CONFIG.footer, s = CONFIG.site, c = CONFIG.contact;
    setHtml('footerLogoText', '<strong>' + escapeHtml(s.logoLine1) + '</strong><small>' + escapeHtml(s.logoLine2) + '</small>');
    setText('footerAbout', f.about);

    setHtml('socialRow', CONFIG.social.map(function (so) {
      return '<a class="social-btn" href="' + escapeHtml(so.url) + '" target="_blank" rel="noopener" aria-label="' + escapeHtml(so.name) + '">' + icon(so.icon) + '</a>';
    }).join(''));

    setHtml('footerQuickLinks', CONFIG.nav.links.map(function (l) {
      return '<li><a href="' + escapeHtml(l.href) + '">' + escapeHtml(l.label) + '</a></li>';
    }).join(''));

    setHtml('footerContact',
      '<li>' + icon('pin') + '<span>' + escapeHtml(c.address.value) + '</span></li>' +
      '<li>' + icon('phone') + '<a href="tel:' + escapeHtml(String(c.phone.value).replace(/[^+\d]/g, '')) + '">' + escapeHtml(c.phone.value) + '</a></li>' +
      '<li>' + icon('mail') + '<a href="mailto:' + escapeHtml(c.email.value) + '">' + escapeHtml(c.email.value) + '</a></li>' +
      '<li>' + icon('clock') + '<span>' + escapeHtml(c.timing.value) + '</span></li>'
    );

    setHtml('footerCopyright', '&copy; ' + new Date().getFullYear() + ' ' + escapeHtml(f.copyrightName) + '. All rights reserved.');
    setText('backToTop', f.backToTop);
  }

  /* ============================================================
     INTERACTIONS
     ============================================================ */
  var toastTimer = null;
  function showToast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 4200);
  }

  function initInteractions() {
    var header = $('#siteHeader');
    var navAnchors = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));

    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 40);

      var pos = window.scrollY + 140;
      var current = null;
      navAnchors.forEach(function (a) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target && target.offsetTop <= pos) current = a.getAttribute('href');
      });
      navAnchors.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var toggle = $('#navToggle');
    var links = $('#navLinks');
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    var backTop = $('#backToTop');
    backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    observeReveals(document);
  }

  /* ---------- Init ---------- */
  loadConfig(function (cfg) {
    CONFIG = cfg;
    renderNav();
    renderHero();
    renderAbout();
    renderServices();
    renderPortfolio();
    renderTestimonials();
    renderEnquiry();
    renderContact();
    renderFooter();
    initInteractions();
  });
})();
