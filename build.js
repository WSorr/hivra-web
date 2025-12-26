const fs = require('fs');
const path = require('path');

// Очистка dist
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');
fs.mkdirSync('dist/assets');
fs.mkdirSync(path.join('dist/assets', 'css'));
fs.mkdirSync(path.join('dist/assets', 'js'));
fs.mkdirSync(path.join('dist/assets', 'img'));

// Копирование статики из public
if (fs.existsSync('public')) {
  const publicFiles = fs.readdirSync('public');
  publicFiles.forEach(file => {
    fs.copyFileSync(
      path.join('public', file),
      path.join('dist', file)
    );
  });
}

// Копирование assets
function copyAssets(src, dest) {
  if (fs.existsSync(src)) {
    const items = fs.readdirSync(src, { withFileTypes: true });
    items.forEach(item => {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      
      if (item.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyAssets(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }
}

// Копируем изображения
copyAssets('src/assets/img', 'dist/assets/img');

// Обработка HTML (абсолютные пути для VPS)
let htmlContent = fs.readFileSync('src/index.html', 'utf8');
htmlContent = htmlContent.replace(/\.\/assets\//g, '/assets/');
fs.writeFileSync('dist/index.html', htmlContent);

// Обработка CSS (копируем как есть)
if (fs.existsSync('src/assets/css/style.css')) {
  fs.copyFileSync(
    'src/assets/css/style.css',
    'dist/assets/css/style.css'
  );
}

// Обработка JS (копируем как есть)
if (fs.existsSync('src/assets/js/timer.js')) {
  fs.copyFileSync(
    'src/assets/js/timer.js',
    'dist/assets/js/timer.js'
  );
}

// Создаем специальную версию для GitHub Pages
let htmlPagesContent = fs.readFileSync('src/index.html', 'utf8');
htmlPagesContent = htmlPagesContent.replace(/\/assets\//g, './assets/');
if (!fs.existsSync('dist-pages')) {
  fs.mkdirSync('dist-pages');
  fs.mkdirSync('dist-pages/assets');
  fs.mkdirSync(path.join('dist-pages/assets', 'css'));
  fs.mkdirSync(path.join('dist-pages/assets', 'js'));
  fs.mkdirSync(path.join('dist-pages/assets', 'img'));
}

// Копируем все для pages
fs.copyFileSync('dist/index.html', 'dist-pages/index.html');
fs.writeFileSync('dist-pages/index.html', htmlPagesContent);
copyAssets('dist/assets', 'dist-pages/assets');

// Копируем public файлы для pages
if (fs.existsSync('public')) {
  const publicFiles = fs.readdirSync('public');
  publicFiles.forEach(file => {
    fs.copyFileSync(
      path.join('public', file),
      path.join('dist-pages', file)
    );
  });
}

console.log('Build completed successfully!');
console.log('- dist/ for VPS (absolute paths)');
console.log('- dist-pages/ for GitHub Pages (relative paths)');
