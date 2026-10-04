const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log(`Auditing ${files.length} pages for 2-tier header, images, and links...\n`);

let allGood = true;

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');

  const hasLogoImg = content.includes('class="brand-logo-img"');
  const hasDoctrinal = content.includes('doctrinal-top-bar') && content.includes('少林是禅不是拳。释素喜');
  const hasSiteHeader = content.includes('id="site-header"');
  const hasBrandRow = content.includes('header-brand-row');
  const hasBrandCenter = content.includes('brand-center-link');
  const hasNavRow = content.includes('id="header-nav-row"');
  const hasDesktopNav = content.includes('id="desktop-nav"');
  const hasCtaBtn = content.includes('nav-cta-btn');
  const hasDrawer = content.includes('id="mobile-drawer"');
  const hasBackdrop = content.includes('id="mobile-drawer-backdrop"');
  const hasCss = content.includes('assets/css/custom.css');
  const hasJs = content.includes('assets/js/main.js');

  const issues = [];
  if (!hasLogoImg) issues.push('missing brand-logo-img');
  if (!hasDoctrinal) issues.push('missing doctrinal-top-bar');
  if (!hasSiteHeader) issues.push('missing site-header');
  if (!hasBrandRow) issues.push('missing header-brand-row');
  if (!hasBrandCenter) issues.push('missing brand-center-link');
  if (!hasNavRow) issues.push('missing header-nav-row');
  if (!hasDesktopNav) issues.push('missing desktop-nav');
  if (!hasCtaBtn) issues.push('missing nav-cta-btn');
  if (!hasDrawer) issues.push('missing mobile-drawer');
  if (!hasBackdrop) issues.push('missing mobile-drawer-backdrop');
  if (!hasCss) issues.push('missing custom.css');
  if (!hasJs) issues.push('missing main.js');

  // Check internal links
  const linkMatches = [...content.matchAll(/href="([^"#:]+\.html)(#[^"]*)?"/g)];
  linkMatches.forEach(m => {
    const target = m[1];
    if (!fs.existsSync(path.join(dir, target))) {
      issues.push(`broken link to ${target}`);
    }
  });

  // Check local images
  const imgMatches = [...content.matchAll(/src="([^":]+\.(?:jpg|jpeg|png|webp|svg))"/gi)];
  imgMatches.forEach(m => {
    const imgSrc = m[1];
    if (!fs.existsSync(path.join(dir, imgSrc))) {
      issues.push(`missing image: ${imgSrc}`);
    }
  });

  if (issues.length > 0) {
    allGood = false;
    console.error(`[FAIL] ${f}: ${issues.join(', ')}`);
  } else {
    console.log(`[PASS] ${f}`);
  }
});

if (allGood) {
  console.log(`\nPERFECT! All ${files.length} pages passed 100% of 2-tier header, logo, images, and link checks.`);
} else {
  console.error('\nSome pages had issues!');
  process.exit(1);
}
