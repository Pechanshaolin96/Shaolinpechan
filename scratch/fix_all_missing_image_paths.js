const fs = require('fs');
const path = require('path');

const root = process.cwd();
const imgDir = path.join(root, 'imagenes');

const fixes = {
  'imagenes/Jiao-Lian-Miguel-Lopez-monk.jpg': 'imagenes/Jiao-Lian-Miguel-Lopez-9.jpg',
  'imagenes/Jiao-Lian-Carlos-Vighi-zoom.jpg': 'imagenes/Jiao-Lian-Carlos-Vighi-3.jpg',
  'imagenes/Jiao-Lian-Javier-Cuberos-zoom.jpg': 'imagenes/Jiao-Lian-Javier-Cuberos-2.jpg',
  'imagenes/actividad-caligrafia-idioma7.jpg': 'imagenes/idioma7.jpg',
  'imagenes/actividad-cultura-te-full.jpg': 'imagenes/cultura-te1.jpg',
  'imagenes/actividad-idioma-chino-full.jpg': 'imagenes/idioma1.jpg',
  'imagenes/yoga-profesional.jpg': 'imagenes/yoga_prin.jpg',
  'imagenes/yo/pablo-kung-fu-espada.jpg': 'assets/img/maestros/pablo-encinas.jpg',
  'imagenes/yo/pablo-chen-taijiquan.jpg': 'assets/img/maestros/pablo-encinas.jpg',
  'imagenes/Certificado-Zhengzhou-XiaoHongquan-2018.jpg': 'assets/img/logo.png',
  'imagenes/Certificado-Zhengzhou-ShortApparatus-2018.jpg': 'assets/img/logo.png',
  'imagenes/Certificado-Zhengzhou-Yinshougun-2018.jpg': 'assets/img/logo.png',
  'imagenes/Certificado-Sudamerica-Sanda-2018.jpg': 'assets/img/logo.png',
  'imagenes/Certificado-Sudamerica-Quanshu-2018.jpg': 'assets/img/logo.png',
  'imagenes/Certificado-Sudamerica-ArmasCortas-2018.jpg': 'assets/img/logo.png',
  'imagenes/Certificado-Sudamerica-ArmaLarga-2018.jpg': 'assets/img/logo.png'
};

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(root, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  Object.entries(fixes).forEach(([from, to]) => {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      changed = true;
      console.log(`[FIX] ${file}: ${from} -> ${to}`);
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Finished updating image paths in HTML files.');
