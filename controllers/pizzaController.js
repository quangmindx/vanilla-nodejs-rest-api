const Pizzas = require('../models/pizzaMenuModel');


// @desc GET all pizzas
// @route GET /api/pizza-menu
async function getPizzas(req, res) {
    try {
        const pizzas = await Pizzas.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(pizzas));
    } catch(err) {
        console.log(err);
    }
}

// @desc GET single pizza
// @route GET /api/pizza-menu/:id
async function getPizzaById(req, res, id) {
    try {
        const pizza = await Pizzas.findById(id);
        if(!pizza) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Pizza Not Found'}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(pizza));
        }   
    } catch(err) {
        console.log(err);
    }
}


// @desc Create a Pizza
// @route POST /api/pizza-menu
async function createPizza(req, res) {
    try {
        

        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const { name, image, price, size } = JSON.parse(body);;

            const pizza = {
                name,
                image,
                price,
                size
            };

            const newPizza = await Pizzas.create(pizza);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(newPizza));
        })

    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getPizzas,
    getPizzaById,
    createPizza
}