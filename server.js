const http = require('http');
const { getPizzas, getPizzaById, createPizza } = require('./controllers/pizzaController');
const regex =  /\/api\/pizza-menu\/([0-9]+)/;
const server = http.createServer((req, res) => {
    if(req.url === '/api/pizza-menu' && req.method === 'GET') {
        getPizzas(req, res);
    } else if(req.url.match(regex) && req.method === 'GET') {
        const id = req.url.split('/')[3]; // /api/pizza-menu/1
        getPizzaById(req, res, id);
    } else if(req.url == "/api/pizza-menu" && req.method === "POST") {
        createPizza(req, res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: '404 Not Found'}));
    }
  
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));