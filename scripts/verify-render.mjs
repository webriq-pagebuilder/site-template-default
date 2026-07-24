#!/usr/bin/env node
// verify-render.mjs — mechanical frontend-parity gate: the RENDERED app page vs the RENDERED mockup.
// Catches the failure classes prose can't: dropped copy/cards (R1), broken/missing images (R2),
// missing brand colors — e.g. an accent that never got applied (R3), collapsed spacing (R4).
//
// Usage: node scripts/verify-render.mjs <appUrl> <mockupHtmlPath>
//   e.g. node scripts/verify-render.mjs http://localhost:3000/ docs/mockups/homepage.html
// Exit 0 = all PASS. Requires playwright (repo dependency) + Chrome/Chromium.

import { chromium } from "playwright";
import path from "node:path";

const [appUrl, mockupPath] = process.argv.slice(2);
if (!appUrl || !mockupPath) {
  console.error("usage: node scripts/verify-render.mjs <appUrl> <mockupHtmlPath>");
  process.exit(2);
}

const norm = (s) =>
  s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
   .replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

async function capture(page) {
  // open collapsed disclosure widgets so their content counts as rendered, then scroll for lazy imgs
  await page.evaluate(async () => {
    document.querySelectorAll("details").forEach((d) => (d.open = true));
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    const text = document.body.innerText;
    const imgs = [...document.querySelectorAll("img")].map((e) => e.naturalWidth > 0);
    const imgSrcs = [...new Set([...document.querySelectorAll("img")].filter((e) => e.naturalWidth > 0).map((e) => e.src))];
    const colors = {};
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      for (const c of [cs.color, cs.backgroundColor]) {
        const m = c && c.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
        if (!m) continue;
        if (m[4] !== undefined && parseFloat(m[4]) < 0.5) continue; // ignore near-transparent
        const key = `${m[1]},${m[2]},${m[3]}`;
        colors[key] = (colors[key] || 0) + 1;
      }
    }
    return { text, imgs, imgSrcs, colors, height: document.body.scrollHeight };
  });
}

const isGrayish = (key) => {
  const [r, g, b] = key.split(",").map(Number);
  return Math.max(r, g, b) - Math.min(r, g, b) < 26; // white/gray/black family
};
const close = (a, b, tol = 14) =>
  a.split(",").every((v, i) => Math.abs(Number(v) - Number(b.split(",")[i])) <= tol);

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); }
catch { browser = await chromium.launch(); }

const app = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await app.goto(appUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
await app.waitForTimeout(9000); // client-side sections paint

const mock = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await mock.goto("file://" + path.resolve(mockupPath), { waitUntil: "load", timeout: 60000 });
await mock.waitForTimeout(12000); // bundler snapshot self-hydrates (babel compile)

const A = await capture(app);
const M = await capture(mock);
await browser.close();

let fails = 0;
const fail = (m) => { console.log("FAIL  " + m); fails++; };
const pass = (m) => console.log("PASS  " + m);

// R1 — text parity: every significant mockup line must render in the app.
// Case-insensitive: CSS text-transform differences (uppercase eyebrows/badges) are styling, not data.
const appText = norm(A.text).toLowerCase();
const mockLines = [...new Set(
  M.text.split("\n").map(norm).filter((l) => l.length >= 10 && !/^__bundler/.test(l))
)];
const missing = mockLines.filter((l) => !appText.includes(l.toLowerCase()));
if (missing.length === 0) pass(`R1 text parity: all ${mockLines.length} mockup lines render in the app`);
else fail(`R1 ${missing.length}/${mockLines.length} mockup text lines MISSING from the app:\n` +
  missing.slice(0, 12).map((l) => `        - ${l.slice(0, 90)}`).join("\n"));

// R2 — images: none broken; app shows at least as many as the mockup
const brokenA = A.imgs.filter((ok) => !ok).length;
if (brokenA === 0) pass(`R2 images: ${A.imgs.length} rendered, 0 broken`);
else fail(`R2 ${brokenA}/${A.imgs.length} app images broken (naturalWidth 0 after scroll)`);
// unique sources (marquee/loop duplication in either page shouldn't skew the count)
const mockUnique = M.imgSrcs.length;
const appUnique = A.imgSrcs.length;
if (appUnique >= mockUnique) pass(`R2 unique images: app ${appUnique} >= mockup ${mockUnique}`);
else fail(`R2 app renders ${appUnique} unique images but the mockup renders ${mockUnique}`);

// R3 — palette: the mockup's signature (non-gray, recurring) colors must be painted in the app
const sig = Object.entries(M.colors)
  .filter(([k, n]) => n >= 3 && !isGrayish(k))
  .map(([k]) => k);
const appKeys = Object.keys(A.colors);
const missingColors = sig.filter((k) => !appKeys.some((ak) => close(ak, k)));
if (missingColors.length === 0) pass(`R3 palette: all ${sig.length} mockup signature colors are painted in the app`);
else fail(`R3 mockup colors never painted in the app: ${missingColors.map((k) => `rgb(${k})`).join(", ")}`);

// R4 — spacing sanity: total page height within 25% of the mockup (collapsed sections detector)
const ratio = A.height / M.height;
if (ratio > 0.75 && ratio < 1.35) pass(`R4 page height: app ${A.height}px vs mockup ${M.height}px (ratio ${ratio.toFixed(2)})`);
else fail(`R4 page height ratio ${ratio.toFixed(2)} (app ${A.height}px vs mockup ${M.height}px) — sections collapsed or spacing off`);

console.log("----");
console.log(fails === 0 ? "RESULT: ALL PASS" : `RESULT: ${fails} FAIL(S)`);
process.exit(fails === 0 ? 0 : 1);
