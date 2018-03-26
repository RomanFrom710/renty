import scanOnliner from './scanners/onliner-scanner';

async function scan() {
  try {
    const urls = await scanOnliner();
    console.log(urls);
  } catch(err) {
    console.error(err);
  }
}

scan();
