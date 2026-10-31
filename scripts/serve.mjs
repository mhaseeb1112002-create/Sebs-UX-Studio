import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..', 'dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' };
export function serve(port = 4173) {
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let f = path.join(root, p);
    if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { console.error('404', req.url); f = path.join(root, '404.html'); res.statusCode = 404; if (!fs.existsSync(f)) { res.end('not found'); return; } }
    res.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream');
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => srv.listen(port, () => r(srv)));
}
if (import.meta.url === `file://${process.argv[1]}`) { await serve(+process.env.PORT || 4173); console.log('serving dist'); }
