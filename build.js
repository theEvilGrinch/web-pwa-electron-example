/* eslint-disable no-console */
import { performance } from 'node:perf_hooks';
import path from 'path';
/**
 * @type {import('fs-extra').default}
 */
import fs from 'fs-extra';
import { minify } from 'html-minifier-terser';
import * as sass from 'sass';
import { build } from 'esbuild';
import { projectPaths, config } from './build.config.js';

export async function minifyHTML() {
  try {const files = await fs.readdir(projectPaths.html.srcDir);
    const pages = files.filter((file) => file.endsWith('.html'));
    for (const page of pages) {
      const content = await fs.readFile(path.join(projectPaths.html.srcDir, page), 'utf8');
      const minified = await minify(content, config.html);
      await fs.writeFile(path.join(projectPaths.distDir, page), minified);
    }
    console.log('HTML OK');
  } catch (err) {
    console.error('HTML ERR:', err);
  }}

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
    console.log('JS OK');
  } catch (err) {
    console.error('JS ERR:', err);
  }
}

export async function copyFiles() {
  try {
    await fs.copy(projectPaths.assetsDir, projectPaths.distDir, { overwrite: true} );
    console.log('FILE COPY OK');
  } catch (err) {
    console.error('FILE COPY ERR:', err);
  }
}

export async function runBuild() {
  const start = performance.now();
  await fs.emptyDir(projectPaths.distDir);

  await Promise.all([minifyHTML(), bundleJs(), copyFiles(), compileSass()]);
  const duration = (performance.now() - start) / 1000;
  console.log(`Tasks execution time: ${duration.toFixed(2)} s.`);
}

runBuild().catch((err) => console.error('BUILD ERR:', err));
