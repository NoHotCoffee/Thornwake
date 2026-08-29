/* ============================ ICON HELPER ============================ */
function icon(id, cls){ return `<svg class="glyph ${cls||''}" viewBox="0 0 24 24"><use href="#g-${id}"></use></svg>`; }

/* ============================ DATA ============================ */
const XP_K = 45, XP_P = 1.85;
function xpForLevel(lvl){ return Math.floor(XP_K * Math.pow(lvl, XP_P)); }
const LEVEL_TOTALS = [0];
for(let l=1; l<=99; l++){ LEVEL_TOTALS.push(LEVEL_TOTALS[l-1] + xpForLevel(l)); }
function levelFromTotalXp(xp){
  let lvl = 1;
  for(let l=1; l<=99; l++){ if(xp >= LEVEL_TOTALS[l]) lvl = l+1; else break; }
  return Math.min(lvl, 99);
}
function xpProgress(xp){
  const lvl = levelFromTotalXp(xp);
  if(lvl >= 99) return {lvl, pct:100, cur:0, need:0};
  const base = LEVEL_TOTALS[lvl-1], next = LEVEL_TOTALS[lvl];
  return {lvl, pct: Math.floor(((xp-base)/(next-base))*100), cur: xp-base, need: next-base};
}

const RESOURCE_ITEMS = {
  birchLog:{name:'Birch Log', icon:'log'}, oakLog:{name:'Oak Log', icon:'log'},
  willowLog:{name:'Willow Log', icon:'log'}, yewLog:{name:'Yew Log', icon:'log'},
  ashwoodLog:{name:'Ashwood Log', icon:'log'}, elderwoodLog:{name:'Elderwood Log', icon:'log'},
  copperOre:{name:'Copper Ore', icon:'ore'}, ironOre:{name:'Iron Ore', icon:'ore'},
  silverOre:{name:'Silver Ore', icon:'ore'}, goldOre:{name:'Gold Ore', icon:'ore'},
  mythrilOre:{name:'Mythril Ore', icon:'ore'}, adamantOre:{name:'Adamant Ore', icon:'ore'},
  minnow:{name:'Minnow', icon:'fish'}, trout:{name:'Trout', icon:'fish'},
  bass:{name:'Bass', icon:'fish'}, sturgeon:{name:'Sturgeon', icon:'fish'},
  eel:{name:'Eel', icon:'fish'}, leviathan:{name:'Leviathan Carp', icon:'fish'},
  cookedMinnow:{name:'Cooked Minnow', icon:'meal', heal:6},
  cookedTrout:{name:'Cooked Trout', icon:'meal', heal:14},
  cookedBass:{name:'Cooked Bass', icon:'meal', heal:28},
  cookedSturgeon:{name:'Cooked Sturgeon', icon:'meal', heal:48},
  cookedEel:{name:'Cooked Eel', icon:'meal', heal:70},
  cookedLeviathan:{name:'Cooked Leviathan', icon:'meal', heal:100},
  copperBar:{name:'Copper Bar', icon:'bar'}, ironBar:{name:'Iron Bar', icon:'bar'},
  silverBar:{name:'Silver Bar', icon:'bar'}, goldBar:{name:'Gold Bar', icon:'bar'},
  mythrilBar:{name:'Mythril Bar', icon:'bar'}, adamantBar:{name:'Adamant Bar', icon:'bar'},
};

const COOK_RECIPES = [
  {id:'minnow', name:'Minnow', reqLevel:1, xp:3, raw:'minnow', cooked:'cookedMinnow', time:1400},
  {id:'trout', name:'Trout', reqLevel:15, xp:8, raw:'trout', cooked:'cookedTrout', time:1700},
  {id:'bass', name:'Bass', reqLevel:30, xp:15, raw:'bass', cooked:'cookedBass', time:2000},
  {id:'sturgeon', name:'Sturgeon', reqLevel:50, xp:28, raw:'sturgeon', cooked:'cookedSturgeon', time:2300},
  {id:'eel', name:'Eel', reqLevel:65, xp:58, raw:'eel', cooked:'cookedEel', time:2600},
  {id:'leviathan', name:'Leviathan Carp', reqLevel:80, xp:88, raw:'leviathan', cooked:'cookedLeviathan', time:3000},
];

const SMELT_RECIPES = [
  {id:'copper', name:'Copper Bar', reqLevel:1, xp:5, ore:'copperOre', bar:'copperBar', time:1800},
  {id:'iron', name:'Iron Bar', reqLevel:15, xp:12, ore:'ironOre', bar:'ironBar', time:2200},
  {id:'silver', name:'Silver Bar', reqLevel:30, xp:20, ore:'silverOre', bar:'silverBar', time:2600},
  {id:'gold', name:'Gold Bar', reqLevel:50, xp:36, ore:'goldOre', bar:'goldBar', time:3000},
  {id:'mythril', name:'Mythril Bar', reqLevel:65, xp:58, ore:'mythrilOre', bar:'mythrilBar', time:3400},
  {id:'adamant', name:'Adamant Bar', reqLevel:80, xp:88, ore:'adamantOre', bar:'adamantBar', time:3800},
];

const MONSTERS = [
  {id:'rat', name:'Field Rat', icon:'rat', reqLevel:1, maxHp:9, dmgMin:1,dmgMax:2, xp:4, goldMin:1,goldMax:3},
  {id:'goblin', name:'Forest Goblin', icon:'beast', reqLevel:5, maxHp:20, dmgMin:2,dmgMax:4, xp:10, goldMin:3,goldMax:8},
  {id:'skeleton', name:'Cave Skeleton', icon:'skull', reqLevel:10, maxHp:35, dmgMin:3,dmgMax:6, xp:18, goldMin:6,goldMax:14},
  {id:'troll', name:'Bog Troll', icon:'beast', reqLevel:20, maxHp:60, dmgMin:5,dmgMax:9, xp:32, goldMin:12,goldMax:25},
  {id:'golem', name:'Iron Golem', icon:'construct', reqLevel:35, maxHp:100, dmgMin:8,dmgMax:14, xp:55, goldMin:25,goldMax:45},
  {id:'wraith', name:'Dread Wraith', icon:'ghost', reqLevel:50, maxHp:160, dmgMin:12,dmgMax:20, xp:90, goldMin:45,goldMax:80},
  {id:'millrat', name:'Mill Rat', icon:'rat', reqLevel:1, maxHp:10, dmgMin:1,dmgMax:2, xp:4, goldMin:1,goldMax:3},
  {id:'graveWisp', name:'Grave Wisp', icon:'ghost', reqLevel:15, maxHp:30, dmgMin:3,dmgMax:5, xp:16, goldMin:5,goldMax:10},
  {id:'restlessSpirit', name:'Restless Spirit', icon:'ghost', reqLevel:25, maxHp:55, dmgMin:4,dmgMax:8, xp:30, goldMin:10,goldMax:20},
  {id:'bandit', name:'Bandit', icon:'bandit', reqLevel:35, maxHp:85, dmgMin:6,dmgMax:11, xp:48, goldMin:18,goldMax:32},
  {id:'banditCaptain', name:'Bandit Captain', icon:'bandit', reqLevel:45, maxHp:130, dmgMin:9,dmgMax:15, xp:70, goldMin:30,goldMax:55},
  {id:'cryptGhoul', name:'Crypt Ghoul', icon:'ghost', reqLevel:55, maxHp:180, dmgMin:11,dmgMax:18, xp:95, goldMin:40,goldMax:70},
  {id:'cryptWarden', name:'Crypt Warden', icon:'construct', reqLevel:60, maxHp:320, dmgMin:16,dmgMax:26, xp:180, goldMin:100,goldMax:160},
  {id:'frostWight', name:'Frost Wight', icon:'skull', reqLevel:65, maxHp:250, dmgMin:14,dmgMax:22, xp:140, goldMin:70,goldMax:110},
  {id:'revenant', name:'Revenant', icon:'ghost', reqLevel:75, maxHp:380, dmgMin:18,dmgMax:28, xp:210, goldMin:110,goldMax:170},
  {id:'ashDrake', name:'Ash Drake', icon:'dragon', reqLevel:90, maxHp:550, dmgMin:24,dmgMax:38, xp:340, goldMin:180,goldMax:260},
  {id:'infernoLord', name:'Inferno Lord', icon:'dragon', reqLevel:99, maxHp:750, dmgMin:30,dmgMax:48, xp:480, goldMin:260,goldMax:400},
];

const WEAPONS = [
  {id:'rustySword', name:'Rusty Sword', reqLevel:1, atk:2, cost:40},
  {id:'ironSword', name:'Iron Sword', reqLevel:10, atk:6, cost:280},
  {id:'steelSword', name:'Steel Sword', reqLevel:25, atk:14, cost:1200},
  {id:'emberBlade', name:'Ember Blade', reqLevel:45, atk:28, cost:5000},
  {id:'mythrilBlade', name:'Mythril Blade', reqLevel:65, atk:36, forgeOnly:true, bars:{mythrilBar:5}, cost:800, forgeXp:80},
  {id:'adamantGreatsword', name:'Adamant Greatsword', reqLevel:80, atk:52, forgeOnly:true, bars:{adamantBar:8}, cost:2200, forgeXp:120},
  {id:'wardensBlade', name:"Warden's Blade", reqLevel:1, atk:70, questOnly:true, cost:0},
];
const ARMORS = [
  {id:'leatherArmor', name:'Leather Armor', reqLevel:1, def:2, cost:40},
  {id:'ironArmor', name:'Iron Armor', reqLevel:10, def:6, cost:280},
  {id:'steelArmor', name:'Steel Armor', reqLevel:25, def:14, cost:1200},
  {id:'dragonscaleArmor', name:'Dragonscale Armor', reqLevel:45, def:28, cost:5000},
  {id:'mythrilArmor', name:'Mythril Armor', reqLevel:65, def:36, forgeOnly:true, bars:{mythrilBar:5}, cost:800, forgeXp:80},
  {id:'adamantPlate', name:'Adamant Plate', reqLevel:80, def:52, forgeOnly:true, bars:{adamantBar:8}, cost:2200, forgeXp:120},
];
const SELL_PRICES = {
  birchLog:2, oakLog:5, willowLog:10, yewLog:20, ashwoodLog:38, elderwoodLog:60,
  copperOre:3, ironOre:7, silverOre:15, goldOre:30, mythrilOre:55, adamantOre:85,
  minnow:2, trout:5, bass:10, sturgeon:20, eel:35, leviathan:55,
  copperBar:8, ironBar:18, silverBar:32, goldBar:55, mythrilBar:90, adamantBar:140,
};
const SKILL_LABELS = { woodcutting:'Woodcutting', mining:'Mining', fishing:'Fishing', smithing:'Smithing' };
const SKILL_DEFS = [
  {key:'woodcutting', label:'Woodcutting', icon:'axe', accent:'--sk-wood', accentL:'--sk-wood-l', fillClass:'f-wood'},
  {key:'mining', label:'Mining', icon:'pick', accent:'--sk-mine', accentL:'--sk-mine-l', fillClass:'f-mine'},
  {key:'fishing', label:'Fishing', icon:'rod', accent:'--sk-fish', accentL:'--sk-fish-l', fillClass:'f-fish'},
  {key:'cooking', label:'Cooking', icon:'flame', accent:'--sk-cook', accentL:'--sk-cook-l', fillClass:'f-cook'},
  {key:'smithing', label:'Smithing', icon:'hammer', accent:'--sk-smith', accentL:'--sk-smith-l', fillClass:'f-smith'},
];

/* ---- Locations: only these determine what a skill screen offers ---- */
const LOCATIONS = {
  birchwood:{ name:'Birchwood Grove', icon:'tree', type:'gather', skill:'woodcutting', cardv:'wood', fillv:'f-wood',
    desc:'A quiet stand of birch and yew at the forest edge. Axes ring out here from dawn to dusk.',
    nodes:[
      {id:'birch', name:'Birch Tree', reqLevel:1, xp:5, item:'birchLog', time:2200},
      {id:'oak', name:'Oak Tree', reqLevel:15, xp:12, item:'oakLog', time:2800},
      {id:'willow', name:'Willow Tree', reqLevel:30, xp:22, item:'willowLog', time:3400},
      {id:'yew', name:'Yew Tree', reqLevel:50, xp:40, item:'yewLog', time:4000},
    ]},
  quarry:{ name:'Stonevein Quarry', icon:'rock', type:'gather', skill:'mining', cardv:'mine', fillv:'f-mine',
    desc:'A scarred hillside quarry, rich with ore veins running deep into the rock.',
    nodes:[
      {id:'copper', name:'Copper Vein', reqLevel:1, xp:6, item:'copperOre', time:2400},
      {id:'iron', name:'Iron Vein', reqLevel:15, xp:14, item:'ironOre', time:3000},
      {id:'silver', name:'Silver Vein', reqLevel:30, xp:25, item:'silverOre', time:3600},
      {id:'gold', name:'Gold Vein', reqLevel:50, xp:45, item:'goldOre', time:4200},
    ]},
  silverbrook:{ name:'Silverbrook Shallows', icon:'wave', type:'gather', skill:'fishing', cardv:'fish', fillv:'f-fish',
    desc:'Cold, clear water tumbling down from the highlands, thick with fish.',
    nodes:[
      {id:'minnow', name:'Minnow Shoal', reqLevel:1, xp:5, item:'minnow', time:2000},
      {id:'trout', name:'Trout Stream', reqLevel:15, xp:13, item:'trout', time:2600},
      {id:'bass', name:'Bass Pool', reqLevel:30, xp:24, item:'bass', time:3200},
      {id:'sturgeon', name:'Sturgeon Deep', reqLevel:50, xp:42, item:'sturgeon', time:3800},
    ]},
  deepwoods:{ name:'The Deep Woods', icon:'skull', type:'combat',
    desc:'Tangled and half-lit, home to creatures that would rather you turned back.',
    monsters:['rat','goblin','skeleton','troll','golem','wraith'] },

  frostpine:{ name:'Frostpine Hollow', icon:'tree', type:'gather', skill:'woodcutting', cardv:'wood', fillv:'f-wood',
    desc:'A frost-bitten grove of ancient timber, far tougher than anything at Birchwood.',
    nodes:[
      {id:'ashwood', name:'Ashwood Tree', reqLevel:65, xp:62, item:'ashwoodLog', time:4600},
      {id:'elderwood', name:'Elderwood Tree', reqLevel:80, xp:95, item:'elderwoodLog', time:5200},
    ]},
  cinderdepths:{ name:'Cinder Depths', icon:'rock', type:'gather', skill:'mining', cardv:'mine', fillv:'f-mine',
    desc:'A scorched shaft sunk deep beneath the quarry, veined with rarer metal.',
    nodes:[
      {id:'mythril', name:'Mythril Vein', reqLevel:65, xp:70, item:'mythrilOre', time:4800},
      {id:'adamant', name:'Adamant Vein', reqLevel:80, xp:105, item:'adamantOre', time:5400},
    ]},
  stormcoast:{ name:'Stormcoast Reef', icon:'wave', type:'gather', skill:'fishing', cardv:'fish', fillv:'f-fish',
    desc:'Wind-lashed cliffs above deep water, where the biggest catches lurk.',
    nodes:[
      {id:'eel', name:'Eel Run', reqLevel:65, xp:65, item:'eel', time:4400},
      {id:'leviathan', name:'Leviathan Pool', reqLevel:80, xp:98, item:'leviathan', time:5000},
    ]},
  millersbridge:{ name:"Miller's Bridge", icon:'skull', type:'combat',
    desc:'A stone bridge and grain mill on the road out of town, overrun with vermin.',
    monsters:['millrat'] },
  emberforge:{ name:'The Emberforge', icon:'anvil', type:'smith',
    desc:"Smith Corven's forge, reopened. Smelt ore into bars, then hammer them into gear no shop can sell you. Now worked from the Hearth." },
  widowsvigil:{ name:"Widow's Vigil", icon:'skull', type:'combat',
    desc:'An old graveyard on the hill, wrapped in a cold that has nothing to do with the weather.',
    monsters:['graveWisp','restlessSpirit'] },
  oldwatchtower:{ name:'The Old Watchtower', icon:'skull', type:'combat',
    desc:'A crumbling border tower, seized by bandits preying on the trade road below.',
    monsters:['bandit','banditCaptain'] },
  sunkencrypt:{ name:'Sunken Crypt', icon:'skull', type:'combat',
    desc:'A flooded tomb beneath the watchtower, older than the ruins above it.',
    monsters:['cryptGhoul','cryptWarden'] },
  frostholdruins:{ name:'Frosthold Ruins', icon:'skull', type:'combat',
    desc:'A shattered keep locked in permanent winter, haunted by things that remember dying there.',
    monsters:['frostWight','revenant'] },
  ashenwastes:{ name:'The Ashen Wastes', icon:'skull', type:'combat',
    desc:'A blasted, smoking expanse at the edge of the map. Only the strongest return from here.',
    monsters:['ashDrake','infernoLord'] },
};
const ALWAYS_UNLOCKED = ['birchwood','quarry','silverbrook','deepwoods','frostpine','cinderdepths','stormcoast','millersbridge'];

/* ---- Quests ---- */
const QUESTS = [
  { id:'millers_trouble', name:"The Miller's Trouble",
    desc:"Old Miller Tam says rats have overrun his grain store at Miller's Bridge. Thin the vermin and he'll put in a good word with the town smith.",
    requires:[], objective:{type:'kill', monster:'millrat', count:5, locName:"Miller's Bridge"},
    reward:{gold:60, combatXp:40, unlock:['emberforge'], text:'The Emberforge is open to you.'} },
  { id:'ashes_and_iron', name:'Ashes and Iron',
    desc:'Smith Corven wants proof you can handle his forge before he shares his best recipes. Bring him 5 Copper Bars, smelted at the Emberforge.',
    requires:['millers_trouble'], objective:{type:'deliver', item:'copperBar', count:5},
    reward:{gold:120, skillXp:{smithing:150}, unlock:['widowsvigil'], text:"Widow's Vigil is marked on your map."} },
  { id:'the_vigil', name:'The Vigil',
    desc:"Something restless walks the old graveyard at Widow's Vigil. Put it to rest.",
    requires:['ashes_and_iron'], objective:{type:'kill', monster:'restlessSpirit', count:3, locName:"Widow's Vigil"},
    reward:{gold:220, combatXp:160, unlock:['oldwatchtower'], text:'The road to the Old Watchtower is clear.'} },
  { id:'watch_on_the_ridge', name:'Watch on the Ridge',
    desc:'Bandits have seized the old watchtower and are raiding the trade road. Drive them out.',
    requires:['the_vigil'], objective:{type:'kill', monster:'bandit', count:8, locName:'The Old Watchtower'},
    reward:{gold:340, combatXp:260, unlock:['sunkencrypt'], text:'A crypt has been found beneath the tower.'} },
  { id:'into_the_deep', name:'Into the Deep',
    desc:'Something ancient guards the depths of the Sunken Crypt. Face it, if you dare.',
    requires:['watch_on_the_ridge'], objective:{type:'kill', monster:'cryptWarden', count:1, locName:'Sunken Crypt'},
    reward:{gold:800, combatXp:600, unlock:['frostholdruins','ashenwastes'], item:'wardensBlade', text:"You've earned the Warden's Blade."} },
];

/* ============================ STATE ============================ */
let state = null;
function defaultState(){
  return {
    name:'Adventurer',
    gold: 15,
    hp: 24,
    combatXp: 0,
    skills:{ woodcutting:0, mining:0, fishing:0, cooking:0, smithing:0 },
    inventory:{},
    equipment:{ weapon:null, armor:null },
    location: null,
    killCounts:{},
    completedQuests:[],
    questState:{},
    unlockedLocations: [...ALWAYS_UNLOCKED],
    createdAt: Date.now(),
  };
}
function maxHp(){ const lvl = xpProgress(state.combatXp).lvl; return 20 + lvl*4; }
function atkStat(){
  const lvl = xpProgress(state.combatXp).lvl;
  const w = WEAPONS.find(w=>w.id===state.equipment.weapon);
  return lvl + (w?w.atk:0);
}
function defStat(){
  const lvl = xpProgress(state.combatXp).lvl;
  const a = ARMORS.find(a=>a.id===state.equipment.armor);
  return Math.floor(lvl/2) + (a?a.def:0);
}
function invCount(id){ return state.inventory[id] || 0; }
function addItem(id, n){ state.inventory[id] = (state.inventory[id]||0) + n; }
function isUnlocked(id){ return state.unlockedLocations.includes(id); }

/* ============================ SAVE / LOAD ============================ */
const SAVE_KEY = 'thornwake-save';
let storageMode = 'unknown'; // 'claude' | 'local' | 'memory'
let memoryStore = {};

async function storageSet(key, value){
  if(storageMode === 'claude'){ await window.storage.set(key, value, false); return; }
  if(storageMode === 'local'){ localStorage.setItem(key, value); return; }
  memoryStore[key] = value;
}
async function storageGet(key){
  if(storageMode === 'claude'){
    try{ const res = await window.storage.get(key, false); return res ? res.value : null; }
    catch(e){ return null; }
  }
  if(storageMode === 'local'){ return localStorage.getItem(key); }
  return memoryStore[key] || null;
}
async function detectStorageMode(){
  if(typeof window.storage !== 'undefined' && window.storage && typeof window.storage.set === 'function'){
    try{ await window.storage.set('__thornwake_probe', '1', false); storageMode = 'claude'; return; }
    catch(e){ /* fall through */ }
  }
  try{ localStorage.setItem('__thornwake_probe','1'); localStorage.removeItem('__thornwake_probe'); storageMode = 'local'; return; }
  catch(e){ /* fall through */ }
  storageMode = 'memory';
}

let saveTimer = null;
function queueSave(){ clearTimeout(saveTimer); saveTimer = setTimeout(doSave, 900); }
async function doSave(){
  try{ await storageSet(SAVE_KEY, JSON.stringify(state)); }
  catch(e){
    console.error('save failed', e);
    if(storageMode !== 'memory'){ storageMode = 'memory'; showToast('Saving to device failed - progress will last this session only'); }
  }
}
async function loadGame(){
  await detectStorageMode();
  try{
    const raw = await storageGet(SAVE_KEY);
    if(raw){
      const loaded = JSON.parse(raw);
      state = Object.assign(defaultState(), loaded);
      state.skills = Object.assign({woodcutting:0,mining:0,fishing:0,cooking:0,smithing:0}, loaded.skills||{});
      state.equipment = Object.assign({weapon:null,armor:null}, loaded.equipment||{});
      state.inventory = loaded.inventory || {};
      state.location = loaded.location || null;
      state.killCounts = loaded.killCounts || {};
      state.completedQuests = loaded.completedQuests || [];
      state.questState = loaded.questState || {};
      const merged = new Set([...(loaded.unlockedLocations||['birchwood','quarry','silverbrook','deepwoods']), ...ALWAYS_UNLOCKED]);
      state.unlockedLocations = Array.from(merged);
    } else {
      state = defaultState();
    }
  }catch(e){
    state = defaultState();
  }
  state.hp = Math.min(state.hp, maxHp());
  if(storageMode === 'memory'){ setTimeout(()=>showToast('Progress will only last this session'), 600); }
}

/* ============================ UI HELPERS ============================ */
function showToast(msg){
  const wrap = document.getElementById('toastwrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(()=>t.remove(), 2500);
}
function floatText(container, text, color){
  const f = document.createElement('div');
  f.className = 'floater';
  f.style.color = color || 'var(--ember-light)';
  f.textContent = text;
  container.style.position = 'relative';
  container.appendChild(f);
  setTimeout(()=>f.remove(), 1400);
}
function ringSvg(pct, glyphId, lvl, accentVar, accentLVar){
  const r = 19.5, c = 2*Math.PI*r;
  const off = c - (pct/100)*c;
  return `<div class="ring-wrap">
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle class="ring-bg" cx="25" cy="25" r="${r}"></circle>
      <circle class="ring-fg" cx="25" cy="25" r="${r}" stroke="var(${accentVar})" stroke-dasharray="${c}" stroke-dashoffset="${off}"></circle>
    </svg>
    <div class="ring-tile ch-tile" style="--tile-hi:var(${accentLVar}); --tile-lo:var(${accentVar}); --tile-border:var(${accentVar}); --tile-fg:#241c04;">${icon(glyphId)}</div>
    <div class="ring-lvl" style="--lvl-hi:#ffd28a; --lvl-lo:#d09a2c;">${lvl}</div>
  </div>`;
}
function grantXp(skillKey, amount, label){
  const before = xpProgress(state.skills[skillKey]).lvl;
  state.skills[skillKey] += amount;
  const after = xpProgress(state.skills[skillKey]).lvl;
  if(after > before) showToast(`${label} level up — now level ${after}`);
}
function grantCombatXp(amount){
  const before = xpProgress(state.combatXp).lvl;
  state.combatXp += amount;
  const after = xpProgress(state.combatXp).lvl;
  if(after > before) showToast(`Combat level up — now level ${after}`);
}

/* ============================ NAV ============================ */
let currentScreen = 'town';
let heroOpen = false;
function setScreen(name){
  currentScreen = name;
  heroOpen = false;
  document.getElementById('statusbar').style.display = '';
  document.getElementById('heroheader').classList.remove('show');
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active', b.dataset.screen===name));
  updateAppBg();
  renderAll();
}
function openHero(){
  heroOpen = true;
  document.getElementById('statusbar').style.display = 'none';
  document.getElementById('heroheader').classList.add('show');
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-hero').classList.add('active');
  renderHero();
}
function closeHero(){
  heroOpen = false;
  document.getElementById('statusbar').style.display = '';
  document.getElementById('heroheader').classList.remove('show');
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+currentScreen).classList.add('active');
  renderAll();
}
function updateAppBg(){
  const app = document.getElementById('app');
  app.classList.remove('bg-combat','bg-hearth','bg-shop');
  if(currentScreen === 'cook') app.classList.add('bg-hearth');
  else if(currentScreen === 'shop') app.classList.add('bg-shop');
  else if(currentScreen === 'travel' && state.location && LOCATIONS[state.location] && LOCATIONS[state.location].type === 'combat') app.classList.add('bg-combat');
}

/* ============================ RENDER: STATUS BAR ============================ */
function renderStatus(){
  const cb = xpProgress(state.combatXp);
  document.getElementById('playername').textContent = state.name || 'Adventurer';
  document.getElementById('cblevel').textContent = `CB ${cb.lvl}`;
  document.getElementById('curloc').textContent = state.location && LOCATIONS[state.location] ? LOCATIONS[state.location].name : 'The Hollow of Thornwake';
  document.getElementById('goldval').textContent = state.gold.toLocaleString();
  const mh = maxHp();
  document.getElementById('hpfill').style.width = Math.max(0,(state.hp/mh*100)) + '%';
  document.getElementById('hptext').textContent = `${Math.max(0,state.hp)}/${mh}`;
  document.getElementById('xpfill').style.width = cb.pct + '%';
  document.getElementById('traveldot').classList.toggle('show', !!gatherAction);
  document.getElementById('cookdot').classList.toggle('show', !!cookAction || !!smithAction);
  document.getElementById('questdot').classList.toggle('show', hasClaimableQuest());
}

/* ============================ ACTIVITY BAR (persists across all tabs) ============================ */
function renderActivityBar(){
  const bar = document.getElementById('activitybar');
  const rows = [];
  if(gatherAction){
    const node = gatherAction.node;
    const elapsed = performance.now() - gatherAction.startedAt;
    const pct = Math.min(100, (elapsed/node.time)*100);
    const fillv = LOCATIONS[gatherAction.locationId].fillv;
    rows.push(`<div class="activity-row">
      ${icon(RESOURCE_ITEMS[node.item].icon)}
      <div class="activity-label">${node.name}</div>
      <div class="activity-track bar-trough"><div class="bar-fill ${fillv}" style="width:${pct}%"></div></div>
      <button class="activity-stop" onclick="stopGather(true)">Stop</button>
    </div>`);
  }
  if(cookAction){
    const elapsed = performance.now() - cookAction.startedAt;
    const pct = Math.min(100, (elapsed/cookAction.time)*100);
    rows.push(`<div class="activity-row">
      ${icon('flame')}
      <div class="activity-label">Cooking ${cookAction.name}</div>
      <div class="activity-track bar-trough"><div class="bar-fill f-cook" style="width:${pct}%"></div></div>
      <button class="activity-stop" onclick="stopCook(true)">Stop</button>
    </div>`);
  }
  if(smithAction){
    const elapsed = performance.now() - smithAction.startedAt;
    const pct = Math.min(100, (elapsed/smithAction.time)*100);
    rows.push(`<div class="activity-row">
      ${icon('anvil')}
      <div class="activity-label">Smelting ${smithAction.name}</div>
      <div class="activity-track bar-trough"><div class="bar-fill f-smith" style="width:${pct}%"></div></div>
      <button class="activity-stop" onclick="stopSmelt(true)">Stop</button>
    </div>`);
  }
  bar.style.display = rows.length ? 'block' : 'none';
  bar.innerHTML = rows.join('');
}

/* ============================ RENDER: TOWN ============================ */
function renderTown(){
  const wrap = document.getElementById('townskills');
  const cb = xpProgress(state.combatXp);
  let html = `<div class="card card--combat card-row ${cb.pct>=90?'card--near-max':''}">
    ${ringSvg(cb.pct,'sword',cb.lvl,'--sk-combat','--sk-combat-l')}
    <div class="card-info">
      <div class="card-title">Combat</div>
      <div class="card-sub">${cb.lvl>=99?'MAX LEVEL':cb.cur+' / '+cb.need+' xp'}</div>
    </div>
  </div>`;
  SKILL_DEFS.forEach(d=>{
    const p = xpProgress(state.skills[d.key]);
    html += `<div class="card card--${d.key==='woodcutting'?'wood':d.key==='mining'?'mine':d.key==='fishing'?'fish':d.key==='cooking'?'cook':'smith'} card-row ${p.pct>=90?'card--near-max':''}">
      ${ringSvg(p.pct, d.icon, p.lvl, d.accent, d.accentL)}
      <div class="card-info">
        <div class="card-title">${d.label}</div>
        <div class="card-sub">${p.lvl>=99?'MAX LEVEL':p.cur+' / '+p.need+' xp'}</div>
      </div>
    </div>`;
  });
  wrap.innerHTML = html;
}
function restAtTown(){
  state.hp = maxHp();
  showToast('Fully rested');
  queueSave();
  renderAll();
}

/* ============================ RENDER: HERO SHEET ============================ */
function equipSlotHTML(slot, large){
  const list = slot==='weapon' ? WEAPONS : ARMORS;
  const item = list.find(i=>i.id===state.equipment[slot]);
  const glyphId = slot==='weapon' ? 'sword' : 'shield';
  if(large){
    if(item){
      const effect = slot==='weapon' ? `+${item.atk} Attack` : `+${item.def} Defence`;
      return `<div class="equip-slot filled">
        <div class="equip-tile ch-tile">${icon(glyphId)}</div>
        <div class="equip-txt"><div class="lbl">${slot.toUpperCase()}</div><div class="name">${item.name}</div><div class="effect">${effect}</div></div>
      </div>`;
    }
    return `<div class="equip-slot empty">
      <div class="equip-tile ch-tile">${icon(glyphId)}</div>
      <div class="equip-txt"><div class="lbl">${slot.toUpperCase()}</div><div class="name">Empty</div><div class="hint">buy at the stall</div></div>
    </div>`;
  }
  if(item){
    return `<div class="worn-slot filled"><div class="worn-tile">${icon(glyphId)}</div><div class="name">${item.name}</div></div>`;
  }
  return `<div class="worn-slot empty"><div class="worn-tile">${icon(glyphId)}</div><div class="name">Empty</div></div>`;
}
function renderHero(){
  const cb = xpProgress(state.combatXp);
  document.getElementById('herosub').textContent = `ADVENTURER · COMBAT LV ${cb.lvl}`;
  const mh = maxHp();
  document.getElementById('hero-hpfill').style.width = Math.max(0,state.hp/mh*100)+'%';

  const w = WEAPONS.find(w=>w.id===state.equipment.weapon);
  const a = ARMORS.find(a=>a.id===state.equipment.armor);
  document.getElementById('hero-weapon-glyph').innerHTML = w ? icon('sword') : '';
  const armorEl = document.getElementById('hero-armor-glyph');
  if(a){ armorEl.innerHTML = icon('shield'); armorEl.style.color = 'var(--gold)'; }
  else { armorEl.innerHTML = `<svg class="glyph" viewBox="0 0 24 24" style="stroke-dasharray:2 2;"><use href="#g-shield"></use></svg>`; armorEl.style.color = '#5c4830'; }

  const atk = atkStat(), def = defStat();
  document.getElementById('hero-atk').textContent = atk;
  document.getElementById('hero-def').textContent = def;
  document.getElementById('hero-atk-deriv').textContent = `${cb.lvl} level${w?' + '+w.atk+' weapon':''}`;
  document.getElementById('hero-def-deriv').textContent = `${Math.floor(cb.lvl/2)} level${a?' + '+a.def+' armor':''}`;

  document.getElementById('hero-carried').innerHTML = equipSlotHTML('weapon', true) + equipSlotHTML('armor', true);

  let ledgerHtml = `<div class="ledger-row active">
    <span class="chip" style="background:var(--sk-combat);"></span>${icon('sword')}
    <span class="lname">Combat</span>
    <div class="minibar bar-trough"><div class="bar-fill f-hp" style="width:${cb.pct}%"></div></div>
    <span class="lvl">${cb.lvl}</span>
  </div>`;
  SKILL_DEFS.forEach(d=>{
    const p = xpProgress(state.skills[d.key]);
    ledgerHtml += `<div class="ledger-row">
      <span class="chip" style="background:var(${d.accent});"></span>${icon(d.icon)}
      <span class="lname">${d.label}</span>
      <div class="minibar bar-trough"><div class="bar-fill ${d.fillClass}" style="width:${p.pct}%"></div></div>
      <span class="lvl">${p.lvl}</span>
    </div>`;
  });
  document.getElementById('hero-ledger').innerHTML = ledgerHtml;

  const foesFelled = Object.values(state.killCounts).reduce((a,b)=>a+b,0);
  document.getElementById('hero-tiles').innerHTML = `
    <div class="stat-tile"><div class="lbl">FOES FELLED</div><div class="val">${foesFelled}</div></div>
    <div class="stat-tile"><div class="lbl">QUESTS DONE</div><div class="val">${state.completedQuests.length}</div></div>
    <div class="stat-tile"><div class="lbl">PLACES KNOWN</div><div class="val">${state.unlockedLocations.length}</div></div>`;
}

/* ============================ RENDER: TRAVEL / MAP ============================ */
const MAP_COORDS = {
  town:            {x:200, y:255},
  birchwood:       {x:95,  y:215},
  quarry:          {x:305, y:215},
  silverbrook:     {x:55,  y:255},
  deepwoods:       {x:345, y:250},
  millersbridge:   {x:200, y:190},
  emberforge:      {x:200, y:132},
  frostpine:       {x:40,  y:150},
  cinderdepths:    {x:360, y:150},
  stormcoast:      {x:35,  y:75},
  widowsvigil:     {x:128, y:95},
  oldwatchtower:   {x:272, y:95},
  sunkencrypt:     {x:200, y:48},
  frostholdruins:  {x:85,  y:20},
  ashenwastes:     {x:315, y:20},
};
const MAP_PATHS = [
  ['town','birchwood'], ['town','quarry'], ['town','silverbrook'], ['town','deepwoods'],
  ['birchwood','frostpine'], ['quarry','cinderdepths'], ['silverbrook','stormcoast'],
  ['town','millersbridge'], ['millersbridge','emberforge'],
  ['emberforge','widowsvigil'], ['emberforge','oldwatchtower'],
  ['widowsvigil','sunkencrypt'], ['oldwatchtower','sunkencrypt'],
  ['sunkencrypt','frostholdruins'], ['sunkencrypt','ashenwastes'],
];
function biomeStroke(id){
  if(id==='town') return '#eda23c';
  const loc = LOCATIONS[id];
  if(!loc) return '#5c5033';
  if(loc.type==='gather'){
    if(loc.skill==='woodcutting') return 'var(--t-forest-l)';
    if(loc.skill==='mining') return 'var(--t-rock-l)';
    if(loc.skill==='fishing') return 'var(--t-water-l)';
  }
  if(loc.type==='smith') return 'var(--gold)';
  return 'var(--t-bramble-l)';
}
let previewLocked = null;
function renderMap(){
  const wrap = document.getElementById('travelmap');
  const activeId = previewLocked || state.location;

  const paths = MAP_PATHS.map(([a,b])=>{
    const pa = MAP_COORDS[a], pb = MAP_COORDS[b];
    const bothOpen = (a==='town'||isUnlocked(a)) && (b==='town'||isUnlocked(b));
    return `<path d="M${pa.x},${pa.y} L${pb.x},${pb.y}" fill="none" stroke="${bothOpen?'#eda23c':'#5c5033'}" stroke-width="${bothOpen?2.4:2}" ${bothOpen?'':'stroke-dasharray="3 7"'} opacity="${bothOpen?0.85:0.5}"></path>`;
  }).join('');

  function hexPath(x,y){
    return `M${x},${y-12} L${x+10},${y-6} L${x+10},${y+6} L${x},${y+12} L${x-10},${y+6} L${x-10},${y-6} Z`;
  }

  const pins = Object.entries(MAP_COORDS).map(([id,pt])=>{
    if(id === 'town'){
      return `<g class="map-pin" onclick="setScreen('town')">
        <path d="${hexPath(pt.x,pt.y)}" fill="url(#pinTown)" stroke="var(--ember)" stroke-width="1.8"></path>
        <g color="#ffd28a">${iconUseAt('house',pt.x,pt.y,14)}</g>
        <text class="map-pin-label" x="${pt.x}" y="${pt.y+27}">Thornwake</text>
      </g>`;
    }
    const loc = LOCATIONS[id];
    const unlocked = isUnlocked(id);
    const isActive = id === activeId;
    const stroke = biomeStroke(id);
    let ring = '';
    if(isActive && unlocked){
      ring = `<circle class="map-pulse" cx="${pt.x}" cy="${pt.y}" r="15" stroke="${stroke}"></circle>`;
    }
    const currentDot = (id === state.location) ? `<circle class="map-current-dot" cx="${pt.x}" cy="${pt.y-20}" r="2.6"></circle>` : '';
    return `<g class="map-pin ${unlocked?'':'locked'}" onclick="selectMapPin('${id}')">
      ${ring}
      <path d="${hexPath(pt.x,pt.y)}" fill="${unlocked?'url(#pinOpen)':'url(#pinLocked)'}" stroke="${unlocked?(isActive?'var(--ember)':stroke):'#5c5033'}" stroke-width="${isActive&&unlocked?2:1.4}"></path>
      <g color="${unlocked?stroke:'#5c5033'}" opacity="${unlocked?1:0.5}">${iconUseAt(unlocked?loc.icon:'lock',pt.x,pt.y,13)}</g>
      ${currentDot}
      <text class="map-pin-label ${unlocked?'':'locked'}" x="${pt.x}" y="${pt.y+26}">${unlocked?loc.name:'???'}</text>
    </g>`;
  }).join('');

  wrap.innerHTML = `<svg viewBox="0 0 400 296" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="mapbg" cx="50%" cy="30%" r="80%"><stop offset="0%" stop-color="#3e3124"></stop><stop offset="100%" stop-color="#2b231b"></stop></radialGradient>
      <radialGradient id="pinOpen" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#2c3521"></stop><stop offset="100%" stop-color="#14180d"></stop></radialGradient>
      <radialGradient id="pinLocked" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#282216"></stop><stop offset="100%" stop-color="#101209"></stop></radialGradient>
      <radialGradient id="pinTown" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="#4a3a12"></stop><stop offset="100%" stop-color="#221a08"></stop></radialGradient>
      <radialGradient id="glowForest" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#324224" stop-opacity="0.55"></stop><stop offset="100%" stop-color="#324224" stop-opacity="0"></stop></radialGradient>
      <radialGradient id="glowRock" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#4a4433" stop-opacity="0.5"></stop><stop offset="100%" stop-color="#4a4433" stop-opacity="0"></stop></radialGradient>
      <radialGradient id="glowWater" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#3b5a54" stop-opacity="0.5"></stop><stop offset="100%" stop-color="#3b5a54" stop-opacity="0"></stop></radialGradient>
      <radialGradient id="glowBramble" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#5c3c2c" stop-opacity="0.35"></stop><stop offset="100%" stop-color="#5c3c2c" stop-opacity="0"></stop></radialGradient>
    </defs>
    <rect x="0" y="0" width="400" height="296" fill="url(#mapbg)"></rect>
    <ellipse cx="90" cy="190" rx="95" ry="58" fill="url(#glowForest)"></ellipse>
    <ellipse cx="320" cy="190" rx="90" ry="55" fill="url(#glowRock)"></ellipse>
    <ellipse cx="45" cy="90" rx="72" ry="58" fill="url(#glowWater)"></ellipse>
    <ellipse cx="200" cy="95" rx="115" ry="92" fill="url(#glowBramble)"></ellipse>
    ${paths}
    ${pins}
  </svg>`;
}
function iconUseAt(glyphId, x, y, size){
  return `<use href="#g-${glyphId}" x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></use>`;
}

function selectMapPin(id){
  const loc = LOCATIONS[id];
  if(isUnlocked(id)){
    previewLocked = null;
    if(loc.type === 'smith'){ setScreen('cook'); return; }
    travelTo(id);
  } else {
    previewLocked = id;
    renderTravel();
  }
}
function travelTo(id){
  if(state.location !== id){
    if(gatherAction && gatherAction.locationId !== id) stopGather(false);
    state.location = id;
    queueSave();
  }
  updateAppBg();
  renderTravel();
}
function renderTravel(){
  renderMap();
  const banner = document.getElementById('travelbanner');
  const gatherWrap = document.getElementById('travel-gather-wrap');
  const combatWrap = document.getElementById('travel-combat-wrap');

  if(previewLocked){
    const loc = LOCATIONS[previewLocked];
    const q = QUESTS.find(q=> (q.reward.unlock||[]).includes(previewLocked));
    const hint = q ? `Discovered by completing &ldquo;${q.name}&rdquo;` : 'Not yet discovered';
    banner.innerHTML = `<div class="location-banner"><div class="lb-title">${icon('lock')} ${loc.name}</div><div class="lb-desc">You haven't found a way in yet.</div><div class="lb-hint">${icon('scroll')} ${hint}</div></div>`;
    gatherWrap.style.display = 'none'; combatWrap.style.display = 'none';
    return;
  }

  if(!state.location || !isUnlocked(state.location) || LOCATIONS[state.location].type === 'smith'){
    banner.innerHTML = `<div class="location-banner"><div class="lb-title">Choose a destination</div><div class="lb-desc">Tap a place on the map to travel there. Only the resources and dangers found in that location will be available to you.</div></div>`;
    gatherWrap.style.display = 'none'; combatWrap.style.display = 'none';
    return;
  }
  const loc = LOCATIONS[state.location];
  banner.innerHTML = `<div class="location-banner"><div class="lb-title">${icon(loc.icon)} ${loc.name}</div><div class="lb-desc">${loc.desc}</div></div>`;

  gatherWrap.style.display = loc.type==='gather' ? '' : 'none';
  combatWrap.style.display = loc.type==='combat' ? '' : 'none';

  if(loc.type === 'gather'){
    renderTravelGather();
  } else {
    if(fight){
      document.getElementById('combat-select').style.display = 'none';
      document.getElementById('combat-fight').style.display = '';
    } else {
      document.getElementById('combat-select').style.display = '';
      document.getElementById('combat-fight').style.display = 'none';
      renderMonsterList();
    }
  }
}
function renderTravelGather(){
  const loc = LOCATIONS[state.location];
  const skillKey = loc.skill;
  const p = xpProgress(state.skills[skillKey]);
  const wrap = document.getElementById('travelgathercontent');
  let html = `<div class="lb-skill mono" style="color:var(${SKILL_DEFS.find(d=>d.key===skillKey).accent});">${SKILL_LABELS[skillKey].toUpperCase()} LV ${p.lvl} &middot; ${p.lvl>=99?'MAX':p.cur+'/'+p.need+' XP'}</div>`;
  loc.nodes.forEach(node=>{
    const locked = p.lvl < node.reqLevel;
    const isActive = gatherAction && gatherAction.node.id === node.id && gatherAction.locationId===state.location;
    html += `<div class="card card--${locked?'locked':loc.cardv}">
      <div class="card-row">
        <div class="card-icon">${icon(RESOURCE_ITEMS[node.item].icon)}</div>
        <div class="card-info">
          <div class="card-title">${node.name}</div>
          <div class="card-sub">${locked? 'Requires level '+node.reqLevel : `+${node.xp} xp &middot; yields ${RESOURCE_ITEMS[node.item].name}`}</div>
        </div>
        ${locked? '' : `<button class="btn ${isActive?'btn-blood':'btn-leaf'} btn-sm ch-btn" onclick="${isActive?'stopGather(true)':`startGather('${node.id}')`}">${isActive?'Stop':'Start'}</button>`}
      </div>
      ${isActive? `<div style="margin-top:9px;"><div class="bar-trough"><div class="bar-fill ${loc.fillv}" id="gatherprogress" style="width:0%"><div class="bar-sheen"></div><div class="bar-edge"></div></div></div></div>` : ''}
    </div>`;
  });
  wrap.innerHTML = html;
}

/* ============================ GATHER (background-persistent) ============================ */
let gatherAction = null;
let gatherRAF = null;
function startGather(nodeId){
  if(gatherAction) stopGather(false);
  const loc = LOCATIONS[state.location];
  const node = loc.nodes.find(n=>n.id===nodeId);
  gatherAction = { node, skillKey: loc.skill, locationId: state.location, startedAt: performance.now() };
  if(currentScreen==='travel') renderTravelGather();
  renderStatus();
  tickGather();
}
function stopGather(rerender){
  gatherAction = null;
  if(gatherRAF) cancelAnimationFrame(gatherRAF);
  renderActivityBar();
  renderStatus();
  if(rerender && currentScreen==='travel') renderTravelGather();
}
function tickGather(){
  if(!gatherAction) return;
  const { node } = gatherAction;
  const elapsed = performance.now() - gatherAction.startedAt;
  if(currentScreen==='travel'){
    const bar = document.getElementById('gatherprogress');
    if(bar) bar.style.width = Math.min(100,(elapsed/node.time)*100)+'%';
  }
  renderActivityBar();
  if(elapsed >= node.time){
    addItem(node.item, 1);
    grantXp(gatherAction.skillKey, node.xp, SKILL_LABELS[gatherAction.skillKey]);
    queueSave();
    gatherAction.startedAt = performance.now();
    if(currentScreen==='town') renderTown();
    if(currentScreen==='inv') renderInventory();
    if(currentScreen==='shop') renderShop();
    if(currentScreen==='quests') renderQuests();
    if(heroOpen) renderHero();
  }
  gatherRAF = requestAnimationFrame(tickGather);
}

/* ============================ RENDER: HEARTH — COOK + SMITH ============================ */
let cookAction = null;
function renderCook(){
  const p = xpProgress(state.skills.cooking);
  const wrap = document.getElementById('cookcontent');
  let html = `<div class="lb-skill mono" style="color:var(--sk-cook);">COOKING LV ${p.lvl} &middot; ${p.lvl>=99?'MAX':p.cur+'/'+p.need+' XP'}</div>`;
  COOK_RECIPES.forEach(r=>{
    const locked = p.lvl < r.reqLevel;
    const have = invCount(r.raw);
    const isActive = cookAction && cookAction.id === r.id;
    html += `<div class="card card--${locked?'locked':'cook'}${isActive?' ready':''}">
      <div class="card-row">
        <div class="card-icon">${icon(RESOURCE_ITEMS[r.raw].icon)}</div>
        <div class="card-info">
          <div class="card-title">${r.name}</div>
          <div class="card-sub">${locked?'Requires level '+r.reqLevel : `+${r.xp} xp &middot; ${have} raw in the satchel`}</div>
        </div>
        ${locked?'':`<button class="btn ${isActive?'btn-blood':'btn-leaf'} btn-sm ch-btn" ${(!isActive && have<1)?'disabled':''} onclick="${isActive?'stopCook(true)':`startCook('${r.id}')`}">${isActive?'Stop':'Cook'}</button>`}
      </div>
      ${isActive? `<div style="margin-top:9px;"><div class="bar-trough"><div class="bar-fill f-cook" id="cookprogress" style="width:0%"><div class="bar-sheen"></div></div></div></div>` : ''}
    </div>`;
  });
  wrap.innerHTML = html;
  renderHearthSmith();
}
let cookRAF = null;
function startCook(id){
  if(cookAction) stopCook(false);
  const r = COOK_RECIPES.find(r=>r.id===id);
  if(invCount(r.raw) < 1) return;
  cookAction = { ...r, startedAt: performance.now() };
  if(currentScreen==='cook') renderCook();
  renderStatus();
  tickCook();
}
function stopCook(rerender){
  cookAction = null;
  if(cookRAF) cancelAnimationFrame(cookRAF);
  renderActivityBar();
  renderStatus();
  if(rerender && currentScreen==='cook') renderCook();
}
function tickCook(){
  if(!cookAction) return;
  const elapsed = performance.now() - cookAction.startedAt;
  if(currentScreen==='cook'){
    const bar = document.getElementById('cookprogress');
    if(bar) bar.style.width = Math.min(100,(elapsed/cookAction.time)*100)+'%';
  }
  renderActivityBar();
  if(elapsed >= cookAction.time){
    if(invCount(cookAction.raw) < 1){ stopCook(true); return; }
    state.inventory[cookAction.raw]--;
    addItem(cookAction.cooked, 1);
    grantXp('cooking', cookAction.xp, 'Cooking');
    queueSave();
    if(invCount(cookAction.raw) < 1){ stopCook(true); return; }
    cookAction.startedAt = performance.now();
    if(currentScreen==='town') renderTown();
    if(currentScreen==='inv') renderInventory();
    if(heroOpen) renderHero();
  }
  cookRAF = requestAnimationFrame(tickCook);
}

/* ---- Emberforge (smelt + forge), lives inside the Hearth screen ---- */
let smithAction = null;
function renderHearthSmith(){
  const wrap = document.getElementById('emberforgewrap');
  if(!isUnlocked('emberforge')){
    wrap.innerHTML = `<div class="section-header"><span class="diamond"></span><span class="label">Emberforge</span><span class="rule"></span></div>
      <div class="card card--locked"><div class="card-row"><div class="card-icon">${icon('lock')}</div>
        <div class="card-info"><div class="card-title">The Emberforge</div><div class="card-sub">Finish &ldquo;The Miller's Trouble&rdquo; first</div></div>
      </div></div>`;
    return;
  }
  const p = xpProgress(state.skills.smithing);
  let html = `<div class="section-header"><span class="diamond"></span><span class="label">Emberforge</span><span class="rule"></span></div>
    <div class="lb-skill mono" style="color:var(--sk-smith);">SMITHING LV ${p.lvl} &middot; ${p.lvl>=99?'MAX':p.cur+'/'+p.need+' XP'}</div>
    <div class="section-header"><span class="diamond" style="background:var(--sk-smith);"></span><span class="label">Smelt Ore</span><span class="rule"></span></div>`;
  SMELT_RECIPES.forEach(r=>{
    const locked = p.lvl < r.reqLevel;
    const have = invCount(r.ore);
    const isActive = smithAction && smithAction.id === r.id;
    html += `<div class="card card--${locked?'locked':'smith'}">
      <div class="card-row">
        <div class="card-icon">${icon(RESOURCE_ITEMS[r.ore].icon)}</div>
        <div class="card-info">
          <div class="card-title">${r.name}</div>
          <div class="card-sub">${locked?'Requires level '+r.reqLevel : `+${r.xp} xp &middot; have ${have} ore`}</div>
        </div>
        ${locked?'':`<button class="btn ${isActive?'btn-blood':'btn-purple'} btn-sm ch-btn" ${(!isActive && have<1)?'disabled':''} onclick="${isActive?'stopSmelt(true)':`startSmelt('${r.id}')`}">${isActive?'Stop':'Smelt'}</button>`}
      </div>
      ${isActive? `<div style="margin-top:9px;"><div class="bar-trough"><div class="bar-fill f-smith" id="smithprogress" style="width:0%"><div class="bar-sheen"></div></div></div></div>` : ''}
    </div>`;
  });
  html += `<div class="section-header"><span class="diamond" style="background:var(--sk-smith);"></span><span class="label">Forge Gear</span><span class="rule"></span></div>`;
  const forgeable = [...WEAPONS.map(w=>({...w, slot:'weapon'})), ...ARMORS.map(a=>({...a, slot:'armor'}))].filter(i=>i.forgeOnly);
  forgeable.forEach(item=>{
    const locked = p.lvl < item.reqLevel;
    const owned = state.equipment[item.slot] === item.id;
    const barText = Object.entries(item.bars).map(([bid,qty])=>`${qty} ${RESOURCE_ITEMS[bid].name}${qty>1?'s':''}`).join(', ');
    const canAfford = !locked && state.gold >= item.cost && Object.entries(item.bars).every(([bid,qty])=>invCount(bid)>=qty);
    const stat = item.slot==='weapon' ? `+${item.atk} ATK` : `+${item.def} DEF`;
    html += `<div class="card card--${locked?'locked':'smith'}">
      <div class="card-row">
        <div class="card-icon">${icon(item.slot==='weapon'?'sword':'shield')}</div>
        <div class="card-info">
          <div class="card-title">${item.name} ${owned?'<span class="held-chip">EQUIPPED</span>':''}</div>
          <div class="card-sub">${locked?'Requires smithing level '+item.reqLevel : `${stat} &middot; ${barText} &middot; <span class="gold-inline">${item.cost}${icon('coin')}</span>`}</div>
        </div>
        ${locked||owned?'':`<button class="btn btn-purple btn-sm ch-btn" ${canAfford?'':'disabled'} onclick="forgeItem('${item.id}','${item.slot}')">Forge</button>`}
      </div>
    </div>`;
  });
  wrap.innerHTML = html;
}
function startSmelt(id){
  if(smithAction) stopSmelt(false);
  const r = SMELT_RECIPES.find(r=>r.id===id);
  if(invCount(r.ore) < 1) return;
  smithAction = { ...r, startedAt: performance.now() };
  if(currentScreen==='cook') renderHearthSmith();
  renderStatus();
  tickSmelt();
}
let smithRAF = null;
function stopSmelt(rerender){
  smithAction = null;
  if(smithRAF) cancelAnimationFrame(smithRAF);
  renderActivityBar();
  renderStatus();
  if(rerender && currentScreen==='cook') renderHearthSmith();
}
function tickSmelt(){
  if(!smithAction) return;
  const elapsed = performance.now() - smithAction.startedAt;
  if(currentScreen==='cook'){
    const bar = document.getElementById('smithprogress');
    if(bar) bar.style.width = Math.min(100,(elapsed/smithAction.time)*100)+'%';
  }
  renderActivityBar();
  if(elapsed >= smithAction.time){
    if(invCount(smithAction.ore) < 1){ stopSmelt(true); return; }
    state.inventory[smithAction.ore]--;
    addItem(smithAction.bar, 1);
    grantXp('smithing', smithAction.xp, 'Smithing');
    queueSave();
    if(invCount(smithAction.ore) < 1){ stopSmelt(true); return; }
    smithAction.startedAt = performance.now();
    if(currentScreen==='inv') renderInventory();
    if(currentScreen==='quests') renderQuests();
    if(heroOpen) renderHero();
  }
  smithRAF = requestAnimationFrame(tickSmelt);
}
function forgeItem(id, slot){
  const list = slot==='weapon'?WEAPONS:ARMORS;
  const item = list.find(i=>i.id===id);
  const smithLvl = xpProgress(state.skills.smithing).lvl;
  if(smithLvl < item.reqLevel) return;
  if(state.gold < item.cost) return;
  for(const [bid,qty] of Object.entries(item.bars)){ if(invCount(bid) < qty) return; }
  for(const [bid,qty] of Object.entries(item.bars)){ state.inventory[bid] -= qty; }
  state.gold -= item.cost;
  state.equipment[slot] = id;
  if(item.forgeXp) grantXp('smithing', item.forgeXp, 'Smithing');
  showToast(`Forged and equipped ${item.name}`);
  queueSave();
  renderAll();
}

/* ============================ RENDER: SHOP ============================ */
let shopTab = 'buy';
function setShopTab(t){ shopTab = t; document.querySelectorAll('[data-shoptab]').forEach(b=>b.classList.toggle('active', b.dataset.shoptab===t)); renderShop(); }
function renderShop(){
  const wrap = document.getElementById('shopcontent');
  const cb = xpProgress(state.combatXp).lvl;
  if(shopTab==='buy'){
    let html = `<div class="section-header"><span class="diamond"></span><span class="label">Weapons</span><span class="rule"></span></div>`;
    WEAPONS.filter(w=>!w.forgeOnly && !w.questOnly).forEach(w=>{
      const owned = state.equipment.weapon === w.id;
      const locked = cb < w.reqLevel;
      html += shopItemCard(w, 'weapon', owned, locked);
    });
    html += `<div class="section-header"><span class="diamond"></span><span class="label">Armor</span><span class="rule"></span></div>`;
    ARMORS.filter(a=>!a.forgeOnly && !a.questOnly).forEach(a=>{
      const owned = state.equipment.armor === a.id;
      const locked = cb < a.reqLevel;
      html += shopItemCard(a, 'armor', owned, locked);
    });
    wrap.innerHTML = html;
  } else {
    let html = '';
    const sellable = Object.entries(SELL_PRICES).filter(([id])=>invCount(id)>0);
    if(sellable.length===0){ html = '<div class="empty-hint">Nothing worth selling yet. Gather some resources first.</div>'; }
    else{
      html += `<div class="card card--gold">`;
      sellable.forEach(([id,price],i)=>{
        html += `<div class="sell-row">
          <div class="card-icon" style="width:38px;height:38px;">${icon(RESOURCE_ITEMS[id].icon)}</div>
          <div class="card-info">
            <div class="card-title" style="font-size:13px;">${RESOURCE_ITEMS[id].name} <span class="mono" style="color:var(--t-dim); font-weight:400; font-size:11.5px;">&times;${invCount(id)}</span></div>
            <div class="card-sub">${invCount(id)*price}${icon('coin')} total</div>
          </div>
          <button class="btn btn-ghost btn-sm ch-btn" onclick="sellAll('${id}')">Sell All</button>
        </div>`;
      });
      html += `</div>`;
    }
    wrap.innerHTML = html;
  }
}
function shopItemCard(item, slot, owned, locked){
  const stat = slot==='weapon' ? `+${item.atk} Attack` : `+${item.def} Defence`;
  const afford = state.gold >= item.cost;
  return `<div class="card card--${locked?'locked':'gold'}">
    <div class="card-row">
      <div class="card-icon">${icon(slot==='weapon'?'sword':'shield')}</div>
      <div class="card-info">
        <div class="card-title">${item.name} ${owned?'<span class="held-chip">HELD</span>':''}</div>
        <div class="card-sub">${locked? 'Requires combat level '+item.reqLevel : `${stat} &middot; <span class="gold-inline">${item.cost}${icon('coin')}</span>`}</div>
      </div>
      ${locked||owned?'': `<button class="btn btn-gold btn-sm ch-btn" ${afford?'':'disabled'} onclick="buyGear('${item.id}','${slot}')">Buy</button>`}
    </div>
  </div>`;
}
function buyGear(id, slot){
  const list = slot==='weapon'?WEAPONS:ARMORS;
  const item = list.find(i=>i.id===id);
  if(state.gold < item.cost) return;
  state.gold -= item.cost;
  state.equipment[slot] = id;
  showToast(`Equipped ${item.name}`);
  queueSave();
  renderAll();
}
function sellAll(id){
  const n = invCount(id);
  if(n<=0) return;
  state.gold += n * SELL_PRICES[id];
  state.inventory[id] = 0;
  queueSave();
  renderAll();
}

/* ============================ RENDER: SATCHEL ============================ */
function renderInventory(){
  const wrap = document.getElementById('invcontent');
  const items = Object.entries(state.inventory).filter(([,n])=>n>0);
  const SLOTS = 12;
  let grid = '';
  for(let i=0; i<SLOTS; i++){
    if(items[i]){
      const [id,n] = items[i];
      const meta = RESOURCE_ITEMS[id];
      grid += `<div class="item-tile filled ch-tile" onclick="${meta.heal?`eatItem('${id}')`:''}">${icon(meta.icon)}<span class="item-count">${n}</span></div>`;
    } else {
      grid += `<div class="item-tile empty ch-tile"></div>`;
    }
  }
  wrap.innerHTML = `<div class="item-grid">${grid}</div>`;
  if(items.length===0){
    wrap.innerHTML += `<div class="empty-hint">Your satchel is empty. Go gather some resources.</div>`;
  } else {
    const foods = items.filter(([id])=>RESOURCE_ITEMS[id].heal);
    if(foods.length){
      wrap.innerHTML += `<div class="section-header"><span class="diamond"></span><span class="label">Provisions</span><span class="rule"></span></div>`;
      foods.forEach(([id,n])=>{
        const meta = RESOURCE_ITEMS[id];
        wrap.innerHTML += `<div class="card card--cook card-row">
          <div class="card-icon">${icon(meta.icon)}</div>
          <div class="card-info"><div class="card-title">${meta.name}</div><div class="card-sub">${n} in hand &middot; mends ${meta.heal} HP</div></div>
          <button class="btn btn-leaf btn-sm ch-btn" onclick="eatItem('${id}')">Eat</button>
        </div>`;
      });
    }
  }
  const eq = document.getElementById('equipcontent');
  eq.innerHTML = `<div class="worn-slots">${equipSlotHTML('weapon', false)}${equipSlotHTML('armor', false)}</div>`;
}
function eatItem(id){
  if(invCount(id) < 1) return;
  const heal = RESOURCE_ITEMS[id].heal;
  if(!heal) return;
  state.inventory[id]--;
  state.hp = Math.min(maxHp(), state.hp + heal);
  showToast(`Ate ${RESOURCE_ITEMS[id].name} (+${heal} hp)`);
  queueSave();
  renderAll();
}

/* ============================ COMBAT ============================ */
let fight = null;
function renderMonsterList(){
  const loc = LOCATIONS[state.location];
  const cb = xpProgress(state.combatXp).lvl;
  const wrap = document.getElementById('monsterlist');
  const monsters = MONSTERS.filter(m=>loc.monsters.includes(m.id));
  let html = `<div class="section-header"><span class="diamond"></span><span class="label">Also Prowling Here</span><span class="rule"></span></div>`;
  html += monsters.map(m=>{
    const risky = cb < m.reqLevel - 3;
    return `<div class="card card--combat">
      <div class="card-row">
        <div class="card-icon">${icon(m.icon)}</div>
        <div class="card-info">
          <div class="card-title">${m.name}${risky?'<span class="difficulty-chip">DEADLY</span>':''}</div>
          <div class="card-sub">Suggested level ${m.reqLevel} &middot; ${m.maxHp} hp</div>
        </div>
        <button class="btn btn-blood btn-sm ch-btn" onclick="engageMonster('${m.id}')">Fight</button>
      </div>
    </div>`;
  }).join('');
  wrap.innerHTML = html;
}
function engageMonster(id){
  if(state.hp <= 0){ showToast('Rest before fighting — return to Town'); return; }
  const m = MONSTERS.find(m=>m.id===id);
  fight = { monster: m, monsterHp: m.maxHp, cooldown:false };
  document.getElementById('combat-select').style.display = 'none';
  document.getElementById('combat-fight').style.display = '';
  document.getElementById('enemy-glyph').innerHTML = `<use href="#g-${m.icon}"></use>`;
  document.getElementById('enemy-name').textContent = m.name;
  document.getElementById('combatlog').innerHTML = '';
  logCombat(`A ${m.name} blocks your path.`);
  renderFightBars();
}
function renderFightBars(){
  const mh = maxHp();
  document.getElementById('fhpfill-p').style.width = Math.max(0,state.hp/mh*100)+'%';
  document.getElementById('fhpfill-e').style.width = Math.max(0,fight.monsterHp/fight.monster.maxHp*100)+'%';
  document.getElementById('attackbtn').disabled = fight.cooldown;
}
function logCombat(text){
  const log = document.getElementById('combatlog');
  const d = document.createElement('div');
  d.textContent = text;
  log.appendChild(d);
  while(log.children.length > 8) log.removeChild(log.firstChild);
  log.scrollTop = log.scrollHeight;
}
function playerAttack(){
  if(!fight || fight.cooldown) return;
  const atk = atkStat();
  const dmg = 1 + Math.floor(Math.random()*atk);
  fight.monsterHp -= dmg;
  logCombat(`You strike the ${fight.monster.name} for ${dmg}.`);
  floatText(document.getElementById('fighter-enemy'), '-'+dmg, '#ffd0b0');
  renderFightBars();

  if(fight.monsterHp <= 0){
    winFight();
    return;
  }
  fight.cooldown = true;
  renderFightBars();
  setTimeout(()=>{
    if(!fight) return;
    const def = defStat();
    const raw = fight.monster.dmgMin + Math.floor(Math.random()*(fight.monster.dmgMax-fight.monster.dmgMin+1));
    const dmg2 = Math.max(1, raw - Math.floor(def/3));
    state.hp -= dmg2;
    logCombat(`The ${fight.monster.name} hits you for ${dmg2}.`);
    floatText(document.getElementById('fighter-player'), '-'+dmg2, '#ffd0b0');
    fight.cooldown = false;
    renderStatus();
    renderFightBars();
    if(state.hp <= 0){ loseFight(); }
    queueSave();
  }, 550);
}
function winFight(){
  const m = fight.monster;
  const gold = m.goldMin + Math.floor(Math.random()*(m.goldMax-m.goldMin+1));
  state.gold += gold;
  grantCombatXp(m.xp);
  state.killCounts[m.id] = (state.killCounts[m.id]||0) + 1;
  logCombat(`You defeated the ${m.name}! +${m.xp} xp, +${gold} gold.`);
  showToast(`Victory — +${gold} gold`);
  queueSave();
  fight = null;
  setTimeout(()=>{ renderStatus(); renderTravel(); }, 900);
}
function loseFight(){
  const lost = Math.min(state.gold, Math.floor(state.gold*0.1));
  state.gold -= lost;
  state.hp = 1;
  logCombat(`You collapse and stagger back to town, dropping ${lost} gold.`);
  showToast('Defeated — limped back to town');
  queueSave();
  fight = null;
  setTimeout(()=>{ setScreen('town'); }, 900);
}
function fleeCombat(){
  logCombat('You flee the battle.');
  fight = null;
  renderTravel();
}
function eatDuringCombat(){
  const foodId = Object.keys(RESOURCE_ITEMS).find(id=>RESOURCE_ITEMS[id].heal && invCount(id)>0);
  if(!foodId){ showToast('No food to eat'); return; }
  eatItem(foodId);
  if(fight) renderFightBars();
}

/* ============================ QUESTS ============================ */
function questStatus(q){
  if(state.completedQuests.includes(q.id)) return 'complete';
  const reqsMet = q.requires.every(r=>state.completedQuests.includes(r));
  if(!reqsMet) return 'locked';
  if(state.questState[q.id] && state.questState[q.id].status === 'active') return 'active';
  return 'available';
}
function questProgress(q){
  const obj = q.objective;
  if(obj.type === 'kill'){
    const qs = state.questState[q.id];
    const start = qs ? qs.startKill : (state.killCounts[obj.monster]||0);
    const current = Math.max(0, (state.killCounts[obj.monster]||0) - start);
    return { current: Math.min(current, obj.count), target: obj.count };
  }
  if(obj.type === 'deliver'){
    return { current: Math.min(invCount(obj.item), obj.count), target: obj.count };
  }
  return { current:0, target:1 };
}
function hasClaimableQuest(){
  return QUESTS.some(q=>{
    if(questStatus(q) !== 'active') return false;
    const p = questProgress(q);
    return p.current >= p.target;
  });
}
function acceptQuest(id){
  const q = QUESTS.find(q=>q.id===id);
  const startKill = q.objective.type==='kill' ? (state.killCounts[q.objective.monster]||0) : 0;
  state.questState[id] = { status:'active', startKill };
  showToast(`Quest accepted: ${q.name}`);
  queueSave();
  renderAll();
}
function turnInQuest(id){
  const q = QUESTS.find(q=>q.id===id);
  const p = questProgress(q);
  if(p.current < p.target) return;
  if(q.objective.type === 'deliver'){
    state.inventory[q.objective.item] = Math.max(0, invCount(q.objective.item) - q.objective.count);
  }
  const r = q.reward;
  if(r.gold) state.gold += r.gold;
  if(r.combatXp) grantCombatXp(r.combatXp);
  if(r.skillXp){ Object.entries(r.skillXp).forEach(([k,v])=>grantXp(k, v, SKILL_LABELS[k])); }
  if(r.unlock){ r.unlock.forEach(locId=>{ if(!state.unlockedLocations.includes(locId)) state.unlockedLocations.push(locId); }); }
  if(r.item){
    const w = WEAPONS.find(w=>w.id===r.item);
    if(w){ state.equipment.weapon = r.item; }
  }
  state.completedQuests.push(id);
  state.questState[id] = { status:'complete' };
  showToast(`Quest complete: ${q.name}`);
  if(r.text) setTimeout(()=>showToast(r.text), 900);
  queueSave();
  renderAll();
}
function renderQuests(){
  document.getElementById('questheader').textContent = `The Board — ${state.completedQuests.length} of ${QUESTS.length} Settled`;
  const wrap = document.getElementById('questcontent');
  wrap.innerHTML = QUESTS.map(q=>{
    const status = questStatus(q);
    const p = questProgress(q);
    let objText = '';
    if(q.objective.type==='kill') objText = `Defeat ${q.objective.count} ${MONSTERS.find(m=>m.id===q.objective.monster).name}${q.objective.count>1?'s':''} at ${q.objective.locName}`;
    if(q.objective.type==='deliver') objText = `Deliver ${q.objective.count} ${RESOURCE_ITEMS[q.objective.item].name}${q.objective.count>1?'s':''}`;
    let rewardText = [];
    if(q.reward.gold) rewardText.push(`${q.reward.gold} gold`);
    if(q.reward.combatXp) rewardText.push(`${q.reward.combatXp} combat xp`);
    if(q.reward.skillXp) Object.entries(q.reward.skillXp).forEach(([k,v])=>rewardText.push(`${v} ${SKILL_LABELS[k]} xp`));
    if(q.reward.item) rewardText.push(WEAPONS.find(w=>w.id===q.reward.item).name);
    if(q.reward.unlock) rewardText.push('new location' + (q.reward.unlock.length>1?'s':''));

    if(status === 'complete'){
      return `<div class="card card--neutral quest-settled-row">
        ${icon('check')}
        <span class="name">${q.name}</span>
        <span class="quest-settled-tag mono">SETTLED</span>
      </div>`;
    }

    if(status === 'locked'){
      return `<div class="card card--locked">
        <div class="card-title">${q.name}</div>
        <div class="quest-desc">${q.desc}</div>
        <div class="quest-locked-req">Requires: ${q.requires.map(r=>QUESTS.find(qq=>qq.id===r).name).join(', ')}</div>
      </div>`;
    }

    const tally = p.target <= 20 ? `<div class="tally">${Array.from({length:p.target}).map((_,i)=>`<div class="tally-seg ${i<p.current?'filled':''}"></div>`).join('')}</div>` : '';
    const ready = status==='active' && p.current >= p.target;
    let actionBtn = '';
    if(status==='available') actionBtn = `<button class="btn btn-gold btn-sm btn-block ch-btn" onclick="acceptQuest('${q.id}')">Accept Quest</button>`;
    if(status==='active') actionBtn = `<button class="btn ${ready?'btn-gold':'btn-ghost'} btn-sm btn-block ch-btn" ${ready?'':'disabled'} onclick="turnInQuest('${q.id}')">${ready?'Claim Reward':'In Progress'}</button>`;

    return `<div class="card card--${ready?'gold':'neutral'}${ready?' ready':''}">
      <div class="card-row" style="align-items:flex-start; margin-bottom:2px;">
        <div class="card-info"><div class="card-title">${q.name}</div></div>
        <span class="quest-badge ${status}">${ready?'ready':status}</span>
      </div>
      <div class="quest-desc">${q.desc}</div>
      <div class="quest-obj-panel">
        <div class="quest-obj-row"><span>${objText}</span><span>${p.current} / ${p.target}</span></div>
        ${tally}
      </div>
      <div class="quest-reward">Reward — ${rewardText.join(' &middot; ')}</div>
      ${actionBtn}
    </div>`;
  }).join('');
}

/* ============================ RENDER ALL ============================ */
function renderAll(){
  renderStatus();
  renderActivityBar();
  if(currentScreen==='town') renderTown();
  if(currentScreen==='travel') renderTravel();
  if(currentScreen==='cook') renderCook();
  if(currentScreen==='shop') renderShop();
  if(currentScreen==='quests') renderQuests();
  if(currentScreen==='inv') renderInventory();
  if(heroOpen) renderHero();
}

/* ============================ INIT ============================ */
(async function init(){
  await loadGame();
  renderAll();
  if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('sw.js').catch(()=>{});
    });
  }
})();
