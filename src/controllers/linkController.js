import { parseCoords } from "../utils/parseCoords.js";

// Strict allow-list: google.com / google.xx / google.com.xx / goo.gl / g.co (and their subdomains)
const ALLOWED = /^(?:[a-z0-9-]+\.)*(?:google\.(?:com|[a-z]{2})(?:\.[a-z]{2})?|goo\.gl|g\.co)$/i;
const bad = (res, message) => res.status(400).json({ success: false, message });

export const resolveLink = async (req, res, next) => {
  try {
    let u;
    try { u = new URL(String(req.query.url || "").trim()); } catch { return bad(res, "Invalid link"); }
    if (!/^https?:$/.test(u.protocol) || !ALLOWED.test(u.hostname)) return bad(res, "Not a Google Maps link");

    let c = parseCoords(u.href);
    if (!c) {
      const r = await fetch(u.href, {
        redirect: "follow",
        signal: AbortSignal.timeout(6000),
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!ALLOWED.test(new URL(r.url).hostname)) return bad(res, "Not a Google Maps link");
      c = parseCoords(r.url);
      if (!c) c = parseCoords((await r.text()).slice(0, 300000));
    }
    if (!c) return bad(res, "Couldn't find coordinates in this link");

    res.json({ success: true, data: c });
  } catch (err) {
    next(err);
  }
};