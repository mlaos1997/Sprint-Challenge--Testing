const db = require('../data/dbConfig');

module.exports = {
    getAll,
    insert,
    findById
};

function getAll() {
    return db('games');
}

async function insert(game) {
    const [id] = await db('games').insert(game);
    return findById(id);
};

function findById(id) {
    return db('games').where({ id }).first();
};
