import * as fs from 'fs';
import * as http from 'http';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');

server.on("request", (request, response) => {

  const { method, url: path, headers } = request;
  // const pathObj = url.parse(path);
  console.log(path);
  

  const { pathname, search } = path ? url.parse(path) : { pathname: 'index.html', search: '' };



  switch (pathname) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;

    case '/style.css':
      response.setHeader('Content-Type', 'text/css; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;

    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;

    default:
      response.statusCode = 404;
      response.end();
  }
});

server.listen(8888, () => {
  console.log(`服务器在 http://localhost:8888 端口`);

});