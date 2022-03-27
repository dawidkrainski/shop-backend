// importuję http
const http = require('http');

// importuję apkę
const app = require('./app');

// wyznaczam nr portu
const port = process.env.port || 3000;

// tworzę serwer
const server = http.createServer(app);

// odpalam serwer
server.listen(port);
