const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'imagenes');
const inventoryPath = path.join(__dirname, 'shaolin_media_inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Create a lookup map of inventory by basename
const invMap = new Map();
inventory.forEach(item => {
  const bn = path.basename(new URL(item.source_url).pathname);
  invMap.set(bn, item);
});

const files = fs.readdirSync(targetDir).filter(f => !f.endsWith('.json') && !f.endsWith('.md'));

console.log(`Found ${files.length} image files in ${targetDir}`);

function categorize(filename, title) {
  const str = (filename + ' ' + title).toLowerCase();
  if (str.includes('maestro') || str.includes('discipulo') || str.includes('shifu') || str.includes('prof') || 
      str.includes('chen') || str.includes('vera') || str.includes('deyang') || str.includes('de_yang') || 
      str.includes('suxi') || str.includes('encinas') || str.includes('yamila') || str.includes('lopez') || 
      str.includes('cuberos') || str.includes('vighi')) {
    return 'maestros-linaje';
  }
  if (str.includes('viaje') || str.includes('china') || str.includes('songshan') || str.includes('henan') || 
      str.includes('templo') || str.includes('chenjiagou') || str.includes('pagoda')) {
    return 'viajes-china';
  }
  if (str.includes('retiro') || str.includes('ceremonia') || str.includes('seminario') || str.includes('examen') || 
      str.includes('vesak') || str.includes('muestra') || str.includes('torneo')) {
    return 'eventos-galeria';
  }
  if (str.includes('qi-gong') || str.includes('qigong') || str.includes('chi-kung') || str.includes('ba-duan-jin')) {
    return 'qi-gong';
  }
  if (str.includes('meditacion') || str.includes('chan') || str.includes('dharma') || str.includes('zen')) {
    return 'meditacion-chan';
  }
  if (str.includes('taiji') || str.includes('taichi') || str.includes('tai-chi') || str.includes('laojia')) {
    return 'chen-taijiquan';
  }
  if (str.includes('te') || str.includes('caligrafia') || str.includes('idioma') || str.includes('chino') || str.includes('medicina')) {
    return 'cultura-tradicional';
  }
  return 'shaolin-kung-fu';
}

const catalog = [];
const categoryCounts = {};

files.forEach(f => {
  const fullPath = path.join(targetDir, f);
  const stats = fs.statSync(fullPath);
  const inv = invMap.get(f) || {};

  const cat = categorize(f, inv.title || '');
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

  catalog.push({
    archivo: f,
    ruta_relativa: `imagenes/${f}`,
    tamano_bytes: stats.size,
    tamano_kb: Math.round(stats.size / 1024),
    ancho: inv.width || 0,
    alto: inv.height || 0,
    categoria: cat,
    titulo: inv.title || f,
    url_original: inv.source_url || `https://www.shaolin.ar/wp-content/uploads/${f}`
  });
});

// Sort by category, then by filename
catalog.sort((a, b) => {
  if (a.categoria !== b.categoria) return a.categoria.localeCompare(b.categoria);
  return a.archivo.localeCompare(b.archivo);
});

// Write catalogo.json
const catalogPath = path.join(targetDir, 'catalogo.json');
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Saved ${catalog.length} items to ${catalogPath}`);

console.log('\nCategory Counts:');
console.table(categoryCounts);

// Generate README.md
let md = `# Repositorio de Imágenes Oficiales de Shaolin Argentina (shaolin.ar)

Este directorio contiene la biblioteca fotográfica histórica oficial y completa descargada directamente del servidor de **Shaolin Argentina** (\`shaolin.ar\`).

- **Total de imágenes descargadas**: ${catalog.length} archivos originales.
- **Catálogo de metadatos**: [\`catalogo.json\`](file:///c:/Users/pablo/Documents/Web%20Shaolin%20pechan/imagenes/catalogo.json)

---

## Protocolo de Calidad de Imagen para Shaolin Pechan

Para cumplir estrictamente con la regla institucional:
> *"Siempre que se suba una imagen en cualquier rincón de nuestra web tiene que ser de buena calidad para que se vea bien."*

### 1. Resolución y Nitidez Adecuada
- **Banners y Heroes**: Usar imágenes con ancho mínimo de 1200px a 1920px.
- **Tarjetas de Maestros y Discípulos**: Usar retratos nítidos sin pixelación.
- **Galerías y Secuencias**: Imágenes con ancho mínimo de 800px.

### 2. Formato HTML Recomendado
Para evitar distorsiones en cualquier tamaño de pantalla, incluir siempre clases de relación de aspecto y ajuste:
\`\`\`html
<img src="imagenes/nombre-archivo.jpg" 
     alt="Descripción institucional clara" 
     class="w-full h-full object-cover rounded-xl shadow-md"
     loading="lazy" 
     decoding="async">
\`\`\`

---

## Desglose por Categorías

| Categoría | Cantidad de Imágenes | Descripción |
|---|---|---|
${Object.entries(categoryCounts).map(([cat, count]) => `| \`${cat}\` | **${count}** | Fotos clasificadas para ${cat} |`).join('\n')}

---

## Imágenes Destacadas Listas para Usar

### 1. Maestros y Discípulos del Linaje
- **Pablo Encinas (Jiaolian - Dir. Pechan)**: \`imagenes/Pablo_Encinas.jpg\`
- **Daniel Vera (Shifu - Director Shaolin Argentina)**: \`imagenes/Daniel_Vera.jpg\`
- **Gran Maestro Chen Ziqiang**: \`imagenes/Chen_Ziqiang.jpg\`
- **Gran Maestro Chen Xiaoxing**: \`imagenes/Chen_Xiaoxing.jpg\`
- **Maestro Chen Wangting**: \`imagenes/Chen_Wangting.jpg\`
- **Yamila Melillo**: \`imagenes/Yamila_Melillo.jpg\`
- **Carlos Vighi Mato**: \`imagenes/Carlos_Vighi_Mato.jpg\`
- **Javier Cuberos**: \`imagenes/Javier_Cuberos.jpg\`
- **Miguel López Márquez**: \`imagenes/Miguel_Lopez_Marquez.jpg\`

### 2. Secuencia Técnica de Qi Gong
- \`imagenes/qi-gong1.jpg\` a \`imagenes/qi-gong11.jpg\` (Resolución 800x600/800x533, alta nitidez)

### 3. Actividades Principales
- Kung Fu: \`imagenes/actividad-shaolin-kung-fu.jpg\`
- Taijiquan: \`imagenes/actividad-taiji.jpg\`
- Meditación Chan: \`imagenes/actividad-meditacion-chan.jpg\`
- Qi Gong: \`imagenes/actividad-qi-gong.jpg\`
- Chan Gong: \`imagenes/actividad-chan-gong.jpg\`
- Kung Fu Infantil: \`imagenes/actividad-kung-fu-chicos.jpg\`
- Yoga: \`imagenes/actividad-yoga.jpg\`
- Reiki: \`imagenes/actividad-reiki.jpg\`
- Idioma Chino: \`imagenes/actividad-idioma-chino.jpg\`
`;

const readmePath = path.join(targetDir, 'README.md');
fs.writeFileSync(readmePath, md, 'utf8');
console.log(`Saved guide to ${readmePath}`);
