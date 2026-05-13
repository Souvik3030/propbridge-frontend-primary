// ── Constants ───────────────────────────────────────────────────────────────
export const COLORS = ['#ccab59', '#3b82f6', '#10b981', '#f59e0b'];

export const RADAR_AXES = [
  { key: 'investmentScore', label: 'Investment Score' },
  { key: 'yieldScore',      label: 'Yield' },
  { key: 'priceValue',      label: 'Price Value' },
  { key: 'areaSize',        label: 'Area Size' },
  { key: 'locationRating',  label: 'Location Rating' },
  { key: 'developerRep',    label: 'Developer Rep' },
];

// ── Formatting Helpers ──────────────────────────────────────────────────────
export const fmtPrice = (p) => p ? `AED ${Number(p).toLocaleString()}` : '—';

export const bedsStr = (ur) => ur?.length ? [...new Set(ur)].sort((a,b)=>a-b).join(', ') + ' BR' : '—';

export const handoverStr = (pp) => {
  if (!pp?.[0]) return '—';
  const { down_payment_percent: d, pre_handover_percent: pre, handover_percent: h } = pp[0];
  return `${d}/${pre}/${h}`;
};

export const priceSqft = (p) => {
  if (!p?.p || !p?.a?.built_up) return '—';
  return `AED ${Math.round(p.p / p.a.built_up).toLocaleString()}`;
};

// ── Score Calculation ───────────────────────────────────────────────────────
export const calcScores = (p) => {
  const investmentScore = p.score ?? 25;
  const yieldScore      = 0;           // No yield data available mock
  const priceValue      = p.p ? Math.min(100, Math.round(4000000 / p.p * 30)) : 0;
  const areaSize        = p.a?.built_up ? Math.min(100, Math.round(p.a.built_up / 34)) : 0;
  const locationRating  = 50;
  const developerRep    = p.d?.toLowerCase().includes('emaar') ? 100 : (p.d?.toLowerCase().includes('damac') ? 57 : 70);
  return { investmentScore, yieldScore, priceValue, areaSize, locationRating, developerRep };
};

// ── Table Metrics ──────────────────────────────────────────────────────────
export const TABLE_METRICS = [
  { key: 'Price',            fn: p => fmtPrice(p.p),                          highlight: 'gold' },
  { key: 'Developer',        fn: p => p.d ?? '—',                             highlight: 'gold' },
  { key: 'Location',         fn: p => p.ci ?? '—' },
  { key: 'Type',             fn: p => p.tp?.sub ?? '—' },
  { key: 'Bedrooms',         fn: p => bedsStr(p.ur) },
  { key: 'Area (sqft)',      fn: p => p.a?.built_up?.toLocaleString() ?? '—', highlight: 'gold' },
  { key: 'Units Listed',     fn: p => p.ac?.toString() ?? '—',                highlight: 'gold' },
  { key: 'Completion',       fn: p => p.completion_pct != null ? `${p.completion_pct}%` : '0%', highlight: 'blue' },
  { key: 'Status',           fn: p => p.cs ?? '—',                            highlight: 'blue' },
  { key: 'Handover',         fn: p => p.cd ?? '—' },
  { key: 'Investment Score', fn: p => `${p.score ?? 25}` },
  { key: 'DLD Sales',        fn: (_p) => '—' },
  { key: 'Est. Yield',       fn: (_p) => '—' },
  { key: 'Price/sqft',       fn: p => priceSqft(p),                           highlight: 'gold' },
  { key: 'Payment Plan',     fn: p => handoverStr(p.pp) },
];

// ── Category Helpers ───────────────────────────────────────────────────────
export const getBestPrice = (projects) => {
  const valid = projects.filter(p => p.p);
  if (!valid.length) return null;
  return Math.min(...valid.map(p => p.p));
};
