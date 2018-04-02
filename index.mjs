import scanOnliner from './src/scanners/onliner-scanner';
import parseOnliner from './src/parsers/onliner-parser';

async function scan() {
  try {
    const urls = await scanOnliner();
    const info = await parseOnliner(urls[0]);
    console.log(info);
  } catch (err) {
    console.error(err);
  }
}

scan();
