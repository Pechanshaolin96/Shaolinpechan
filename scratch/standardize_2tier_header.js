const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');

const PAGE_MAP = {
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

function generateNavRowHtml(fileName) {
  const config = PAGE_MAP[fileName] || { section: '', sub: null };
  const s = config.section;
  const sub = config.sub;

  const isInicio = s === 'INICIO';
  const isEscuela = s === 'ESCUELA';
  const isDisciplinas = s === 'DISCIPLINAS';
  const isCultura = s === 'CULTURA';
  const isGaleria = s === 'GALERIA';
  const isAudiovisual = s === 'AUDIOVISUAL';
  const isContacto = s === 'CONTACTO';

  return `      <!-- FILA INFERIOR: Barra Blanca de Navegación de Todas las Páginas Centradas Debajo del Logo -->
      <div id="header-nav-row" class="header-nav-row w-full pt-2 flex items-center justify-center">
        <nav id="desktop-nav" class="desktop-nav-menu flex items-center justify-center flex-wrap gap-1 xl:gap-2">
          <a class="nav-desktop-link ${isInicio ? 'active' : ''}" href="index.html">INICIO</a>

          <!-- 1. LA ESCUELA -->
          <div class="nav-dropdown-wrapper">
            <button class="nav-desktop-link ${isEscuela ? 'active' : ''}" type="button">
              <span>LA ESCUELA</span>
              <span class="material-symbols-outlined text-[16px] transition-transform duration-200">expand_more</span>
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
              <span class="material-symbols-outlined text-[16px] transition-transform duration-200">expand_more</span>
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
              <span class="material-symbols-outlined text-[16px] transition-transform duration-200">expand_more</span>
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
              <span class="material-symbols-outlined text-[16px] transition-transform duration-200">expand_more</span>
            </button>
            <div class="nav-dropdown-menu">
              <a class="nav-dropdown-item ${sub === 'galeria.html' ? 'active' : ''}" href="galeria.html">Galería Principal</a>
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

          <!-- Botón de Acción -->
          <a class="nav-cta-btn ml-1" href="contacto.html#clase-prueba">
            Clase de Prueba
          </a>
        </nav>
      </div>`;
}

const BRAND_ROW_HTML = `      <!-- FILA SUPERIOR: Logotipo & Marca Centrados Estéticamente -->
      <div class="header-brand-row w-full flex items-center justify-center relative pb-2 sm:pb-2.5 border-b border-stone-100">
        
        <!-- Logotipo e Identidad de Marca Centrado -->
        <a class="brand-center-link flex items-center justify-center gap-3.5 group text-center mx-auto" href="index.html" title="Shaolin Pechan - Inicio">
          <img alt="Shaolin Pechan Emblema Oficial" class="brand-logo-img" src="assets/img/logo.png">
          <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div class="flex items-center gap-2">
              <span class="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 group-hover:text-primary transition-colors">Shaolin Pechan</span>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-[11px] font-serif font-bold tracking-widest border border-primary/20">少林百禅</span>
            </div>
            <span class="text-[10px] sm:text-xs font-semibold tracking-wider text-stone-500 uppercase font-sans mt-0.5">
              Sede Oficial Shaolin Argentina • Parque Los Andes • Chacarita
            </span>
          </div>
        </a>

        <!-- Botón Disparador Menú (Solo Dispositivos Móviles < 768px) -->
        <div class="mobile-menu-trigger-wrap absolute right-0 top-1/2 -translate-y-1/2 hidden md:hidden items-center gap-2">
          <a class="nav-cta-btn hidden sm:inline-flex md:hidden text-xs py-1.5 px-3" href="contacto.html#clase-prueba">
            Clase de Prueba
          </a>
          <button id="mobile-menu-btn" aria-label="Abrir menú" class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center text-stone-700 hover:bg-stone-100 hover:text-primary transition-colors focus:outline-none shadow-xs">
            <span class="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>

      </div>`;

const files = Object.keys(PAGE_MAP);
console.log(`Standardizing 2-tier header across ${files.length} pages...\n`);

let updatedCount = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${f}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Brand Row block
  const brandRowRegex = /<!-- FILA SUPERIOR:[\s\S]*?<\/div>\s*<\/div>/;
  if (!brandRowRegex.test(content)) {
    // Fallback search
    const startIdx = content.indexOf('<div class="header-brand-row');
    if (startIdx !== -1) {
      const endMarker = '<!-- FILA INFERIOR:';
      const endIdx = content.indexOf(endMarker, startIdx);
      if (endIdx !== -1) {
        content = content.slice(0, startIdx) + BRAND_ROW_HTML + '\n\n' + content.slice(endIdx);
      }
    }
  } else {
    content = content.replace(brandRowRegex, BRAND_ROW_HTML);
  }

  // Replace Nav Row block
  const navRowRegex = /<!-- FILA INFERIOR:[\s\S]*?<\/div>\s*<\/div>\s*<\/header>/;
  const newNavRow = generateNavRowHtml(f) + '\n\n    </div>\n  </header>';

  if (navRowRegex.test(content)) {
    content = content.replace(navRowRegex, newNavRow);
  } else {
    // Fallback: match from `<div id="header-nav-row"` to `</header>`
    const navStart = content.indexOf('<div id="header-nav-row"');
    const headerEnd = content.indexOf('</header>', navStart);
    if (navStart !== -1 && headerEnd !== -1) {
      content = content.slice(0, navStart) + generateNavRowHtml(f) + '\n\n    </div>\n  ' + content.slice(headerEnd);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`✓ Updated: ${f}`);
});

console.log(`\nSuccessfully standardized ${updatedCount} files.`);
