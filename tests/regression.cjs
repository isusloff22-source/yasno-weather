const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const sw = fs.readFileSync('sw.js', 'utf8');
function extract(name) {
  const start = html.indexOf('async function ' + name + '(');
  assert.ok(start >= 0, name);
  const end = html.indexOf('\n}', start) + 2;
  return html.slice(start, end);
}
async function main() {
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    new vm.Script(match[1]);
  }
  new vm.Script(sw);
  new vm.Script(fs.readFileSync('moon-times.js', 'utf8'));
  const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
  for (const icon of manifest.icons) assert.ok(fs.existsSync(icon.src));
  console.log('PASS JavaScript syntax and manifest assets');

  const loads = [];
  let release;
  const ctx = vm.createContext({
    q: {value: 'City A', focus() {}}, locationIntent: 0,
    state: {ctrl: null}, hideErr() {}, hidePickBar() {},
    goBtn: {}, t: x => x,
    geocode: async () => ({items: [{name: 'City A', lat: 1, lon: 1}]}),
    canon: p => p.name,
    enrichPlaceNames: () => new Promise(resolve => { release = resolve; }),
    loadWeather: (...args) => loads.push(args), toast() {}
  });
  vm.runInContext(extract('submitSearch'), ctx);
  const pending = ctx.submitSearch();
  await new Promise(resolve => setImmediate(resolve));
  ctx.locationIntent++;
  release();
  await pending;
  assert.equal(loads.length, 0, 'stale enrichment must not load weather');
  console.log('PASS stale search cannot override newer location');

  for (const invalidPayload of [false, true]) {
    let restores = 0, warnings = 0, blocking = 0;
    const weather = vm.createContext({
      locationIntent: 1, state: {}, validPlace: () => true, AbortController,
      fetchRetry: async () => {
        if (!invalidPayload) throw new Error('Service unavailable');
        return {json: async () => ({error: true})};
      },
      validWeather: () => false,
      restoreWeatherCache: () => { restores++; return true; },
      showErr: () => warnings++, t: x => x,
      showWeatherErrorScreen: () => blocking++,
      hasInternetConnection: () => { throw new Error('Should use cache first'); }
    });
    vm.runInContext(extract('loadWeather'), weather);
    await weather.loadWeather({lat: 1, lon: 1}, 1);
    assert.equal(restores, 1);
    assert.equal(warnings, 1);
    assert.equal(blocking, 0);
  }
  console.log('PASS network and invalid-payload errors preserve matching cache');

  let response, cached;
  const worker = vm.createContext({
    URL, self: {registration: {scope: 'https://example.test/yasno/'}, addEventListener() {}},
    fetch: async () => response,
    caches: {open: async () => ({match: async () => cached, put: async () => {}})}
  });
  vm.runInContext(sw, worker);
  for (const status of [502, 503, 504]) {
    response = {status, ok: false}; cached = {status: 200};
    for (const name of ['networkFirstHtml', 'navigationWithOfflineFallback']) {
      assert.equal(await worker[name]({url: 'https://example.test/yasno/index.html'}), cached);
      cached = undefined;
      assert.equal(await worker[name]({url: 'https://example.test/yasno/index.html'}), response);
      cached = {status: 200};
    }
  }
  response = {status: 404, ok: false};
  assert.equal(await worker.networkFirstHtml({url: 'https://example.test/yasno/index.html'}), response);
  console.log('PASS service-worker transient HTTP fallback and uncached/404 behavior');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
