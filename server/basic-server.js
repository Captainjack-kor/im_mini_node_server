const http = require('http');

const PORT = 5000;

const ip = 'localhost';

const server = http.createServer((request, response) => {
  
  // 여기서의 request는 client에서 온 요청이다.
   
   if (request.method === 'POST') {
     if (request.url === '/lower') { 	 
       let data = ''; 
       request.on('data', chunk => { 
         data += chunk;
       })
       request.on('end', () => {
         data = data.toLowerCase();
         response.writeHead(201, defaultCorsHeader);
         response.end(JSON.stringify(data));
       });
     } else if (request.url === '/upper') {
       let data = '';
       request.on('data', chunk => {
         data += chunk;
       });
       request.on('end', () => {
         data = data.toUpperCase();
         response.writeHead(201, defaultCorsHeader);
         response.end(JSON.stringify(data));
       });
     } else {
       response.writeHead(404, defaultCorsHeader); 
       response.end();
     }
   }

   if (request.method === 'OPTIONS') {
     response.writeHead(200, defaultCorsHeader);
     response.end();
   }
 });

  // console.log(
  //   `http request method is ${request.method}, url is ${request.url}`
  // );
  //response.writeHead(200, defaultCorsHeader);
  //response.end('hello mini-server sprints');


server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': 10
};
