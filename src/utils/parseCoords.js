export const inBahrain = (lat, lng) =>
  Number.isFinite(lat) && Number.isFinite(lng) &&
  lat >= 25.7 && lat <= 26.5 && lng >= 50.3 && lng <= 50.9;

export const gmapsLink = (lat, lng) =>
  `https://www.google.com/maps?q=${(+lat).toFixed(6)},${(+lng).toFixed(6)}`;

export const copyText = async (t) => {
  try { await navigator.clipboard.writeText(t); return true; } catch { return false; }
};

const N = "(-?\\d{1,3}(?:\\.\\d+)?)";
const RES = [
  new RegExp(`!3d${N}!4d${N}`),
  new RegExp(`@${N},${N}`),
  new RegExp(`[?&](?:q|query|ll|center|destination|daddr)=${N},[+\\s]*${N}`, "i"),
  new RegExp(`^\\s*${N}\\s*,\\s*${N}\\s*$`),
];

const decode = (s) => {
  for (let i = 0; i < 2; i++) {
    try { s = decodeURIComponent(s); } catch { break; }
  }
  return s;
};

export function parseCoords(input = "") {
  const s = decode(String(input));
  for (const re of RES) {
    const m = s.match(re);
    if (!m) continue;
    const latitude = +m[1], longitude = +m[2];
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) continue;
    const n = s.match(/\/place\/([^/@?]+)/);
    return { latitude, longitude, name: n ? n[1].replace(/\+/g, " ") : "" };
  }
  return null;
}