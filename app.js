// ==========================================================================
// NextGen Engineering Works - Core Javascript Engine
// ==========================================================================

// Configuration
const TOTAL_FRAMES = 181;
const BASE_URL = './assets/frames/ezgif-frame-';
const images = [];

const smoothScroll = {
  currentFrameIndex: 1,
  targetFrameIndex: 1,
  ease: 0.08 // Linear interpolation (lerp) easing factor
};

// DOM Elements
const canvas = document.getElementById('animation-canvas');
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');
const header = document.querySelector('.header');

let ctx = null;
if (canvas) {
  ctx = canvas.getContext('2d');
}

// Helper: Get padded image file URL
const getFrameUrl = (index) => {
  return `${BASE_URL}${index.toString().padStart(3, '0')}.jpg`;
};

// ==========================================================================
// 1. Image Preloader (Only runs on homepage where canvas is present)
// ==========================================================================
function preloadImages() {
  return new Promise((resolve) => {
    let loadedCount = 0;

    const onImageLoad = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      
      if (loaderBar) loaderBar.style.width = `${percent}%`;
      if (loaderText) loaderText.textContent = `Preloading frames: ${percent}% (${loadedCount}/${TOTAL_FRAMES})`;

      if (loadedCount === TOTAL_FRAMES) {
        resolve();
      }
    };

    const onImageError = (e) => {
      console.warn(`Failed to load frame: ${e.target.src}`);
      onImageLoad(); // Skip error to prevent locking preloader
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = onImageLoad;
      img.onerror = onImageError;
      img.src = getFrameUrl(i);
      images[i] = img;
    }
  });
}

// ==========================================================================
// 2. Canvas Rendering Logic
// ==========================================================================
function drawFrame(frameIndex) {
  if (!canvas || !ctx) return;
  
  const roundedIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIndex)));
  const img = images[roundedIndex];
  
  if (!img || !img.complete) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cover aspect ratio
  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = img.naturalWidth / img.naturalHeight;

  let drawWidth, drawHeight, drawX, drawY;

  if (canvasAspect > imgAspect) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgAspect;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  } else {
    drawWidth = canvas.height * imgAspect;
    drawHeight = canvas.height;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  }

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

function resizeCanvas() {
  if (!canvas) return;
  const scale = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * scale;
  canvas.height = canvas.clientHeight * scale;
  drawFrame(smoothScroll.currentFrameIndex);
}

// ==========================================================================
// 3. Scroll Tracking for Hero Canvas Animation
// ==========================================================================
function updateScrollProgress() {
  if (!canvas) return;
  
  const scrollTrack = document.querySelector('.scroll-track');
  if (!scrollTrack) return;

  const scrollTop = window.scrollY;
  const maxScroll = scrollTrack.offsetHeight - window.innerHeight;
  const scrollPercent = maxScroll > 0 ? Math.max(0, Math.min(1, scrollTop / maxScroll)) : 0;

  // Map progress to frame indices
  smoothScroll.targetFrameIndex = 1 + scrollPercent * (TOTAL_FRAMES - 1);
}

function tick() {
  if (!canvas) return;
  
  const diff = smoothScroll.targetFrameIndex - smoothScroll.currentFrameIndex;
  if (Math.abs(diff) > 0.005) {
    smoothScroll.currentFrameIndex += diff * smoothScroll.ease;
    drawFrame(smoothScroll.currentFrameIndex);
    
    // Smoothly update the logo rotation based on the lerped frame index
    const easedPercent = (smoothScroll.currentFrameIndex - 1) / (TOTAL_FRAMES - 1);
    document.documentElement.style.setProperty('--scroll-percent', easedPercent);
  }

  requestAnimationFrame(tick);
}

function initScrollLogo() {
  const updateGlobalScroll = () => {
    // If there is no canvas, we update the scroll percent variable directly on scroll
    if (!canvas) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0;
      document.documentElement.style.setProperty('--scroll-percent', percent);
    }
  };

  window.addEventListener('scroll', updateGlobalScroll);
  updateGlobalScroll(); // Run once initially
}

// ==========================================================================
// 4. Header, Active Highlighting, Navigation and Form validations
// ==========================================================================
function initHeaderAndNav() {
  // Sticky Header Scrolled state
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load
  }

  // Mobile navigation drawer toggle
  const menuToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.textContent;
      menuToggle.textContent = icon === '☰' ? '✕' : '☰';
    });
  }

  // Active navigation menu link highlight
  const currentPath = window.location.pathname;
  let filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  // Strip query parameters
  if (filename.includes('?')) {
    filename = filename.substring(0, filename.indexOf('?'));
  }
  // Strip hash tags
  if (filename.includes('#')) {
    filename = filename.substring(0, filename.indexOf('#'));
  }

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isAboutActive = (filename === 'about.html' || filename === 'legacy.html') && href === 'about.html';
    const isHomeActive = (filename === 'index.html' || filename === '') && href === 'index.html';
    
    if (href === filename || isAboutActive || isHomeActive) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Active sidebar link highlight and scroll behavior
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  if (sidebarLinks.length > 0) {
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSection = document.querySelector(href);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      } else if (href === filename || (href === 'about.html' && filename === 'legacy.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Intersection Observer for scrollspy
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            sidebarLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else if (link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          const targetSection = document.querySelector(href);
          if (targetSection) observer.observe(targetSection);
        }
      });
    }
  }

  // Navigation button redirection: Get Quote button links to WhatsApp chat
  const ctaBtn = document.getElementById('cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      window.open('https://wa.me/919990533511', '_blank');
    });
  }
}

function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const successMessage = document.getElementById('success-message');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('full-name').value.trim();
      const company = document.getElementById('company-name').value.trim();
      const phone = document.getElementById('phone-number').value.trim();
      const email = document.getElementById('email-address').value.trim();
      const requirement = document.getElementById('requirement-type').value;
      const message = document.getElementById('detailed-message').value.trim();

      // Basic validation
      if (!name) {
        alert('Please enter your Full Name.');
        return;
      }
      if (!phone) {
        alert('Please enter your Phone Number.');
        return;
      }
      if (!email) {
        alert('Please enter your Email Address.');
        return;
      }

      // If all passed, show success message
      if (successMessage) {
        successMessage.style.display = 'block';
        form.reset();
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 8000);
      }
    });
  }
  
  // Fill inquiry requirements from URL params (e.g., from products page quick inquiry)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedProduct = urlParams.get('product');
  if (selectedProduct) {
    const requirementSelect = document.getElementById('requirement-type');
    const messageTextarea = document.getElementById('detailed-message');
    
    if (requirementSelect) {
      // Map product to catalog category
      if (selectedProduct.includes('Mixer')) {
        requirementSelect.value = 'Machinery';
      } else if (selectedProduct.includes('Mold') || selectedProduct.includes('Tile') || selectedProduct.includes('Cover')) {
        requirementSelect.value = 'Plastic Injection Moulds';
      } else {
        requirementSelect.value = 'Custom Fabrication';
      }
    }
    
    if (messageTextarea) {
      messageTextarea.value = `I would like to receive a quick quote and technical details for the "${selectedProduct}".`;
    }
  }
}

function initProductFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.getElementById('search-catalog');
  
  if (filterTabs.length > 0 && productCards.length > 0) {
    let activeCategory = 'all';
    let activeSearch = '';

    const updateFilters = () => {
      productCards.forEach(card => {
        // Exclude the custom design card from simple category filters
        if (card.classList.contains('custom-cta-card')) {
          card.style.display = 'flex';
          return;
        }
        
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';
        
        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        const matchesSearch = title.includes(activeSearch) || desc.includes(activeSearch);
        
        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    // Parse URL parameter category and trigger tab active state
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const targetTab = Array.from(filterTabs).find(tab => tab.getAttribute('data-filter') === categoryParam);
      if (targetTab) {
        filterTabs.forEach(t => t.classList.remove('active'));
        targetTab.classList.add('active');
        activeCategory = categoryParam;
        updateFilters();
      }
    }

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.getAttribute('data-filter');
        updateFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeSearch = e.target.value.toLowerCase();
        updateFilters();
      });
    }
  }
}

// ==========================================================================
// 5. Initialize Application
// ==========================================================================
async function init() {
  // Setup General Header & Navbar Features
  initHeaderAndNav();
  
  // Initialize scroll-based logo animation
  initScrollLogo();
  
  // Setup Page-Specific Logic
  initContactForm();
  initProductFilter();

  // Initialize Canvas Animation only if element is on current page
  if (canvas) {
    // 1. Preload all frames
    await preloadImages();

    // 2. Hide loader screen
    if (loader) loader.classList.add('fade-out');

    // 3. Set canvas dimensions
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 4. Draw first frame
    drawFrame(1);

    // 5. Setup scroll event listener
    window.addEventListener('scroll', updateScrollProgress);
    
    // Trigger once immediately to set initial states
    updateScrollProgress();

    // 6. Start the lerping render loop
    requestAnimationFrame(tick);
  } else {
    // No canvas on this page, immediately hide loader if it is present
    if (loader) loader.classList.add('fade-out');
  }
}

// Kickstart
document.addEventListener('DOMContentLoaded', init);
