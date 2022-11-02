import * as http from 'http';
import { REPL_MODE_SLOPPY } from 'repl';

const server = http.createServer();

server.on("request", (request, response) => {
  console.log('---request.method---');
  console.log(request.method);
  console.log('---request.url---');
  console.log(request.url);
  console.log('---request.headers---');
  console.log(request.headers);

  const array: any[] = [];

  // 通过监听 request 的 data 和 end 事件拿到 POST 请求的数据
  request.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
    array.push(chunk);
  });
  request.on('end', () => {
    const data = Buffer.concat(array).toString();
    console.log('---body---');
    console.log(data);

    response.statusCode = 404
    response.setHeader('who-create-the-server','tanghao')
    
    response.end('hi');
  });


  console.log('有人请求了');

});

server.listen(8888, () => {
  console.log(`服务器在 http://localhost:8888 端口`);

});