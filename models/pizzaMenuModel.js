const pizzas = require('../data/pizza-menu.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(pizzas);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const pizza = pizzas.find(p => p._id['$oid'] === id)
        resolve(pizza);
    })
}

function create(pizza) {
    return new Promise((resolve, reject) => {
        const newPizza = {_id: {$oid: uuidv4()}, ...pizza};
        pizzas.push(newPizza);
        writeDataToFile('./data/pizza-menu.json', pizzas);
        resolve(newPizza);
    })
}

module.exports = {
    findAll,
    findById,
    create
}