/* eslint-disable no-console */
import {watch} from 'fs';
import {bundleJs, minifyHTML, compileSass} from './build.js';
import {projectPaths} from './build.config.js';

async function watchFiles() {
  const watchList = [
    {path: projectPaths.styles.srcDir, action: compileSass, label: 'SASS'},
    {path: projectPaths.html.index, action: minifyHTML, label: 'HTML'},
    {path: projectPaths.js.src, action: bundleJs, label: 'JS'}
  ];
  const lastEvent = new Map();
  watchList.forEach(({path: watchPath, action, label}) => {
    watch(watchPath, {recursive: true}, async (eventType, filename) => {
      const now = Date.now();
      if (lastEvent.has(label) && now - lastEvent.get(label) < 100) {return;}
      if (!filename || eventType !== 'change' || filename.includes('~')) {return;}
      lastEvent.set(label, now);
      try {
        await action(filename);
      } catch (err) {
        console.error(`WATCH ${label} ERR:`, err);
      }
    });

  });
}

watchFiles().catch((error) => console.log(error));
