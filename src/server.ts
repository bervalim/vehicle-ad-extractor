import { createServer } from 'node:http';

const port = Number(process.env.PORT ?? 3000);

const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200);
    response.end(JSON.stringify({ status: 'ok', message: 'API funcionando!' }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ message: 'Rota não encontrada' }));
});

server.listen(port, () => {
  console.log(`API disponível em http://localhost:${port}`);
});
