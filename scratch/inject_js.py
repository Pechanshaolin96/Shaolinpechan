with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add to DOMContentLoaded
if 'initMasterLineageTree();' not in js:
    js = js.replace(
        "  initMasterCarousels();\n});",
        "  initMasterCarousels();\n  initMasterLineageTree();\n});"
    )

# 2. Append function definition
tree_func = """
// Árbol Genealógico y Línea de Tiempo Interactiva de Maestros Shaolin
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

    // Actualizar todos los nodos interactivos (timeline + árbol)
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

  // Eventos de Mouseenter (hover en tiempo real solicitado por el usuario), Clic y Foco
  nodes.forEach(node => {
    const idx = parseInt(node.getAttribute('data-master-idx'), 10);
    
    // Al pasar el ratón (hover interactivo)
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

if 'function initMasterLineageTree()' not in js:
    js = js.strip() + "\n\n" + tree_func.strip() + "\n"

with open('assets/js/main.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Successfully injected initMasterLineageTree into assets/js/main.js")
