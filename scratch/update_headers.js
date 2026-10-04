const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');

const PAGE_CONFIG = {
  'index.html': { section: 'INICIO', sub: null },
  'maestros-shaolin.html': { section: 'ESCUELA', sub: 'maestros-shaolin.html' },
  'maestros-taiji.html': { section: 'ESCUELA', sub: 'maestros-taiji.html' },
  'discipulos-shaolin.html': { section: 'ESCUELA', sub: 'discipulos-shaolin.html' },
  'discipulos-taiji.html': { section: 'ESCUELA', sub: 'discipulos-taiji.html' },
  'viajes-china.html': { section: 'ESCUELA', sub: 'viajes-china.html' },
  'clases.html': { section: 'ESCUELA', sub: 'clases.html' },
  'linaje-sedes.html': { section: 'ESCUELA', sub: 'linaje-sedes.html' },
  'kung-fu.html': { section: 'DISCIPLINAS', sub: 'kung-fu.html' },
  'taijiquan.html': { section: 'DISCIPLINAS', sub: 'taijiquan.html' },
  'meditacion-chan.html': { section: 'DISCIPLINAS', sub: 'meditacion-chan.html' },
  'qi-gong.html': { section: 'DISCIPLINAS', sub: 'qi-gong.html' },
  'arqueria-zen.html': { section: 'DISCIPLINAS', sub: 'arqueria-zen.html' },
  'yoga.html': { section: 'DISCIPLINAS', sub: 'yoga.html' },
  'reiki.html': { section: 'DISCIPLINAS', sub: 'reiki.html' },
  'tai-ji-mtc.html': { section: 'DISCIPLINAS', sub: 'tai-ji-mtc.html' },
  'idioma-chino.html': { section: 'CULTURA', sub: 'idioma-chino.html' },
  'cultura-te.html': { section: 'CULTURA', sub: 'cultura-te.html' },
  'caligrafia-china.html': { section: 'CULTURA', sub: 'caligrafia-china.html' },
  'medicina-china.html': { section: 'CULTURA', sub: 'medicina-china.html' },
  'galeria.html': { section: 'GALERIA', sub: 'galeria.html' },
  'audiovisual.html': { section: 'AUDIOVISUAL', sub: null },
  'contacto.html': { section: 'CONTACTO', sub: null }
};

function generateHeaderBlock(fileName, config) {
  const s = config.section;
  const sub = config.sub;

  const isInicio = s === 'INICIO';
  const isEscuela = s === 'ESCUELA';
  const isDisciplinas = s === 'DISCIPLINAS';
  const isCultura = s === 'CULTURA';
  const isGaleria = s === 'GALERIA';
  const isAudiovisual = s === 'AUDIOVISUAL';
  const isContacto = s === 'CONTACTO';

  return `
  <!-- BANNER SUPERIOR DOCTRINAL -->
  <div class="doctrinal-top-bar text-white/90 py-2 px-4 text-center select-none">
    <div class="max-w-[1440px] mx-auto flex items-center justify-center flex-wrap gap-x-2 gap-y-0.5">
      <span class="font-serif tracking-widest text-amber-200/95 font-semibold text-xs sm:text-sm">少林是禅不是拳。释素喜</span>
      <span class="hidden md:inline text-amber-400/40">•</span>
      <span class="text-[11px] sm:text-xs text-stone-200 italic font-sans">"Shàolín shì Chán, bùshì Quán" — Shì Sùxi: "La práctica de Shaolin es el cultivo del espíritu y la meditación, por sobre la lucha y el combate."</span>
    </div>
  </div>

  <!-- NAVEGACIÓN PRINCIPAL -->
  <header class="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs transition-all">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[92px] py-2 sm:py-3 flex items-center justify-between gap-4">
      
      <!-- Logotipo & Identidad de Marca -->
      <a class="flex items-center gap-3.5 group shrink-0" href="index.html" title="Shaolin Pechan - Inicio">
        <img alt="Shaolin Pechan Emblema Oficial" class="brand-logo-img" src="assets/img/logo.png">
        <div class="flex flex-col justify-center">
          <div class="flex items-center gap-2">
            <span class="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 group-hover:text-primary transition-colors">Shaolin Pechan</span>
            <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-serif font-bold tracking-widest border border-primary/20 hidden sm:inline-block">少林百禅</span>
          </div>
          <span class="text-[11px] sm:text-xs font-medium tracking-wider text-stone-500 uppercase font-sans mt-0.5">
            Sede Oficial Shaolin Argentina • Chacarita • Dir. Pablo Encinas
          </span>
        </div>
      </a>

      <!-- Menú Desktop con nowrap y dropdowns refinados -->
      <nav class="hidden xl:flex items-center gap-1 2xl:gap-2 text-[12.5px] 2xl:text-[13px] font-semibold text-stone-700 whitespace-nowrap">
        <a class="nav-desktop-link ${isInicio ? 'active' : ''}" href="index.html">INICIO</a>

        <!-- 1. LA ESCUELA -->
        <div class="nav-dropdown-wrapper">
          <button class="nav-desktop-link ${isEscuela ? 'active' : ''}" type="button">
            <span>LA ESCUELA</span>
            <span class="material-symbols-outlined text-[18px] transition-transform duration-200">expand_more</span>
          </button>
          <div class="nav-dropdown-menu">
            <a class="nav-dropdown-item ${sub === 'maestros-shaolin.html' ? 'active' : ''}" href="maestros-shaolin.html">Maestros e Instructores Shaolin</a>
            <a class="nav-dropdown-item ${sub === 'maestros-taiji.html' ? 'active' : ''}" href="maestros-taiji.html">Maestros e Instructores Chen Taijiquan</a>
            <a class="nav-dropdown-item ${sub === 'discipulos-shaolin.html' ? 'active' : ''}" href="discipulos-shaolin.html">Discípulos Shaolin</a>
            <a class="nav-dropdown-item ${sub === 'discipulos-taiji.html' ? 'active' : ''}" href="discipulos-taiji.html">Discípulos Chen Taijiquan</a>
            <a class="nav-dropdown-item ${sub === 'viajes-china.html' ? 'active' : ''}" href="viajes-china.html">Viajes a China</a>
            <a class="nav-dropdown-item ${sub === 'clases.html' ? 'active' : ''}" href="clases.html">Clases &amp; Sede Pechan</a>
            <a class="nav-dropdown-item ${sub === 'linaje-sedes.html' ? 'active' : ''}" href="linaje-sedes.html">Linaje &amp; Sedes Oficiales</a>
          </div>
        </div>

        <!-- 2. ARTES MARCIALES & BIENESTAR -->
        <div class="nav-dropdown-wrapper">
          <button class="nav-desktop-link ${isDisciplinas ? 'active' : ''}" type="button">
            <span>ARTES MARCIALES &amp; BIENESTAR</span>
            <span class="material-symbols-outlined text-[18px] transition-transform duration-200">expand_more</span>
          </button>
          <div class="nav-dropdown-menu">
            <a class="nav-dropdown-item ${sub === 'kung-fu.html' ? 'active' : ''}" href="kung-fu.html">Shaolin Kung Fu</a>
            <a class="nav-dropdown-item ${sub === 'taijiquan.html' ? 'active' : ''}" href="taijiquan.html">Taijiquan Chen</a>
            <a class="nav-dropdown-item ${sub === 'meditacion-chan.html' ? 'active' : ''}" href="meditacion-chan.html">Meditación Chan</a>
            <a class="nav-dropdown-item ${sub === 'qi-gong.html' ? 'active' : ''}" href="qi-gong.html">Qi Gong (Chi Kung)</a>
            <a class="nav-dropdown-item ${sub === 'arqueria-zen.html' ? 'active' : ''}" href="arqueria-zen.html">Arquería Zen</a>
            <a class="nav-dropdown-item ${sub === 'yoga.html' ? 'active' : ''}" href="yoga.html">Yoga</a>
            <a class="nav-dropdown-item ${sub === 'reiki.html' ? 'active' : ''}" href="reiki.html">Reiki</a>
            <a class="nav-dropdown-item ${sub === 'tai-ji-mtc.html' ? 'active' : ''}" href="tai-ji-mtc.html">Tai Ji &amp; Medicina China</a>
          </div>
        </div>

        <!-- 3. CULTURA TRADICIONAL -->
        <div class="nav-dropdown-wrapper">
          <button class="nav-desktop-link ${isCultura ? 'active' : ''}" type="button">
            <span>CULTURA TRADICIONAL</span>
            <span class="material-symbols-outlined text-[18px] transition-transform duration-200">expand_more</span>
          </button>
          <div class="nav-dropdown-menu">
            <a class="nav-dropdown-item ${sub === 'idioma-chino.html' ? 'active' : ''}" href="idioma-chino.html">Idioma Chino</a>
            <a class="nav-dropdown-item ${sub === 'cultura-te.html' ? 'active' : ''}" href="cultura-te.html">Cultura del Té (Cha Dao)</a>
            <a class="nav-dropdown-item ${sub === 'caligrafia-china.html' ? 'active' : ''}" href="caligrafia-china.html">Caligrafía China (Shufa)</a>
            <a class="nav-dropdown-item ${sub === 'medicina-china.html' ? 'active' : ''}" href="medicina-china.html">Medicina Tradicional China</a>
          </div>
        </div>

        <!-- 4. GALERÍA -->
        <div class="nav-dropdown-wrapper">
          <button class="nav-desktop-link ${isGaleria ? 'active' : ''}" type="button">
            <span>GALERÍA</span>
            <span class="material-symbols-outlined text-[18px] transition-transform duration-200">expand_more</span>
          </button>
          <div class="nav-dropdown-menu">
            <a class="nav-dropdown-item" href="galeria.html#retiros">Retiros Espirituales</a>
            <a class="nav-dropdown-item" href="galeria.html#ceremonias">Ceremonias Tradicionales</a>
            <a class="nav-dropdown-item" href="galeria.html#seminarios">Seminarios &amp; Exámenes</a>
            <a class="nav-dropdown-item" href="galeria.html#noticias">Noticias &amp; Actividades</a>
            <a class="nav-dropdown-item" href="viajes-china.html">Viajes a China</a>
          </div>
        </div>

        <!-- 5. AUDIOVISUAL -->
        <a class="nav-desktop-link ${isAudiovisual ? 'active' : ''}" href="audiovisual.html">AUDIOVISUAL</a>

        <!-- 6. CONTACTO -->
        <a class="nav-desktop-link ${isContacto ? 'active' : ''}" href="contacto.html">CONTACTO</a>
      </nav>

      <!-- Botón de Acción y Disparador Menú Móvil -->
      <div class="flex items-center gap-3 shrink-0">
        <a class="nav-cta-btn hidden sm:inline-flex" href="contacto.html#clase-prueba">
          Clase de Prueba
        </a>
        <button id="mobile-menu-btn" aria-label="Abrir menú" class="xl:hidden w-11 h-11 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:text-primary transition-colors focus:outline-none">
          <span class="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>

    </div>
  </header>

  <!-- MENÚ MÓVIL EN ACORDEÓN -->
  <div id="mobile-drawer-backdrop" class="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-300"></div>
  <aside id="mobile-drawer" class="fixed top-0 right-0 w-[320px] max-w-[85vw] h-full bg-white z-50 shadow-2xl p-5 flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-in-out border-l border-stone-200 overflow-y-auto">
    <div>
      <div class="flex items-center justify-between pb-4 border-b border-stone-200">
        <div class="flex items-center gap-3">
          <img alt="Shaolin Pechan" class="w-12 h-12 rounded-full border border-stone-200 p-0.5 object-contain" src="assets/img/logo.png">
          <div>
            <span class="font-display font-bold text-base text-stone-900 block leading-tight">Shaolin Pechan</span>
            <span class="text-[10px] text-primary font-bold uppercase tracking-wider">Sede Shaolin Argentina</span>
          </div>
        </div>
        <button id="mobile-menu-close" aria-label="Cerrar menú" class="w-9 h-9 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <nav class="flex flex-col gap-1 mt-4">
        <a class="mobile-nav-link px-3 py-2 rounded-lg text-sm font-semibold ${isInicio ? 'text-primary bg-primary/10' : 'text-stone-700 hover:bg-stone-100'}" href="index.html">INICIO</a>
        
        <!-- ACORDEÓN 1: LA ESCUELA -->
        <div>
          <button class="mobile-accordion-header ${isEscuela ? 'text-primary font-bold' : ''}" type="button">
            <span>LA ESCUELA</span>
            <span class="material-symbols-outlined accordion-icon transition-transform duration-200" style="${isEscuela ? 'transform: rotate(180deg);' : ''}">expand_more</span>
          </button>
          <div class="mobile-accordion-content ${isEscuela ? 'open' : ''}">
            <a class="mobile-sub-link ${sub === 'maestros-shaolin.html' ? 'active' : ''}" href="maestros-shaolin.html">• Maestros Shaolin</a>
            <a class="mobile-sub-link ${sub === 'maestros-taiji.html' ? 'active' : ''}" href="maestros-taiji.html">• Maestros Chen Taiji</a>
            <a class="mobile-sub-link ${sub === 'discipulos-shaolin.html' ? 'active' : ''}" href="discipulos-shaolin.html">• Discípulos Shaolin</a>
            <a class="mobile-sub-link ${sub === 'discipulos-taiji.html' ? 'active' : ''}" href="discipulos-taiji.html">• Discípulos Chen Taiji</a>
            <a class="mobile-sub-link ${sub === 'viajes-china.html' ? 'active' : ''}" href="viajes-china.html">• Viajes a China</a>
            <a class="mobile-sub-link ${sub === 'clases.html' ? 'active' : ''}" href="clases.html">• Clases &amp; Sede Pechan</a>
            <a class="mobile-sub-link ${sub === 'linaje-sedes.html' ? 'active' : ''}" href="linaje-sedes.html">• Linaje &amp; Sedes Oficiales</a>
          </div>
        </div>

        <!-- ACORDEÓN 2: ARTES MARCIALES & BIENESTAR -->
        <div>
          <button class="mobile-accordion-header ${isDisciplinas ? 'text-primary font-bold' : ''}" type="button">
            <span>ARTES MARCIALES &amp; BIENESTAR</span>
            <span class="material-symbols-outlined accordion-icon transition-transform duration-200" style="${isDisciplinas ? 'transform: rotate(180deg);' : ''}">expand_more</span>
          </button>
          <div class="mobile-accordion-content ${isDisciplinas ? 'open' : ''}">
            <a class="mobile-sub-link ${sub === 'kung-fu.html' ? 'active' : ''}" href="kung-fu.html">• Shaolin Kung Fu</a>
            <a class="mobile-sub-link ${sub === 'taijiquan.html' ? 'active' : ''}" href="taijiquan.html">• Taijiquan Chen</a>
            <a class="mobile-sub-link ${sub === 'meditacion-chan.html' ? 'active' : ''}" href="meditacion-chan.html">• Meditación Chan</a>
            <a class="mobile-sub-link ${sub === 'qi-gong.html' ? 'active' : ''}" href="qi-gong.html">• Qi Gong (Chi Kung)</a>
            <a class="mobile-sub-link ${sub === 'arqueria-zen.html' ? 'active' : ''}" href="arqueria-zen.html">• Arquería Zen</a>
            <a class="mobile-sub-link ${sub === 'yoga.html' ? 'active' : ''}" href="yoga.html">• Yoga</a>
            <a class="mobile-sub-link ${sub === 'reiki.html' ? 'active' : ''}" href="reiki.html">• Reiki</a>
            <a class="mobile-sub-link ${sub === 'tai-ji-mtc.html' ? 'active' : ''}" href="tai-ji-mtc.html">• Tai Ji &amp; Medicina China</a>
          </div>
        </div>

        <!-- ACORDEÓN 3: CULTURA TRADICIONAL -->
        <div>
          <button class="mobile-accordion-header ${isCultura ? 'text-primary font-bold' : ''}" type="button">
            <span>CULTURA TRADICIONAL</span>
            <span class="material-symbols-outlined accordion-icon transition-transform duration-200" style="${isCultura ? 'transform: rotate(180deg);' : ''}">expand_more</span>
          </button>
          <div class="mobile-accordion-content ${isCultura ? 'open' : ''}">
            <a class="mobile-sub-link ${sub === 'idioma-chino.html' ? 'active' : ''}" href="idioma-chino.html">• Idioma Chino</a>
            <a class="mobile-sub-link ${sub === 'cultura-te.html' ? 'active' : ''}" href="cultura-te.html">• Cultura del Té</a>
            <a class="mobile-sub-link ${sub === 'caligrafia-china.html' ? 'active' : ''}" href="caligrafia-china.html">• Caligrafía China</a>
            <a class="mobile-sub-link ${sub === 'medicina-china.html' ? 'active' : ''}" href="medicina-china.html">• Medicina Tradicional China</a>
          </div>
        </div>

        <!-- ACORDEÓN 4: GALERÍA -->
        <div>
          <button class="mobile-accordion-header ${isGaleria ? 'text-primary font-bold' : ''}" type="button">
            <span>GALERÍA</span>
            <span class="material-symbols-outlined accordion-icon transition-transform duration-200" style="${isGaleria ? 'transform: rotate(180deg);' : ''}">expand_more</span>
          </button>
          <div class="mobile-accordion-content ${isGaleria ? 'open' : ''}">
            <a class="mobile-sub-link" href="galeria.html#retiros">• Retiros</a>
            <a class="mobile-sub-link" href="galeria.html#ceremonias">• Ceremonias</a>
            <a class="mobile-sub-link" href="galeria.html#seminarios">• Seminarios</a>
            <a class="mobile-sub-link" href="galeria.html#noticias">• Noticias</a>
            <a class="mobile-sub-link" href="viajes-china.html">• Viajes a China</a>
          </div>
        </div>

        <a class="mobile-nav-link px-3 py-2 rounded-lg text-sm font-semibold ${isAudiovisual ? 'text-primary bg-primary/10' : 'text-stone-700 hover:bg-stone-100'}" href="audiovisual.html">AUDIOVISUAL</a>
        <a class="mobile-nav-link px-3 py-2 rounded-lg text-sm font-semibold ${isContacto ? 'text-primary bg-primary/10' : 'text-stone-700 hover:bg-stone-100'}" href="contacto.html">CONTACTO</a>
      </nav>
    </div>

    <div class="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
      <a class="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider text-center shadow-md hover:bg-primary-dark transition-all" href="contacto.html#clase-prueba">
        Reservar Clase de Prueba
      </a>
      <span class="text-[11px] text-center text-stone-500">Parque Los Andes • Chacarita, CABA</span>
    </div>
  </aside>
`;
}

let updatedCount = 0;

for (const [fileName, config] of Object.entries(PAGE_CONFIG)) {
  const filePath = path.join(dir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${fileName}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Locate end of <body ...>
  const bodyMatch = content.match(/<body[^>]*>/);
  if (!bodyMatch) {
    console.error(`No <body tag in ${fileName}`);
    continue;
  }
  const bodyTagEnd = bodyMatch.index + bodyMatch[0].length;

  // 2. Locate end of current header / mobile drawer
  let drawerEnd = -1;
  if (content.includes('</aside>')) {
    drawerEnd = content.indexOf('</aside>') + '</aside>'.length;
  } else if (content.includes('id="mobile-menu"')) {
    const mIdx = content.indexOf('id="mobile-menu"');
    const heroIdx = content.search(/<!--\s*(HERO|ENCABEZADO|CONTENIDO)/i);
    const mainIdx = content.indexOf('<main');
    const secIdx = content.indexOf('<section');
    const candidates = [heroIdx, mainIdx, secIdx].filter(x => x > mIdx);
    drawerEnd = Math.min(...candidates);
  } else {
    console.error(`Could not locate end of drawer in ${fileName}`);
    continue;
  }

  const newHeader = generateHeaderBlock(fileName, config);

  const updatedContent = content.substring(0, bodyTagEnd) + '\n' + newHeader + '\n' + content.substring(drawerEnd).trimStart();

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`[OK] Updated ${fileName} (Section: ${config.section}, Sub: ${config.sub || 'none'})`);
  updatedCount++;
}

console.log(`\nSuccessfully updated ${updatedCount} HTML files!`);
