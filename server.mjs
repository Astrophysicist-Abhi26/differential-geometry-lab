import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function resolvePath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const pathname = decodeURIComponent(parsed.pathname);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let fullPath = join(root, safePath);
  if (pathname === "/" || !extname(fullPath)) fullPath = join(root, "index.html");
  return fullPath;
}

createServer((req, res) => {
  const fullPath = resolvePath(req.url || "/");

  if (!fullPath.startsWith(root) || !existsSync(fullPath) || statSync(fullPath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": mime[extname(fullPath)] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(fullPath).pipe(res);
}).listen(port, host, () => {
  console.log(`Differential Geometry Lab running at http://${host}:${port}`);
});
