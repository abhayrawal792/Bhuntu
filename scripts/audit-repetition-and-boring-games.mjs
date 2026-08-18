import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8');
const pageDir = path.join(root, 'src/pages');
const componentDir = path.join(root, 'src/components');
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route, component], index) => ({ route, component, registeredOrder: index + 1 }));
const pageFiles = new Map(fs.readdirSync(pageDir).filter((file) => file.endsWith('.jsx')).map((file) => [file.replace(/\.jsx$/, ''), path.join(pageDir, file)]));
const roomSequence = [...fs.readFileSync(path.join(root, 'src/data/roomSequence.js'), 'utf8').matchAll(/"([^"]+)"/g)].map(([, route]) => route);
const sequenceIndex = new Map(roomSequence.map((route, index) => [route, index + 1]));

const cache = new Map();
function resolveLocal(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  for (const candidate of [base, `${base}.jsx`, `${base}.js`, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.jsx'), path.join(base, 'index.js')]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}
const sharedShellFiles = new Set(['Navbar.jsx', 'PageFooter.jsx', 'PersonalGiftLayer.jsx', 'AudioController.jsx', 'RouteGuard.jsx', 'EasterEggModal.jsx']);
function collectSource(file, visited = new Set(), includeRoot = true) {
  if (!file || visited.has(file)) return { text: '', files: [] };
  visited.add(file);
  if (!cache.has(file)) cache.set(file, fs.readFileSync(file, 'utf8'));
  const source = cache.get(file);
  const baseName = path.basename(file);
  const isSharedShell = sharedShellFiles.has(baseName);
  let text = includeRoot && !isSharedShell ? source : '';
  const files = includeRoot && !isSharedShell ? [file] : [];
  for (const [, specifier] of source.matchAll(/from\s+['"](\.\.\/[^'"]+|\.\/[^'"]+)['"]/g)) {
    const dependency = resolveLocal(file, specifier);
    if (dependency && dependency.endsWith('.jsx')) {
      const child = collectSource(dependency, visited, true);
      text += `\n${child.text}`;
      files.push(...child.files);
    }
  }
  return { text, files: [...new Set(files)] };
}
function count(text, regex) { return (text.match(regex) || []).length; }
function classify(source, route, component, registeredOrder) {
  source = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');
  const lower = source.toLowerCase();
  const signals = [];
  if (/\broulette\b|spin\s+the\s+bottle|spin\s*[-_]?(?:the[-_])?wheel|spinWheel|wheel\s+of\s+fortune|wheelRef|rouletteWheel|setWheelRotation/i.test(source)) signals.push('roulette-or-spin');
  if (/scratch\s*(?:card|off|memory|gallery|surprise)|foil\s*reveal|scratchCard/i.test(source)) signals.push('scratch-reveal');
  if (/memory\s*match|matching\s*cards|flipCard|setFlipped|pairsFound|isFlipped/i.test(source)) signals.push('flip-or-match');
  if (/quiz|trivia|two\s+truths|personality|question/i.test(`${route} ${component}`) || /questionIndex|currentQuestion|correctAnswer|quizScore/i.test(source)) signals.push('quiz-or-question');
  if (/puzzle|jigsaw|crossword|wordle|jumble|tetris|maze|tangram|anagram/i.test(`${route} ${component}`) || /puzzlePieces|gridSize|selectedCell|isSolved|currentWord/i.test(source)) signals.push('puzzle');
  if (/catcher|arcade|tictactoe|bubble[- ]?pop|balloon[- ]?pop|whack/i.test(`${route} ${component}`) || /fallingHearts|targetPosition|catchScore|popCount/i.test(source)) signals.push('arcade-or-catch');
  if (/canvas|painter|draw|doodle|pixel[- ]?art/i.test(`${route} ${component}`) || /canvasRef|drawImage|pointermove|paintedPixels/i.test(source)) signals.push('draw-or-decorate');
  if (/audio|soundboard|karaoke|piano|rhythm|drum|music/i.test(`${route} ${component}`) || /AudioContext|new\s+Audio|playTone|beatIndex/i.test(source)) signals.push('audio-or-music');
  if (/oracle|fortune|tarot|magic[- ]?8|generator/i.test(`${route} ${component}`) || /Math\.random\(\)|randomChoice|randomIndex|generateRandom/i.test(source)) signals.push('random-or-generator');
  if (/timeline|milestone|journey|map|passport|travel/i.test(`${route} ${component}`) || /timelineItems|milestones|mapPoints/i.test(source)) signals.push('journey-or-timeline');
  if (/letter|archive|open[- ]?when|envelope|message|bottle|note/i.test(`${route} ${component}`) || /letters|notes|messageText|openWhen/i.test(source)) signals.push('letter-or-note');
  if (/gallery|photo|polaroid|film|video|memory|scrapbook/i.test(`${route} ${component}`) || /<img|<video|photoItems|memoryFrames/i.test(source)) signals.push('photo-or-memory');
  if (/builder|decorator|customizer|customise|customize|lab|studio/i.test(`${route} ${component}`) || /selectedColor|selectedIngredient|customText|previewStyle/i.test(source)) signals.push('builder-or-studio');
  if (/promise|bouquet|compliment|gift|surprise|wish|heart|love/i.test(`${route} ${component}`) || /reveal|isOpen|setRevealed|unlocked/i.test(source)) signals.push('romantic-reveal');
  const interactionIdea = signals.find((signal) => ['roulette-or-spin','scratch-reveal','flip-or-match','quiz-or-question','puzzle','arcade-or-catch','draw-or-decorate','audio-or-music','random-or-generator','journey-or-timeline','letter-or-note','photo-or-memory','builder-or-studio'].includes(signal)) || 'romantic-reveal';
  const visual = [
    count(source, /grid-cols-|grid-template|display:\s*grid/g) > 0 ? 'grid' : 'no-grid',
    count(source, /flex|items-center|justify-between/g) > 4 ? 'flex-layout' : 'simple-layout',
    count(source, /rounded-(?:\[|2xl|3xl|full)/g) > 3 ? 'rounded-cards' : 'flat-cards',
    count(source, /bg-gradient|linear-gradient|radial-gradient/g) > 0 ? 'gradient' : 'solid',
    count(source, /<img|<video/g) >= 3 ? 'photo-led' : count(source, /<img|<video/g) > 0 ? 'single-media' : 'text-led',
  ].join('|');
  const interactionShape = [
    count(source, /onClick=/g) >= 8 ? 'many-buttons' : count(source, /onClick=/g) >= 3 ? 'several-buttons' : count(source, /onClick=/g) > 0 ? 'single-interaction' : 'no-click',
    /set[A-Z][A-Za-z]*\(/.test(source) ? 'local-state' : 'static',
    /Math\.random|random\(/i.test(source) ? 'random-output' : 'deterministic',
    /rotate|transform.*rotate|drag|pointermove|mousemove|touchmove/i.test(source) ? 'motion-or-gesture' : 'tap-or-click',
  ].join('|');
  const boringReasons = [];
  if (signals.includes('roulette-or-spin')) boringReasons.push('roulette/spin mechanic');
  if (signals.includes('scratch-reveal')) boringReasons.push('scratch/foil mechanic');
  if (signals.includes('flip-or-match')) boringReasons.push('flip/match mechanic');
  if (signals.includes('random-or-generator')) boringReasons.push('random/generator output');
  if (signals.includes('arcade-or-catch')) boringReasons.push('arcade/catch mechanic');
  if (signals.includes('puzzle') && !/memory|story|timeline|letter|personal|abu|samjhana|bhuntu|sanzu/i.test(source)) boringReasons.push('generic puzzle signal');
  if (count(source, /<img|<video/g) === 0 && count(source, /onClick=/g) <= 1) boringReasons.push('single-action low-media page');
  const localFiles = collectSource(pageFiles.get(component) || '', new Set(), true).files;
  const sharedPrimary = localFiles.find((file) => file.includes('/src/components/'))?.split('/').pop()?.replace(/\.(jsx|js)$/, '') || 'page-specific JSX';
  return {
    route, component, registeredOrder, sequenceOrder: sequenceIndex.get(route) || '', inSequence: sequenceIndex.has(route), sourceBytes: Buffer.byteLength(source), filesScanned: localFiles.length,
    interactionIdea, visual, interactionShape, sharedPrimary, signals: signals.join('|'), boringReasons: boringReasons.join('|'),
    images: count(source, /<img|<video/g), buttons: count(source, /<button/g), clicks: count(source, /onClick=/g), randomCalls: count(source, /Math\.random|random\(/gi), stateCalls: count(source, /useState\(/g), rotates: count(source, /rotate|transform.*rotate/gi),
  };
}
const rows = routes.map(({ route, component, registeredOrder }) => classify(collectSource(pageFiles.get(component) || '').text, route, component, registeredOrder));
function groupsBy(key) { return Object.entries(Object.groupBy(rows, (row) => row[key])).filter(([, group]) => group.length > 1).sort((a, b) => b[1].length - a[1].length); }
const sharedGroups = groupsBy('sharedPrimary');
const interactionGroups = groupsBy('interactionIdea');
const uiGroups = groupsBy('visual');
const shapeGroups = groupsBy('interactionShape');
const boring = rows.filter((row) => row.boringReasons);
const roulette = rows.filter((row) => row.signals.includes('roulette-or-spin'));
const games = rows.filter((row) => row.signals.match(/roulette-or-spin|scratch-reveal|flip-or-match|quiz-or-question|puzzle|arcade-or-catch|draw-or-decorate|audio-or-music/));
const csvHeader = ['registeredOrder','sequenceOrder','inSequence','route','component','sourceBytes','filesScanned','sharedPrimary','interactionIdea','visual','interactionShape','signals','boringReasons','images','buttons','clicks','randomCalls','stateCalls','rotates'];
const esc = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
fs.writeFileSync(path.join(root, 'audit/repetition_and_boring_games.csv'), `${csvHeader.join(',')}\n${rows.map((row) => csvHeader.map((key) => esc(row[key])).join(',')).join('\n')}\n`);
function renderGroups(title, groups, limit = 30) {
  return `## ${title}\n\n${groups.slice(0, limit).map(([key, group]) => `### ${key} (${group.length} pages)\n\n${group.map((row) => `- page ${row.sequenceOrder || row.registeredOrder}: ${row.route} — ${row.component}`).join('\n')}`).join('\n\n') || 'No repeated groups detected.'}\n`;
}
const report = `# Repetition and Boring-Game Audit\n\nThis code audit scans every registered route and recursively follows its local page/component imports. It distinguishes exact source duplication from repeated UI archetypes and repeated interaction ideas.\n\n| Measure | Count |\n|---|---:|\n| Registered routes | ${rows.length} |\n| Sequential routes | ${rows.filter((row) => row.inSequence).length} |\n| Shared primary-component groups | ${sharedGroups.length} |\n| Repeated interaction-idea groups | ${interactionGroups.length} |\n| Repeated visual-archetype groups | ${uiGroups.length} |\n| Repeated interaction-shape groups | ${shapeGroups.length} |\n| Pages flagged boring or generic | ${boring.length} |\n| Roulette/spin pages | ${roulette.length} |\n| Game-like pages detected | ${games.length} |\n\n## Immediate removal queue\n\n${boring.map((row) => `- page ${row.sequenceOrder || row.registeredOrder}: **${row.route}** (${row.component}) — ${row.boringReasons}`).join('\n') || 'No pages flagged.'}\n\n## Roulette and spin queue\n\n${roulette.map((row) => `- page ${row.sequenceOrder || row.registeredOrder}: **${row.route}** (${row.component})`).join('\n') || 'No roulette/spin pages detected.'}\n\n${renderGroups('Shared underlying components', sharedGroups)}\n${renderGroups('Repeated interaction ideas', interactionGroups)}\n${renderGroups('Repeated visual archetypes', uiGroups)}\n${renderGroups('Repeated interaction shapes', shapeGroups)}\n\n## Game-like pages\n\n${games.map((row) => `- page ${row.sequenceOrder || row.registeredOrder}: **${row.route}** — ${row.interactionIdea}; ${row.boringReasons || 'no immediate boring signal'}`).join('\n')}\n`;
fs.writeFileSync(path.join(root, 'audit/repetition_and_boring_games.md'), report);
console.log(JSON.stringify({ registered: rows.length, sequential: rows.filter((row) => row.inSequence).length, sharedPrimaryGroups: sharedGroups.length, repeatedInteractionGroups: interactionGroups.length, repeatedVisualGroups: uiGroups.length, boring: boring.length, roulette: roulette.length, games: games.length, outputs: ['audit/repetition_and_boring_games.csv', 'audit/repetition_and_boring_games.md'] }, null, 2));
