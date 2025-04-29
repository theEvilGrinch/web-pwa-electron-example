/* eslint-disable */
import {performance} from 'node:perf_hooks';
import path from 'path';
/**
 * @type {import('fs-extra').default}
 */
import fs from 'fs-extra';
import {minify} from 'html-minifier-terser';
import sharp from 'sharp';
import {optimize} from 'svgo';
import * as sass from 'sass';
import {build} from 'esbuild';
import {projectPaths, config} from './build.config.js';

export async function minifyHTML() {
  try {
    const files = await fs.readdir(projectPaths.html.srcDir);
    const pages = files.filter(file => file.endsWith('.html'));
    for (const page of pages) {
      const content = await fs.readFile(path.join(projectPaths.html.srcDir, page), 'utf8');
      const minified = await minify(content, config.html);
      await fs.writeFile(path.join(projectPaths.distDir, page), minified);
    }
    console.log('HTML OK');
  } catch (err) {
    console.error('HTML ERR:', err);
  }
}

export async function optimizeImages() {
  await fs.mkdirp(projectPaths.images.distDir, {recursive: true});
  const files = await fs.readdir(projectPaths.images.srcDir);

  await Promise.all(files.map(async (file) => {
    const input = path.join(projectPaths.images.srcDir, file);
    const output = path.join(projectPaths.images.distDir, file);
    const ext = path.extname(file).toLowerCase();
    try {
      if (['.jpg', '.jpeg'].includes(ext)) {
        await sharp(input).jpeg(config.images.jpeg).toFile(output);
      } else if (ext === '.png') {
        await sharp(input).png(config.images.png).toFile(output);
      } else if (ext === '.webp') {
        await sharp(input).webp(config.images.webp).toFile(output);
      } else if (ext === '.avif') {
        await sharp(input).avif(config.images.avif).toFile(output);
      } else if (ext === '.svg') {
        const svgContent = await fs.readFile(input, 'utf8');
        const optimizedSvg = optimize(svgContent).data;
        await fs.writeFile(output, optimizedSvg);
      } else {
        await fs.copy(input, output);
      }
    } catch (err) {
      console.error(`IMG ERR: ${file}:`, err);
    }
  }));
  console.log(`IMG OK | Optimized ${files.length} img`);
}

export async function compileSass() {
  try {
    const result = sass.compile(projectPaths.styles.src, config.sass);
    await fs.writeFile(projectPaths.styles.dist, result.css);
    console.log('SASS OK');
  } catch (err) {
    console.error('SASS ERR:', err);
  }
}

export async function bundleJs() {
  try {
    await build(config.esbuild);
    await updateSWCacheName();
    console.log('JS OK');
  } catch (err) {
    console.error('JS ERR:', err);
  }
}

export async function updateSWCacheName() {
  const swTimestamp = Date.now();
  const swFile = fs.readFileSync(projectPaths.js.distSW, 'utf8')
  const swContent = swFile.replace('__swTimestamp__', swTimestamp)
  fs.writeFileSync(projectPaths.js.distSW, swContent)
}

export async function copyFiles() {
  try {
    await fs.copy(projectPaths.assetsDir, projectPaths.distDir, {
      overwrite: true, ensureDir: true, filter: (src) => {
        const rel = path.relative(projectPaths.assetsDir, src);
        const parts = rel.split(path.sep);
        return parts[0] !== path.parse(projectPaths.images.srcDir).base;
      }
    });
    console.log('FILE COPY OK');
  } catch (err) {
    console.error('FILE COPY ERR:', err);
  }
}

// Copy all files and folders from assets
// export async function copyFiles() {
//   try {
//     await fs.copy(projectPaths.assetsDir, projectPaths.distDir, {overwrite: true, ensureDir: true}
//     );
//     console.log('FILE COPY OK');
//   } catch (err) {
//     console.error('FILE COPY ERR:', err);
//   }
// }

export async function runBuild() {
  const start = performance.now();
  await fs.emptyDir(projectPaths.distDir);

  await Promise.all([minifyHTML(), bundleJs(), copyFiles(), compileSass(),]);
  await optimizeImages()
  const duration = (performance.now() - start) / 1000;
  console.log(`Tasks execution time: ${duration.toFixed(2)} s.`);
}

runBuild().catch(err => console.error('BUILD ERR:', err));