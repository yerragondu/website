const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript',
  '.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403).end('no'); return; }
  fs.readFile(f, (e,d)=>{
    if (e) { res.writeHead(404, {'Content-Type':'text/plain'}).end('404'); return; }
    res.writeHead(200, {'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream'});
    res.end(d);
  });
}).listen(4321, ()=>console.log('serving on http://localhost:4321'));
