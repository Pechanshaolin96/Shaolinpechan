import re

# 1. Update assets/css/custom.css
with open('assets/css/custom.css', 'r', encoding='utf-8') as f:
    css = f.read()

tree_css = """
/* ========================================================
   ÁRBOL GENEALÓGICO & LÍNEA DE TIEMPO INTERACTIVA DE MAESTROS
   ======================================================== */

.lineage-tree-wrapper {
  position: relative;
}

/* Nodos interactivos del Árbol & Timeline */
.tree-node-master {
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  user-select: none;
}

.tree-node-master:hover {
  transform: translateY(-2px);
}

.tree-node-master.active {
  border-color: #B87314 !important;
  background-color: #ffffff !important;
  box-shadow: 0 10px 25px -5px rgba(184, 115, 20, 0.2), 0 0 0 2px rgba(184, 115, 20, 0.3) !important;
}

.tree-node-master.active .node-avatar-ring {
  border-color: #B87314 !important;
  box-shadow: 0 0 12px rgba(184, 115, 20, 0.4);
}

.tree-node-master.active .node-active-pill {
  opacity: 1;
  transform: scale(1);
}

.tree-node-master:not(.active) .node-active-pill {
  opacity: 0;
  transform: scale(0.6);
}

/* Paneles de Perfil de Maestros */
.master-profile-panel {
  display: none;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.master-profile-panel.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* Track de Timeline horizontal con scroll oculto */
.lineage-timeline-track {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.lineage-timeline-track::-webkit-scrollbar {
  display: none;
}
"""

if 'ÁRBOL GENEALÓGICO' not in css:
    css = css.strip() + "\n\n" + tree_css.strip() + "\n"
    with open('assets/css/custom.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated assets/css/custom.css successfully")
else:
    print("CSS already contains ÁRBOL GENEALÓGICO styles")

# 2. Update assets/js/main.js
with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

if 'initMasterLineageTree();' not in js:
    # Add to DOMContentLoaded
    js = js.replace(
        "  initMasterCarousels();",
        "  initMasterCarousels();\n  initMasterLineageTree();"
    )

tree_js_func = """
// Árbol Genealógico y Línea de Tiempo Interactiva de Maestros
function initMasterLineageTree() {
  const container = document.getElementById('arbol-maestros');
  if (!container) return;

  const nodes = container.querySelectorAll('.tree-node-master');
  const panels = container.querySelectorAll('.master-profile-panel');
  const counterDisplay = document.getElementById('lineage-counter');
  const nameLabel = document.getElementById('lineage-name-label');
  const prevBtn = document.getElementById('lineage-prev-btn');
  const nextBtn = document.getElementById('lineage-next-btn');

  if (panels.length === 0) return;

  const masterNames = [
    "Shi Suxi Zhang Lao",
    "Shi De Yang",
    "Daniel Vera",
    "Yamila Melillo",
    "Miguel López Márquez",
    "Carlos Vighi",
    "Javier Cuberos",
    "Pablo Encinas"
  ];

  let currentIdx = 0;
  const total = panels.length;

  function setActiveMaster(index) {
    if (index < 0) index = 0;
    if (index >= total) index = total - 1;
    currentIdx = index;

    // Actualizar todos los nodos (tanto del timeline como del árbol)
    nodes.forEach(node => {
      const idx = parseInt(node.getAttribute('data-master-idx'), 10);
      if (idx === index) {
        node.classList.add('active');
        node.setAttribute('aria-selected', 'true');
        // Scroll horizontal suave en el timeline si el nodo está en el track
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
      counterDisplay.textContent = `0${index + 1} / 0${total}`;
    }
    if (nameLabel) {
      nameLabel.textContent = masterNames[index] || '';
    }
  }

  // Eventos de Mouseenter (hover instantáneo), Clic y Foco
  nodes.forEach(node => {
    const idx = parseInt(node.getAttribute('data-master-idx'), 10);
    
    // Al pasar el ratón (hover en tiempo real solicitado por el usuario)
    node.addEventListener('mouseenter', () => {
      setActiveMaster(idx);
    });

    // Al hacer clic o tap en pantallas táctiles
    node.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveMaster(idx);
    });

    // Accesibilidad por teclado (Tab)
    node.addEventListener('focus', () => {
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

  // Inicializar en el primer maestro
  setActiveMaster(0);
}
"""

if 'initMasterLineageTree' not in js:
    js = js.strip() + "\n\n" + tree_js_func.strip() + "\n"
    with open('assets/js/main.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated assets/js/main.js successfully")
else:
    print("main.js already contains initMasterLineageTree")

# 3. Update maestros-shaolin.html
with open('maestros-shaolin.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

with open('scratch/arbol_component.html', 'r', encoding='utf-8') as f:
    component_html = f.read()

# Replace the old section from <!-- CARRUSEL DE MAESTROS E INSTRUCTORES SHAOLIN --> to </section> before </main>
pattern = r'<!-- CARRUSEL DE MAESTROS E INSTRUCTORES SHAOLIN -->.*?<\/section>'
match = re.search(pattern, html_content, re.DOTALL)
if match:
    new_html = html_content[:match.start()] + component_html + html_content[match.end():]
    with open('maestros-shaolin.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Updated maestros-shaolin.html with Árbol Genealógico & Línea de Tiempo successfully")
else:
    print("Pattern not matched in maestros-shaolin.html")
