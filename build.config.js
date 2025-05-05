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
    srcSW: path.join(rootDir, 'src', 'service-worker.js'),
    dist: path.join(rootDir, 'dist', 'main.js'),
    distSW: path.join(rootDir, 'dist', 'service-worker.js')
  },
  images: {
    srcDir: path.join(rootDir, 'assets', 'img'),
    distDir: path.join(rootDir, 'dist')
  }
};

export const config = {
  browserSync: {
    // proxy: 'myDomain.local', // If you use a local server
    files: [
      // `${projectPaths.distDir}/**/*.{html,css,js}`,
      // `!${projectPaths.images.distDir}/**/*` // exclude image tracking
    ], // Pattern to watch for file changes in the dist directory (HTML, CSS, JS)
    // server: projectPaths.distDir,
    server: {
      baseDir: projectPaths.distDir,
      middleware: [(req, res, next) => {
        if (req.url.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        next();
      }]
    },
    // browser: 'firefox-developer-edition',
    browser: 'chromium',
    // browser: './open-incognito-chromium.zsh',
    // browser: './open-incognito-firefox.zsh',
    // open: 'external', // Use external command to open browser (e.g. custom script)
    injectChanges: true,
    // logLevel: 'debug',
    notify: false
    // Configuration for injecting the BrowserSync snippet into HTML files
    // snippetOptions: {
    //   rule: {
    //     match: /<\/head>/i, // Match the closing </head> tag
    //     fn: function(snippet, match) {
    //       return snippet + match; // Inject the snippet before the closing </head> tag
    //     }
    //   }
    // }
  },

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
    entryPoints: [projectPaths.js.src, projectPaths.js.srcSW],
    outdir: projectPaths.distDir,
    minify: true,
    bundle: false,
    format: 'esm',
    sourcemap: false,
    define: {
      DEV_MODE: JSON.stringify(process.env.NODE_ENV === 'development')
    },
    drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger']
  },
  images: {
    jpeg: {quality: 75, mozjpeg: true},
    png: {quality: 75, compressionLevel: 9},
    webp: {quality: 75},
    avif: {quality: 70, effort: 5}
  }
};