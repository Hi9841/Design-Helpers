// Minimal static server for local preview of dist/.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { extname, normalize, join } from "node:path";

const root = fileURLToPath(new URL("dist/", import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  const path = new URL(request.url ?? "/", "http://localhost").pathname;
  const file = normalize(join(root, path === "/" ? "index.html" : path));
  if (!file.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  let body;
  try {
    body = await readFile(file);
  } catch {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(body);
}).listen(port, () => console.log(`http://localhost:${port}`));
