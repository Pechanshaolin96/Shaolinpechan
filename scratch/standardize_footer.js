const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

const UNIFIED_FOOTER = `  <!-- PIE DE PÁGINA -->
  <footer class="w-full bg-surface-container-lowest border-t border-surface-container-high text-on-surface" id="contacto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-surface-container-high">
        
        <!-- Col 1: Marca & Linaje -->
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-3">
            <img alt="Shaolin Pechan Emblema" class="h-10 w-10 rounded-full object-contain border border-stone-200 p-0.5" src="assets/img/logo.png">
            <div>
              <span class="font-display font-bold text-base text-on-surface block">Shaolin Pechan • 少林百禅</span>
              <span class="text-xs text-secondary font-body">Filial Oficial Escuela Shaolin Argentina | Jiaolian Pablo Encinas</span>
            </div>
          </div>
          <p class="text-xs text-secondary font-body leading-relaxed max-w-sm">
            Preservamos la transmisión auténtica del Templo Shaolin y Chenjiagou bajo la tutela de Shifu Daniel Vera (Shi Xing Wu) y Shimu Yamila Melillo (Shi Xing Gong). Clases al aire libre en el Mástil del Parque Los Andes y Medicina Tradicional China.
          </p>
          <div class="flex flex-wrap items-center gap-2 pt-1">
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-semibold">
              <span class="text-[10px] tracking-widest uppercase">Linaje Oficial: Shi De Yang &amp; Chen Ziqiang</span>
            </div>
            <a href="https://www.instagram.com/shaolin_pechan/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary hover:text-primary-container text-xs font-semibold transition-colors">
              <span class="text-[11px]">Instagram: @shaolin_pechan</span>
            </a>
          </div>
        </div>

        <!-- Col 2: Navegación -->
        <div class="lg:col-span-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 font-display">Navegación</h4>
          <ul class="space-y-2 text-xs text-secondary font-body">
            <li><a class="hover:text-primary transition-colors" href="index.html">Inicio</a></li>
            <li><a class="hover:text-primary transition-colors" href="kung-fu.html">Shaolin Kung Fu</a></li>
            <li><a class="hover:text-primary transition-colors" href="taijiquan.html">Taijiquan Chen</a></li>
            <li><a class="hover:text-primary transition-colors" href="tai-ji-mtc.html">Tai Ji &amp; Medicina China</a></li>
            <li><a class="hover:text-primary transition-colors" href="linaje-sedes.html">Linaje &amp; Maestros</a></li>
            <li><a class="hover:text-primary transition-colors" href="clases.html">Horarios Parque Los Andes</a></li>
          </ul>
        </div>

        <!-- Col 3: Todas las Sedes (Sección Solicitada) -->
        <div class="lg:col-span-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 font-display">Todas las Sedes</h4>
          <ul class="space-y-2.5 text-xs text-secondary font-body">
            <li>
              <a href="clases.html" class="hover:text-primary transition-colors block">
                <strong class="text-on-surface block text-[12px]">Sede Pechan · Chacarita</strong>
                <span class="text-[11px] text-stone-500">Mástil Parque Los Andes (Av. Corrientes &amp; Dorrego)</span>
              </a>
            </li>
            <li>
              <a href="https://www.shaolin.ar" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors block">
                <strong class="text-on-surface block text-[12px]">Sede Central · Almagro</strong>
                <span class="text-[11px] text-stone-500">Fco. Acuña de Figueroa 833 (Escuela Matriz)</span>
              </a>
            </li>
            <li>
              <a href="https://www.shaolin.ar" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors block">
                <strong class="text-on-surface block text-[12px]">Sede Belgrano</strong>
                <span class="text-[11px] text-stone-500">Templo Tzong Kuan (Montañeses 2175)</span>
              </a>
            </li>
            <li class="pt-1">
              <a href="linaje-sedes.html" class="inline-flex items-center gap-1 text-[11px] text-primary font-bold hover:underline">
                <span>Ver Sedes &amp; Linaje Oficial</span>
                <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 4: Clínica & MTC -->
        <div class="lg:col-span-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 font-display">Clínica &amp; MTC</h4>
          <ul class="space-y-2 text-xs text-secondary font-body">
            <li><a class="hover:text-primary transition-colors" href="medicina-china.html">Acupuntura Clínica</a></li>
            <li><a class="hover:text-primary transition-colors" href="medicina-china.html">Masaje Terapéutico Tuina</a></li>
            <li><a class="hover:text-primary transition-colors" href="medicina-china.html">Moxibustión &amp; Ventosas</a></li>
            <li><a class="hover:text-primary transition-colors" href="medicina-china.html">Fitoterapia China</a></li>
            <li><a class="hover:text-primary transition-colors" href="contacto.html">Consultas &amp; Turnos</a></li>
          </ul>
        </div>

        <!-- Col 5: Ubicación & Horarios -->
        <div class="lg:col-span-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 font-display">Ubicación &amp; Horarios</h4>
          <div class="space-y-2 text-xs text-secondary font-body">
            <p class="flex items-start gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
              <span>En el Mástil del Parque Los Andes<br>Av. Corrientes y Av. Dorrego (Chacarita, CABA)</span>
            </p>
            <div class="pt-1 text-[11px] text-secondary space-y-1">
              <p><strong class="text-on-surface">Kung Fu:</strong> Mié./Vie. 08:30 • Jue. 10:30</p>
              <p><strong class="text-on-surface">Infantil:</strong> Martes 16:30 hs</p>
              <p><strong class="text-on-surface">Tai Ji:</strong> Lun./Jue. 08:30 y 09:30</p>
              <p><strong class="text-on-surface">Integrada:</strong> Domingos 11:00 AM</p>
              <p><strong class="text-on-surface">WhatsApp:</strong> <a href="https://wa.me/541150629554" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold hover:underline">+54 11 5062-9554</a></p>
            </div>
            <p class="pt-1">
              <a href="https://www.google.com/maps/search/?api=1&query=Mastil+Parque+Los+Andes+Chacarita+Buenos+Aires" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] text-ochre-deep font-semibold hover:underline">
                <span class="material-symbols-outlined text-xs">open_in_new</span> Abrir en Google Maps
              </a>
            </p>
          </div>
        </div>

      </div>

      <!-- Barra Inferior de Derechos -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-secondary font-body">
        <div>© 2025-2026 Shaolin Pechan • Sede de la Escuela Shaolin Argentina. Todos los derechos reservados.</div>
        <div class="flex items-center gap-6">
          <a class="hover:text-primary transition-colors" href="https://www.shaolin.ar" target="_blank" rel="noopener noreferrer">Sede Central (shaolin.ar)</a>
          <a class="hover:text-primary transition-colors" href="https://www.instagram.com/shaolin_pechan/" target="_blank" rel="noopener noreferrer">Instagram Oficial</a>
          <a class="hover:text-primary transition-colors" href="contacto.html">Contacto Directo</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- BOTÓN FLOTANTE DE WHATSAPP -->
  <a href="https://wa.me/541150629554?text=Hola%20Jiaolian%20Pablo,%20quisiera%20consultar%20por%20las%20clases%20en%20Shaolin%20Pechan" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Contactar por WhatsApp">
    <svg viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 2.019.813 3.097.814h.005c3.18 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.078-1.09-1.088-2.538-1.687-4.077-1.687m7.09 11.169c-.297.838-1.464 1.538-2.395 1.738-.638.139-1.472.25-4.275-.913-3.585-1.488-5.892-5.137-6.071-5.375-.179-.239-1.455-1.937-1.455-3.694 0-1.758.917-2.624 1.242-2.983.325-.359.708-.449.945-.449.236 0 .473.002.68.012.218.01.509-.083.797.607.297.717 1.01 2.469 1.1 2.648.089.179.149.389.03.628-.119.239-.178.389-.355.597-.179.209-.377.468-.538.628-.179.179-.366.374-.158.732.209.359.928 1.531 1.992 2.478 1.368 1.22 2.52 1.598 2.876 1.777.355.179.563.149.771-.089.209-.239.89-1.045 1.127-1.403.237-.359.474-.299.799-.179.325.119 2.062.973 2.417 1.152.355.179.593.269.68.419.088.149.088.868-.209 1.706"/>
    </svg>
    <span class="text">Consultar por WhatsApp</span>
  </a>

  <!-- Script global -->
  <script src="assets/js/main.js"></script>`;

console.log(`Standardizing unified footer with 'Todas las Sedes' across ${files.length} pages...\n`);

let updatedCount = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match from `<footer` down to `</body>`
  const footerStart = content.indexOf('<footer');
  const bodyEnd = content.indexOf('</body>');

  if (footerStart === -1 || bodyEnd === -1) {
    console.error(`Could not locate footer in ${f}`);
    return;
  }

  // Check if there was any comment right before <footer like `<!-- PIE DE PÁGINA -->` or `<!-- FOOTER -->`
  let cutStart = footerStart;
  const beforeFooter = content.slice(Math.max(0, footerStart - 60), footerStart);
  const commentMatch = beforeFooter.match(/(<!--\s*(?:PIE DE PÁGINA|FOOTER)[^>]*-->\s*)$/i);
  if (commentMatch) {
    cutStart = footerStart - commentMatch[1].length;
  }

  content = content.slice(0, cutStart) + UNIFIED_FOOTER + '\n' + content.slice(bodyEnd);
  fs.writeFileSync(filePath, content, 'utf8');
  updatedCount++;
  console.log(`✓ Updated footer in: ${f}`);
});

console.log(`\nSuccessfully applied unified footer with 'Todas las Sedes' to ${updatedCount} pages.`);
