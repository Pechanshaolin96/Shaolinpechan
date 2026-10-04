/**
 * assets/js/main.js - Interacciones globales de Shaolin Pechan
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMobileAccordions();
  initHeaderResponsiveNav();
  initFormHandlers();
  initScheduleTabs();
  initHeroSlider();
  initInstagramFeed();
  initMasterCarousels();
  initMasterLineageTree();
  initWhatsAppModal();
  initGlobalLightbox();
});

// Acordeones desplegables para el menú móvil
function initMobileAccordions() {
  const headers = document.querySelectorAll('.mobile-accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('open');

      // Cerrar otros si se desea o permitir toggle
      headers.forEach(h => {
        if (h !== header) {
          h.nextElementSibling?.classList.remove('open');
          const otherIcon = h.querySelector('.accordion-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        content.classList.remove('open');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}


// Menú móvil desplegable
function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!openBtn || !drawer) return;

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    if (backdrop) {
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    if (backdrop) {
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
    }
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Manejo interactivo de formularios de contacto y reservas
function initFormHandlers() {
  const forms = document.querySelectorAll('form[data-booking-form]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const confirmationCard = form.querySelector('.confirmation-card') || document.getElementById('confirmation-card');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <span class="inline-block animate-spin mr-2">⏳</span> Procesando...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          if (confirmationCard) {
            confirmationCard.classList.remove('hidden');
            confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            alert('¡Gracias por tu solicitud! Nos comunicaremos contigo en menos de 24 horas laborables para coordinar tu clase de prueba.');
          }
        }, 800);
      }
    });
  });
}

// Pestañas interactivas de horarios (en caso de existir selectores)
function initScheduleTabs() {
  const tabButtons = document.querySelectorAll('[data-schedule-tab]');
  const tabPanels = document.querySelectorAll('[data-schedule-panel]');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-schedule-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white');
        b.classList.add('bg-surface-container-low', 'text-secondary');
      });

      btn.classList.add('active', 'bg-primary', 'text-white');
      btn.classList.remove('bg-surface-container-low', 'text-secondary');

      tabPanels.forEach(panel => {
        if (panel.getAttribute('data-schedule-panel') === target) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

// Slider Hero de fondo automático cada 4.5 segundos
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  const dotsContainer = document.getElementById('hero-carousel-dots');
  let currentIndex = 0;
  let timer = null;
  const INTERVAL_TIME = 4500;

  // Generar puntos de paginación si existe el contenedor de dots
  if (dotsContainer && dotsContainer.children.length === 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.ariaLabel = `Ir a la imagen ${i + 1}`;
      dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === 0 ? 'bg-amber-400 w-6' : 'bg-white/40 hover:bg-white/70'}`;
      dot.addEventListener('click', () => {
        updateSlide(i);
        startTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'pointer-events-none');
        slide.classList.add('opacity-100', 'z-10');
      } else {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.className = 'w-6 h-2.5 rounded-full bg-amber-400 transition-all duration-300 cursor-pointer';
        } else {
          dot.className = 'w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer';
        }
      });
    }

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlide(nextIndex);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, INTERVAL_TIME);
  }

  updateSlide(0);
  startTimer();
}

// Ocultar la barra hacia arriba al hacer scroll hacia abajo y desplegarla al subir o volver arriba
function initHeaderResponsiveNav() {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.classList.remove('nav-compact-mode');

  let lastScrollY = window.scrollY || window.pageYOffset;
  let ticking = false;
  const hideThreshold = 80;

  function handleScroll() {
    const currentScrollY = window.scrollY || window.pageYOffset;

    // Si estamos arriba de todo (<= 15px), siempre mostrar la barra
    if (currentScrollY <= 15) {
      header.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    const diff = currentScrollY - lastScrollY;

    // Si el usuario desplaza hacia abajo y superó el umbral, ocultar la barra hacia arriba
    if (diff > 5 && currentScrollY > hideThreshold) {
      // No ocultar si el menú desplegable móvil está abierto
      const drawer = document.getElementById('mobile-drawer');
      const isDrawerOpen = drawer && drawer.classList.contains('translate-x-0');
      if (!isDrawerOpen) {
        header.classList.add('header-hidden');
      }
    } else if (diff < -5) {
      // Si el usuario desplaza hacia arriba (rueda del mouse o swipe), volver a mostrar la barra
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
}

// Widget de Feed de Instagram @shaolin_pechan
function initInstagramFeed() {
  const loadMoreBtn = document.getElementById('ig-load-more-btn');
  const extraPosts = document.querySelectorAll('.ig-extra-post');
  if (!loadMoreBtn || extraPosts.length === 0) return;

  loadMoreBtn.addEventListener('click', () => {
    const isLoaded = loadMoreBtn.getAttribute('data-loaded') === 'true';
    if (isLoaded) {
      window.open('https://www.instagram.com/shaolin_pechan/', '_blank');
      return;
    }

    const btnText = loadMoreBtn.querySelector('.ig-btn-text');
    const spinner = loadMoreBtn.querySelector('.ig-spinner');

    if (btnText && spinner) {
      btnText.textContent = 'Cargando...';
      spinner.classList.remove('hidden');
    }

    setTimeout(() => {
      extraPosts.forEach(post => {
        post.classList.remove('hidden');
        post.classList.add('animate-fade-in');
      });

      if (btnText && spinner) {
        btnText.textContent = 'Ver más en Instagram';
        spinner.classList.add('hidden');
      }
      loadMoreBtn.setAttribute('data-loaded', 'true');
    }, 350);
  });
}

// Carrusel de Maestros e Instructores (Shaolin y Tai Chi)
function initMasterCarousels() {
  const containers = document.querySelectorAll('[data-carousel="masters"]');
  if (containers.length === 0) return;

  containers.forEach(container => {
    const track = container.querySelector('.carousel-track-masters');
    if (!track) return;
    const slides = container.querySelectorAll('.carousel-slide-master');
    const prevBtn = container.querySelector('.carousel-prev-btn');
    const nextBtn = container.querySelector('.carousel-next-btn');
    const counter = container.querySelector('.carousel-counter-text');
    const dotsContainer = container.querySelector('.carousel-dots-container');

    if (slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Generar dots interactivos
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `carousel-dot h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
          idx === 0 ? 'active bg-primary w-8' : 'bg-stone-300 hover:bg-stone-400 w-2.5'
        }`;
        dot.setAttribute('aria-label', `Ver maestro ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateState(index) {
      currentIndex = index;
      if (counter) {
        counter.textContent = `Maestro ${index + 1} de ${totalSlides}`;
      }
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          if (idx === index) {
            dot.classList.add('active', 'bg-primary', 'w-8');
            dot.classList.remove('bg-stone-300', 'hover:bg-stone-400', 'w-2.5');
          } else {
            dot.classList.remove('active', 'bg-primary', 'w-8');
            dot.classList.add('bg-stone-300', 'hover:bg-stone-400', 'w-2.5');
          }
        });
      }
    }

    function goToSlide(index) {
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;
      const targetSlide = slides[index];
      if (targetSlide) {
        track.scrollTo({
          left: targetSlide.offsetLeft,
          behavior: 'smooth'
        });
      }
      updateState(index);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
      });
    }

    // Sincronizar al hacer scroll manual o touch swipe
    let scrollTimeout = null;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let minDiff = Infinity;
        let closestIndex = currentIndex;
        slides.forEach((slide, idx) => {
          const diff = Math.abs(slide.offsetLeft - track.scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });
        if (closestIndex !== currentIndex) {
          updateState(closestIndex);
        }
      }, 50);
    }, { passive: true });

    // Navegación con teclado
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
      } else if (e.key === 'ArrowRight') {
        goToSlide((currentIndex + 1) % totalSlides);
      }
    });

    updateState(0);
  });
}

// Árbol Genealógico y Línea de Tiempo Interactiva de Maestros Shaolin y Taiji
function initMasterLineageTree() {
  const containers = document.querySelectorAll('#arbol-maestros, [data-tree="masters"]');
  if (containers.length === 0) return;

  containers.forEach(container => {
    const nodes = container.querySelectorAll('.tree-node-master');
    const panels = container.querySelectorAll('.master-profile-panel');
    const counterDisplay = container.querySelector('#lineage-counter');
    const nameLabel = container.querySelector('#lineage-name-label');
    const prevBtn = container.querySelector('#lineage-prev-btn');
    const nextBtn = container.querySelector('#lineage-next-btn');

    if (panels.length === 0) return;

    let currentIdx = 0;
    const total = panels.length;

    function setActiveMaster(index) {
      if (index < 0) index = 0;
      if (index >= total) index = total - 1;
      currentIdx = index;

      // Actualizar todos los nodos interactivos (timeline + árbol)
      nodes.forEach(node => {
        const idx = parseInt(node.getAttribute('data-master-idx'), 10);
        if (idx === index) {
          node.classList.add('active');
          node.setAttribute('aria-selected', 'true');
          if (node.closest('.lineage-timeline-track')) {
            node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        } else {
          node.classList.remove('active');
          node.setAttribute('aria-selected', 'false');
        }
      });

      // Actualizar paneles de perfil con transición limpia
      panels.forEach(panel => {
        const pIdx = parseInt(panel.getAttribute('data-panel-idx'), 10);
        if (pIdx === index) {
          panel.classList.add('active');
          panel.style.display = 'block';
          setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
          }, 10);
        } else {
          panel.classList.remove('active');
          panel.style.opacity = '0';
          panel.style.transform = 'translateY(6px)';
          panel.style.display = 'none';
        }
      });

      // Actualizar contador y etiqueta
      if (counterDisplay) {
        const formattedIdx = (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`;
        const formattedTotal = total < 10 ? `0${total}` : `${total}`;
        counterDisplay.textContent = `${formattedIdx} / ${formattedTotal}`;
      }
      if (nameLabel) {
        const activeNode = container.querySelector(`.tree-node-master[data-master-idx="${index}"]`);
        const nodeName = activeNode ? (activeNode.getAttribute('data-master-name') || activeNode.querySelector('.font-bold')?.textContent.replace(/[\u4e00-\u9fff]/g, '').strip?.() || '') : '';
        const cleanName = activeNode ? (activeNode.getAttribute('data-master-name') || activeNode.querySelector('.font-bold')?.innerText.split('\n')[0]) : '';
        nameLabel.textContent = cleanName || '';
      }
    }

    // Evento Clic para activar el maestro
    nodes.forEach(node => {
      const idx = parseInt(node.getAttribute('data-master-idx'), 10);
      node.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveMaster(idx);
      });
    });

    // Botones Anterior y Siguiente
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const newIdx = (currentIdx - 1 + total) % total;
        setActiveMaster(newIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const newIdx = (currentIdx + 1) % total;
        setActiveMaster(newIdx);
      });
    }

    // Navegación con teclado (Flechas izquierda y derecha)
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIdx = (currentIdx - 1 + total) % total;
        setActiveMaster(newIdx);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newIdx = (currentIdx + 1) % total;
        setActiveMaster(newIdx);
      }
    });

    setActiveMaster(0);
  });
}

// Modal interactivo para el botón flotante de WhatsApp
function initWhatsAppModal() {
  let modal = document.getElementById('wa-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wa-modal';
    modal.className = 'wa-modal-overlay';
    modal.innerHTML = `
      <div class="wa-modal-card">
        <div class="wa-modal-header">
          <div class="wa-modal-title-box">
            <svg class="wa-header-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2z"/>
            </svg>
            <div>
              <h4 class="wa-modal-title">Contacto por WhatsApp</h4>
              <p class="wa-modal-subtitle">Jiaolian Pablo Encinas · Shaolin Pechan</p>
            </div>
          </div>
          <button type="button" class="wa-modal-close" id="wa-modal-close" aria-label="Cerrar">&times;</button>
        </div>
        <p class="wa-modal-prompt">Seleccioná el motivo de tu consulta:</p>
        <div class="wa-modal-options">
          <button type="button" class="wa-option-btn" data-msg="Hola Pablo, quisiera consultar por las clases de Shaolin Kung Fu.">
            <span class="wa-option-icon">🥋</span>
            <span class="wa-option-text">Shaolin Kung Fu</span>
          </button>
          <button type="button" class="wa-option-btn" data-msg="Hola Pablo, quisiera información sobre Chen Taijiquan / Tai Chi.">
            <span class="wa-option-icon">☯️</span>
            <span class="wa-option-text">Chen Taijiquan / Tai Chi</span>
          </button>
          <button type="button" class="wa-option-btn" data-msg="Hola Pablo, quisiera consultar por las clases de Qi Gong.">
            <span class="wa-option-icon">🫁</span>
            <span class="wa-option-text">Qi Gong / Chi Kung</span>
          </button>
          <button type="button" class="wa-option-btn" data-msg="Hola Pablo, quisiera información sobre Medicina Tradicional China y Tuina.">
            <span class="wa-option-icon">🌿</span>
            <span class="wa-option-text">Medicina Tradicional China / Tuina</span>
          </button>
          <button type="button" class="wa-option-btn" data-msg="Hola Pablo, quisiera consultar por la Ceremonia de Té y Arte Chino.">
            <span class="wa-option-icon">🍵</span>
            <span class="wa-option-text">Cultura del Té / Caligrafía</span>
          </button>
          <button type="button" class="wa-option-btn" data-msg="Hola Pablo, quisiera hacer una consulta general sobre los horarios y sedes.">
            <span class="wa-option-icon">💬</span>
            <span class="wa-option-text">Consulta General</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const waButtons = document.querySelectorAll('.whatsapp-float');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.toggle('active');
    });
  });

  const closeBtn = document.getElementById('wa-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  const optionBtns = modal.querySelectorAll('.wa-option-btn');
  optionBtns.forEach(opt => {
    opt.addEventListener('click', () => {
      const msg = opt.getAttribute('data-msg');
      const url = `https://wa.me/541150629554?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      modal.classList.remove('active');
    });
  });
}

// Visualizador de Imágenes Global (Lightbox Modal Interactivo para todas las galerías)
function initGlobalLightbox() {
  // 1. Selector para imágenes de galerías en toda la web
  const galleryImages = Array.from(document.querySelectorAll('.grid img, .aspect-square img, [data-lightbox], .gallery-img, .lightbox-img')).filter(img => {
    const src = img.getAttribute('src') || '';
    return src && !src.includes('logo') && !src.includes('icons-ink') && !src.includes('svg') && !src.includes('icon');
  });

  if (galleryImages.length === 0) return;

  // Añadir estilo cursor pointer y accesibilidad
  galleryImages.forEach(img => {
    img.classList.add('cursor-pointer', 'transition-transform', 'duration-200', 'hover:scale-102', 'hover:brightness-105');
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', 'Ampliar imagen');
  });

  // 2. Crear modal Lightbox si no existe en el DOM
  let modal = document.getElementById('global-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'global-lightbox-modal';
    modal.className = 'fixed inset-0 z-50 hidden flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 transition-all duration-300 opacity-0 pointer-events-none';
    modal.innerHTML = `
      <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center my-auto">
        <!-- Botón Cerrar -->
        <button type="button" id="lightbox-close" class="absolute -top-12 right-0 sm:-top-14 sm:-right-2 text-white/90 hover:text-white p-2.5 rounded-full bg-stone-900/90 hover:bg-primary transition-all shadow-lg cursor-pointer flex items-center justify-center z-50 border border-white/10" aria-label="Cerrar ventana">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>

        <!-- Botón Anterior -->
        <button type="button" id="lightbox-prev" class="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 rounded-full bg-stone-900/90 hover:bg-primary transition-all shadow-lg cursor-pointer flex items-center justify-center z-50 border border-white/10" aria-label="Imagen anterior">
          <span class="material-symbols-outlined text-2xl">chevron_left</span>
        </button>

        <!-- Botón Siguiente -->
        <button type="button" id="lightbox-next" class="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-3 rounded-full bg-stone-900/90 hover:bg-primary transition-all shadow-lg cursor-pointer flex items-center justify-center z-50 border border-white/10" aria-label="Imagen siguiente">
          <span class="material-symbols-outlined text-2xl">chevron_right</span>
        </button>

        <!-- Contenedor Imagen y Pie -->
        <div class="relative overflow-hidden rounded-2xl border border-stone-700/80 bg-stone-950 shadow-2xl flex flex-col items-center justify-center max-h-[82vh] w-full">
          <img id="lightbox-img" src="" alt="" class="max-h-[76vh] w-auto max-w-full object-contain transition-all duration-300 p-2">
          <div id="lightbox-caption" class="w-full bg-stone-900/95 text-stone-200 text-xs sm:text-sm py-3 px-4 text-center font-serif truncate border-t border-stone-800"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const lightboxImg = modal.querySelector('#lightbox-img');
  const lightboxCaption = modal.querySelector('#lightbox-caption');
  const closeBtn = modal.querySelector('#lightbox-close');
  const prevBtn = modal.querySelector('#lightbox-prev');
  const nextBtn = modal.querySelector('#lightbox-next');

  let activeIndex = 0;
  let activeGallery = [];

  function openLightbox(gallery, index) {
    activeGallery = gallery;
    activeIndex = index;
    updateModalContent();
    
    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.classList.add('flex', 'opacity-100');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  function updateModalContent() {
    if (!activeGallery[activeIndex]) return;
    const targetImg = activeGallery[activeIndex];
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt || 'Imagen ampliada Shaolin Pechan';
    lightboxCaption.textContent = targetImg.alt || targetImg.title || 'Shaolin Pechan • Cultura & Artes Marciales';

    if (activeGallery.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  function showNext() {
    if (activeGallery.length <= 1) return;
    activeIndex = (activeIndex + 1) % activeGallery.length;
    updateModalContent();
  }

  function showPrev() {
    if (activeGallery.length <= 1) return;
    activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
    updateModalContent();
  }

  // Vincular eventos click a todas las imágenes detectadas
  galleryImages.forEach(img => {
    const parentGallery = img.closest('.grid, .aspect-square, section, main') || document.body;
    const siblingImages = Array.from(parentGallery.querySelectorAll('img')).filter(i => galleryImages.includes(i));
    
    const handler = (e) => {
      e.preventDefault();
      const idx = siblingImages.indexOf(img);
      openLightbox(siblingImages.length > 0 ? siblingImages : [img], idx >= 0 ? idx : 0);
    };

    img.addEventListener('click', handler);
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handler(e);
      }
    });
  });

  // Event Listeners para cerrar y navegar
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('backdrop-blur-md')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden') || modal.classList.contains('opacity-0')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
