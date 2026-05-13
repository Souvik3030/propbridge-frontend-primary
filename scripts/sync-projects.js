import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.VITE_API_KEY;
const API_HOST = (process.env.VITE_API_HOST || '').trim();

const MOCK_FILE_PATH = path.join(__dirname, '../public/data/projects.json');

// Ensure directory exists
const dir = path.dirname(MOCK_FILE_PATH);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const normaliseProject = (raw) => {
  // Robust extraction for name and price
  const name = raw.name || raw.title || raw.displayName || 'Untitled Project';
  const price = raw.price?.min || raw.price?.value || raw.price || (typeof raw.price === 'number' ? raw.price : 0);
  
  return {
    i: raw.id,
    t: name,
    p: price,
    tp: {
      main: raw.category?.main || raw.type?.main || (typeof raw.category === 'string' ? raw.category : '') || (typeof raw.type === 'string' ? raw.type : '') || 'Residential',
      sub:  raw.category?.sub  || raw.type?.sub  || (typeof raw.type === 'string' ? raw.type : '') || '',
    },
    a: {
      built_up: raw.area?.min ?? raw.area?.built_up ?? 0,
      unit: raw.area?.unit || 'sqft',
    },
    ur: raw.rooms || [],
    ac: raw.units_count || 0,
    c: raw.location?.community?.name || raw.location?.sub_community?.name || '',
    ci: raw.location?.city?.name || '',
    coordinates: (raw.location?.coordinates?.latitude && raw.location?.coordinates?.longitude)
      ? [raw.location.coordinates.latitude, raw.location.coordinates.longitude]
      : (raw.location?.coordinates?.lat && raw.location?.coordinates?.lng)
      ? [raw.location.coordinates.lat, raw.location.coordinates.lng]
      : (raw.location?.latitude && raw.location?.longitude)
      ? [raw.location.latitude, raw.location.longitude]
      : null,
    d: raw.developer?.name || '',
    developer_id: raw.developer?.id || null,
    developer_logo: raw.developer?.logo_url || null,
    cv: raw.media?.cover_photo || (Array.isArray(raw.media?.photos) ? raw.media.photos[0] : Object.values(raw.media?.photos || {})[0]) || '',
    photos: Array.isArray(raw.media?.photos) ? raw.media.photos : Object.values(raw.media?.photos || []),
    dl: raw.developer?.logo_url || '',
    cs: raw.completion_status || 'under-construction',
    cd: raw.completion_date || '',
    pp: raw.payment_plan ? [{
      down_payment_percent: raw.payment_plan.down_payment_percent ?? null,
      pre_handover_percent: raw.payment_plan.pre_handover_percent ?? null,
      handover_percent: raw.payment_plan.handover_percent ?? null,
      post_handover_percent: raw.payment_plan.post_handover_percent ?? null,
    }] : [],
    dc: raw.documents || null,
    score: raw.score || 0,
  };
};

async function fetchBatch(page = 0) {
  const url = `https://${API_HOST}/new_projects_search?page=${page}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    },
    body: JSON.stringify({ index: 'popular', page })
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  return await response.json();
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sync() {
  console.log('🚀 Starting Realtime Data Sync to public/data/projects.json...');
  let allRaw = [];
  let page = 0;
  let hasMore = true;
  let emptyCount = 0;

  const writeUpdate = (data) => {
    const normalised = data.map(normaliseProject);
    const output = {
      lastUpdated: new Date().toISOString(),
      count: normalised.length,
      projects: normalised
    };
    fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(output, null, 2), 'utf8');
  };

  try {
    while (hasMore && emptyCount < 3) {
      console.log(`📡 Fetching page ${page}...`);
      const data = await fetchBatch(page);
      const results = data.results || [];
      
      if (results.length === 0) {
        emptyCount++;
        console.log(`⚠️ Empty page received. (${emptyCount}/3)`);
      } else {
        emptyCount = 0;
        allRaw = [...allRaw, ...results];
        console.log(`✅ Total so far: ${allRaw.length}. Updating projects.json...`);
        
        writeUpdate(allRaw); 
        
        if (results.length < 24) hasMore = false; 
      }
      
      page++;
      await delay(1500); // 1.5s delay to be safe and avoid excessive I/O
    }

    console.log(`✨ Successfully synced ${allRaw.length} projects to public folder!`);
    
  } catch (err) {
    console.error('❌ Sync failed:', err.message);
    process.exit(1);
  }
}

sync();
