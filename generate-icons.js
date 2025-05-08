import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import png2icons from 'png2icons';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'build/icon.png');
const outDir = path.join(__dirname, 'build/');

await mkdir(outDir, { recursive: true });

const pngBuffer = await readFile(src);

const icoBuffer = png2icons.createICO(pngBuffer, 0, 0, true);
await writeFile(path.join(outDir, 'icon.ico'), icoBuffer);

const icnsBuffer = png2icons.createICNS(pngBuffer, 0, 0);

await writeFile(path.join(outDir, 'icon.icns'), icnsBuffer);

const pngSizes = [16, 24, 32, 48, 64, 128, 256, 512];
await Promise.all(
  pngSizes.map(size =>
    sharp(pngBuffer)
      .resize(size, size)
      .toFile(path.join(outDir, `icon-${size}x${size}.png`))
  )
);
