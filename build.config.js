import path from 'path';
import {fileURLToPath} from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export const projectPaths = {
  srcDir: path.join(rootDir, 'src'),
  distDir: path.join(rootDir, 'dist'),
  assetsDir: path.join(rootDir, 'assets'),
  html: {
    index: path.join(rootDir, 'src', 'index.html'),
    srcDir: path.join(rootDir, 'src')
  },
  styles: {
    src: path.join(rootDir, 'src', 'styles', 'main.scss'),
    srcDir: path.join(rootDir, 'src', 'styles'),
    dist: path.join(rootDir, 'dist', 'main.css')
  },
  js: {
    src: path.join(rootDir, 'src', 'main.js'),
    dist: path.join(rootDir, 'dist', 'main.js')
  },
  images: {
    srcDir: path.join(rootDir, 'assets', 'img'),
    distDir: path.join(rootDir, 'dist')
  }
};

export const config = {
  html: {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: {compress: {expression: false, sequences: false}},
    processScripts: ['application/ld+json'],
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  },
  sass: {
    style: 'compressed',
    sourceMap: false
  },

  esbuild: {
    entryPoints: [projectPaths.js.src],
    outdir: projectPaths.distDir,
    minify: true,
    bundle: false,
    format: 'esm',
    sourcemap: false
  },
  images: {
    jpeg: {quality: 75, mozjpeg: true},
    png: {quality: 75, compressionLevel: 9},
    webp: {quality: 75},
    avif: {quality: 70, effort: 5}
  }
};