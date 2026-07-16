// Submits every URL in public/sitemap.xml to IndexNow (Bing, Yandex, Seznam, Naver, Yep).
// Run after each deploy: `npm run indexnow` (add --dry-run to preview without submitting).
// The key file must already be deployed at https://<host>/<key>.txt or engines reject the ping.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HOST = "cool-desk.com";
const API = "https://api.indexnow.org/indexnow";

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

// The key file is a 32-hex-char .txt in public/ whose content equals its basename.
const keyFile = readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
    console.error("No IndexNow key file (32-hex-char .txt) found in public/");
    process.exit(1);
}
const key = path.basename(keyFile, ".txt");
if (readFileSync(path.join(publicDir, keyFile), "utf8").trim() !== key) {
    console.error(`Key file ${keyFile} content does not match its filename`);
    process.exit(1);
}

const sitemap = readFileSync(path.join(publicDir, "sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
    console.error("No <loc> URLs found in public/sitemap.xml");
    process.exit(1);
}

console.log(`Submitting ${urlList.length} URLs for ${HOST} (key ${key.slice(0, 8)}…)`);
urlList.forEach((u) => console.log(`  ${u}`));

if (process.argv.includes("--dry-run")) {
    console.log("Dry run — nothing submitted.");
    process.exit(0);
}

const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${keyFile}`,
        urlList,
    }),
});

// 200 = submitted, 202 = accepted (key verification pending). Anything else is a failure.
if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted the submission (HTTP ${res.status}).`);
} else {
    console.error(`IndexNow rejected the submission: HTTP ${res.status} ${res.statusText}`);
    console.error(await res.text());
    process.exit(1);
}
