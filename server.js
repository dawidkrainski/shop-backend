// importuję http
// import http form "http"; - działa od wersji 16.0 node.js

const http = require('http');
const app = require('./app')  // import app.js

// wyznaczam nr portu
const port = process.env.port || 3000;

// tworzę serwer
const server = http.createServer(app); // app oznacza opcje serwera

//odpalam serwer
server.listen(port);
