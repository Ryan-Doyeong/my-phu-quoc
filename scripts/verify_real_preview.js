const http = require('http');

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => reject(err));
  });
}

async function run() {
  console.log('=== [1] Verifying Routes & Status Codes ===');
  const routes = [
    '/',
    '/ko',
    '/zones/sunset-town',
    '/ko/zones/sunset-town',
    '/zones/khem-beach',
    '/ko/zones/khem-beach',
    '/directory/dining',
    '/ko/directory/dining',
    '/directory/bars',
    '/ko/directory/bars',
    '/directory/hotels',
    '/ko/directory/hotels',
    '/directory/shopping',
    '/ko/directory/shopping',
    '/directory/wellness',
    '/ko/directory/wellness',
    '/directory/activities',
    '/ko/directory/activities',
    '/directory/beaches',
    '/ko/directory/beaches',
    '/directory/banking',
    '/ko/directory/banking',
    '/directory/essentials',
    '/ko/directory/essentials',
    '/directory/transport',
    '/ko/directory/transport',
    '/directory/dining?zone=sunset-town',
    '/directory/dining?zone=khem-beach',
    '/directory/dining?zone=sorrento',
    '/sitemap.xml'
  ];

  let failedCount = 0;
  for (const r of routes) {
    try {
      const res = await fetchUrl(r);
      if (res.statusCode === 200) {
        console.log(`✓ [200 OK] ${r}`);
      } else {
        console.error(`✗ [${res.statusCode}] ${r}`);
        failedCount++;
      }
    } catch (e) {
      console.error(`✗ [ERROR] ${r}:`, e.message);
      failedCount++;
    }
  }

  console.log('\n=== [2] Checking Canonical URLs & Hreflang on Zone Pages ===');
  const sunsetKo = await fetchUrl('/ko/zones/sunset-town');
  const canonicalMatchSunset = sunsetKo.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  console.log('Sunset Town /ko Canonical:', canonicalMatchSunset ? canonicalMatchSunset[1] : 'NOT FOUND');

  const khemKo = await fetchUrl('/ko/zones/khem-beach');
  const canonicalMatchKhem = khemKo.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  console.log('Khem Beach /ko Canonical:', canonicalMatchKhem ? canonicalMatchKhem[1] : 'NOT FOUND');

  // Check query param canonical
  const queryParamRes = await fetchUrl('/directory/dining?zone=sorrento');
  const queryCanonical = queryParamRes.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  console.log('?zone=sorrento Canonical (must be clean /directory/dining):', queryCanonical ? queryCanonical[1] : 'NOT FOUND');

  // Check hreflang on zone page
  const hreflangMatches = [...sunsetKo.body.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi)];
  console.log(`Hreflang count on /ko/zones/sunset-town: ${hreflangMatches.length}`);
  hreflangMatches.forEach(m => console.log(`  - ${m[1]}: ${m[2]}`));

  // Check structured data
  const hasTouristDest = sunsetKo.body.includes('TouristDestination');
  console.log('Structured data TouristDestination present on Sunset Town:', hasTouristDest);

  // Check sitemap contains zone pages
  const sitemapRes = await fetchUrl('/sitemap.xml');
  const hasSunsetSitemap = sitemapRes.body.includes('/zones/sunset-town');
  const hasKhemSitemap = sitemapRes.body.includes('/zones/khem-beach');
  const hasTransportSitemap = sitemapRes.body.includes('/directory/transport');
  console.log('Sitemap contains /zones/sunset-town:', hasSunsetSitemap);
  console.log('Sitemap contains /zones/khem-beach:', hasKhemSitemap);
  console.log('Sitemap contains /directory/transport:', hasTransportSitemap);

  if (failedCount === 0 && hasSunsetSitemap && hasKhemSitemap && hasTouristDest) {
    console.log('\n🎉 ALL CHECKS PASSED PERFECTLY!');
  } else {
    console.log(`\n⚠️ FAILED CHECKS: ${failedCount}`);
  }
}

run();
