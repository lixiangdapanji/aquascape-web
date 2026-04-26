/**
 * generatePlantSvg — 320×200 botanical illustration SVG for a plant.
 *
 * Canonical implementation lives in aquascape-botany/js/plantSvg.ts.
 * This copy is kept in sync for use within the Next.js app where the
 * botany package is not available as a workspace dep.
 */

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------

function hex2rgb(h: string): [number, number, number] {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}
function rgb2hex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}
function lighten(h: string, t: number): string {
  const [r, g, b] = hex2rgb(h);
  return rgb2hex(r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t);
}
function darken(h: string, t: number): string {
  const [r, g, b] = hex2rgb(h);
  return rgb2hex(r * (1 - t), g * (1 - t), b * (1 - t));
}
function shortHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return (h >>> 0).toString(36).slice(0, 6);
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const W = 320, H = 200, GND = 172;

// ---------------------------------------------------------------------------
// Background
// ---------------------------------------------------------------------------

function waterBg(ns: string): string {
  return `<defs><linearGradient id="wbg-${ns}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071912"/><stop offset="1" stop-color="#0D2E1E"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#wbg-${ns})"/><rect x="0" y="${GND}" width="${W}" height="${H - GND}" fill="#0B1E15"/><path d="M0 ${GND} Q80 ${GND - 6} 160 ${GND} Q240 ${GND + 6} 320 ${GND}" stroke="#163526" stroke-width="1" fill="none"/>`;
}

// ---------------------------------------------------------------------------
// Growth-form illustrators
// ---------------------------------------------------------------------------

function stemIllustration(c: string, light: string, dark: string): string {
  const stems = [{ x: 126, h: 92 }, { x: 160, h: 108 }, { x: 194, h: 84 }];
  let g = "";
  for (const s of stems) {
    const top = GND - s.h;
    g += `<line x1="${s.x}" y1="${GND}" x2="${s.x}" y2="${top}" stroke="${dark}" stroke-width="2" stroke-linecap="round"/>`;
    let idx = 0;
    for (let y = GND - 14; y > top + 8; y -= 20) {
      idx++;
      const progress = (GND - y) / s.h;
      const lc = progress > 0.6 ? light : c;
      const lw = Math.round(17 - progress * 5);
      const lh = Math.max(3, Math.round(7 - progress * 2));
      const side = idx % 2 === 0 ? 1 : -1;
      g += `<ellipse cx="${s.x + side * 14}" cy="${y}" rx="${lw}" ry="${lh}" fill="${lc}" transform="rotate(${side * 32} ${s.x + side * 14} ${y})"/>`;
      g += `<ellipse cx="${s.x - side * 14}" cy="${y - 10}" rx="${lw - 2}" ry="${lh}" fill="${c}" transform="rotate(${-side * 32} ${s.x - side * 14} ${y - 10})"/>`;
    }
    g += `<ellipse cx="${s.x}" cy="${top}" rx="7" ry="5" fill="${light}"/>`;
  }
  return g;
}

function rosetteIllustration(c: string, light: string, dark: string): string {
  const cx = 160, cy = GND;
  const leaves = [
    { a: -82, len: 58, w: 8 }, { a: -60, len: 72, w: 11 },
    { a: -36, len: 80, w: 13 }, { a: -12, len: 68, w: 11 },
    { a: 12, len: 70, w: 11 }, { a: 36, len: 78, w: 13 },
    { a: 60, len: 68, w: 10 }, { a: 82, len: 52, w: 8 },
  ];
  let g = "";
  leaves.forEach(({ a, len, w }, i) => {
    const rad = (a * Math.PI) / 180;
    const mx = cx + Math.sin(rad) * (len / 2);
    const my = cy - Math.cos(rad) * (len / 2);
    const col = i === 2 || i === 5 ? light : c;
    g += `<ellipse cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" rx="${w}" ry="${(len / 2).toFixed(1)}" fill="${col}" transform="rotate(${a} ${mx.toFixed(1)} ${my.toFixed(1)})"/>`;
    const tx = cx + Math.sin(rad) * len, ty = cy - Math.cos(rad) * len;
    g += `<line x1="${cx}" y1="${cy}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="${dark}" stroke-width="0.8" opacity="0.5"/>`;
  });
  return g;
}

function carpetIllustration(c: string, light: string, dark: string): string {
  let g = "";
  [95, 120, 146, 170, 196, 220, 244].forEach((x) => {
    g += `<ellipse cx="${x}" cy="${GND - 22}" rx="20" ry="12" fill="${dark}" opacity="0.75"/>`;
  });
  [105, 130, 154, 178, 202, 228].forEach((x) => {
    g += `<ellipse cx="${x}" cy="${GND - 14}" rx="22" ry="13" fill="${c}"/>`;
  });
  [112, 138, 162, 186, 212].forEach((x) => {
    g += `<ellipse cx="${x}" cy="${GND - 7}" rx="18" ry="10" fill="${light}" opacity="0.8"/>`;
  });
  return g;
}

function epiphyteIllustration(c: string, light: string, dark: string): string {
  let g = "";
  g += `<path d="M105 ${GND} L100 ${GND - 16} L128 ${GND - 22} L162 ${GND - 20} L188 ${GND - 14} L192 ${GND} Z" fill="#0F2820" stroke="#163526" stroke-width="1"/>`;
  const ry = GND - 13;
  g += `<line x1="115" y1="${ry}" x2="185" y2="${ry}" stroke="${dark}" stroke-width="3" stroke-linecap="round"/>`;
  const leafData = [
    { x: 122, a: -78, len: 58, w: 13 }, { x: 138, a: -52, len: 74, w: 16 },
    { x: 158, a: -86, len: 84, w: 18 }, { x: 172, a: -62, len: 68, w: 15 },
    { x: 183, a: -38, len: 52, w: 13 },
  ];
  leafData.forEach(({ x, a, len, w }, i) => {
    const rad = (a * Math.PI) / 180;
    const mx = x + Math.sin(rad) * (len / 2);
    const my = ry - Math.cos(rad) * (len / 2);
    const col = i === 2 ? c : light;
    g += `<ellipse cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" rx="${w}" ry="${(len / 2).toFixed(1)}" fill="${col}" transform="rotate(${a} ${mx.toFixed(1)} ${my.toFixed(1)})"/>`;
    const tx = x + Math.sin(rad) * len, ty = ry - Math.cos(rad) * len;
    g += `<line x1="${x}" y1="${ry}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="${dark}" stroke-width="1" opacity="0.55"/>`;
  });
  return g;
}

function mossIllustration(c: string, light: string, dark: string): string {
  let g = "";
  [[138, 155, 42, 22], [174, 153, 40, 20], [154, 145, 38, 19], [132, 142, 30, 16], [178, 142, 32, 17], [154, 135, 28, 15]].forEach(([cx, cy, rx, ry]) => {
    g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${dark}" opacity="0.7"/>`;
  });
  [[144, 148, 34, 16], [170, 146, 32, 15], [155, 138, 30, 14]].forEach(([cx, cy, rx, ry]) => {
    g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}" opacity="0.85"/>`;
  });
  [[148, 142, 22, 10], [168, 140, 20, 9], [155, 133, 18, 8]].forEach(([cx, cy, rx, ry]) => {
    g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${light}" opacity="0.6"/>`;
  });
  [[145, 142, 130, 122], [155, 136, 152, 118], [164, 140, 172, 122], [172, 143, 182, 127], [147, 140, 138, 124]].forEach(([x1, y1, x2, y2]) => {
    g += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${light}" stroke-width="1.5" stroke-linecap="round" opacity="0.65"/>`;
    g += `<circle cx="${x2}" cy="${y2}" r="2.5" fill="${light}" opacity="0.55"/>`;
  });
  return g;
}

function floatingIllustration(c: string, light: string, dark: string): string {
  let g = "";
  g += `<path d="M0 42 Q80 36 160 42 Q240 48 320 42" stroke="#1E4A35" stroke-width="1.2" fill="none" opacity="0.5"/>`;
  [{ cx: 118, cy: 33, rx: 40, ry: 22 }, { cx: 192, cy: 30, rx: 33, ry: 18 }, { cx: 156, cy: 26, rx: 27, ry: 15 }].forEach(({ cx, cy, rx, ry }) => {
    g += `<line x1="${cx}" y1="${cy + ry}" x2="${cx}" y2="${GND - 8}" stroke="${dark}" stroke-width="1" stroke-dasharray="4 4" opacity="0.35"/>`;
    g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/>`;
    for (let a = 0; a < 360; a += 45) {
      const rad = (a * Math.PI) / 180;
      g += `<line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(rad) * rx * 0.88).toFixed(1)}" y2="${(cy + Math.sin(rad) * ry * 0.88).toFixed(1)}" stroke="${dark}" stroke-width="0.8" opacity="0.4"/>`;
    }
    g += `<ellipse cx="${cx - rx * 0.2}" cy="${cy - ry * 0.3}" rx="${rx * 0.45}" ry="${ry * 0.4}" fill="${light}" opacity="0.35"/>`;
  });
  return g;
}

function rhizomeIllustration(c: string, light: string, dark: string): string {
  let g = "";
  const rz = GND - 8;
  g += `<line x1="88" y1="${rz}" x2="232" y2="${rz}" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>`;
  [100, 120, 140, 160, 180, 200, 218].forEach((x, i) => {
    const h = 50 + (i % 3) * 20;
    const col = i % 2 === 0 ? c : light;
    g += `<line x1="${x}" y1="${rz}" x2="${x}" y2="${rz - h}" stroke="${dark}" stroke-width="2" stroke-linecap="round"/>`;
    g += `<ellipse cx="${x}" cy="${rz - h / 2}" rx="6" ry="${h / 2 + 2}" fill="${col}" opacity="0.85"/>`;
  });
  return g;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type GrowthForm = "stem" | "rosette" | "carpeting" | "epiphyte" | "moss" | "floating" | "rhizome";

export function generatePlantSvg(growthForm: GrowthForm | string, colorHex: string): string {
  const ns = shortHash(growthForm + colorHex);
  const light = lighten(colorHex, 0.32);
  const dark = darken(colorHex, 0.28);

  let body: string;
  switch (growthForm) {
    case "stem":      body = stemIllustration(colorHex, light, dark); break;
    case "rosette":   body = rosetteIllustration(colorHex, light, dark); break;
    case "carpeting": body = carpetIllustration(colorHex, light, dark); break;
    case "epiphyte":  body = epiphyteIllustration(colorHex, light, dark); break;
    case "moss":      body = mossIllustration(colorHex, light, dark); break;
    case "floating":  body = floatingIllustration(colorHex, light, dark); break;
    case "rhizome":   body = rhizomeIllustration(colorHex, light, dark); break;
    default:          body = rosetteIllustration(colorHex, light, dark);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n${waterBg(ns)}\n${body}\n</svg>`;
}

export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
