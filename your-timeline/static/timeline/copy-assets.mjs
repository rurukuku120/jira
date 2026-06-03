import { mkdirSync, copyFileSync } from 'fs';

// dist 폴더로 정적 자산 복사 (esbuild는 JS 번들만 처리)
mkdirSync('dist', { recursive: true });
copyFileSync('src/index.html', 'dist/index.html');
copyFileSync('src/styles.css', 'dist/styles.css');
copyFileSync('src/icon.svg', 'dist/icon.svg');
console.log('copied index.html, styles.css, icon.svg -> dist/');
