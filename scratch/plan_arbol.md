# Plan de Implementación: Árbol Genealógico y Línea de Tiempo Interactiva

1. Crear estilos CSS específicos en `assets/css/custom.css` para el Árbol Genealógico y Línea de Tiempo:
   - Nodos interactivos (.tree-node-master) con hover suave, glow dorado y elevación.
   - Conectores de linaje SVG (.lineage-connector-line) y ramas doradas.
   - Panel de perfil de maestro (.master-profile-panel) con transiciones suaves de opacidad y desplazamiento.
   - Timeline track horizontal con scroll suave en móviles.

2. Actualizar `maestros-shaolin.html`:
   - Reemplazar el viejo carrusel por la nueva sección del Árbol Genealógico y Línea de Tiempo Interactiva.
   - Incluir la barra de navegación temporal con los 8 maestros y sus avatares.
   - Incluir la estructura de ramificación genealógica (30ª Gen -> 31ª Gen -> 32ª Gen -> Instructores / Sedes).
   - Incluir el panel dinámico con los 8 perfiles completos sin perder ningún dato, texto o enlace.

3. Implementar la lógica interactiva en `assets/js/main.js`:
   - Función `initMasterLineageTree()`:
     - Activación al pasar el ratón (hover / mouseenter) en tiempo real.
     - Activación al hacer clic o tap en pantallas táctiles.
     - Navegación por teclado (Flechas izq/der).
     - Botones Siguiente / Anterior accesibles.
     - Actualización dinámica del contador y del breadcrumb de linaje.

4. Verificar con la suite de pruebas del proyecto (`scratch/verify_all_pages.js`).
