const express = require('express');
const helmet = require('helmet');

const server = express();

const Games = require('./games/gamesModel.js');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res
        .status(200)
        .json({api: 'up'})
});

server.get('/games', async(req, res) => {
    const games = await Games.getAll();
    res
        .status(200)
        .json({games});
});

server.post('/games', async(req, res) => {
    try {
        const {title, genre, releaseYear} = req.body;
        if (!title || !genre || !releaseYear) {
             res
                .status(422)
                .json({message: 'Information is incomplete, please fill out all fields'})
        } else {
            await Games.insert(req.body);
            return res
                .status(200)
                .json({message: 'game has been added'})
        }
    } catch (err) {
        return res
            .status(500)
            .json({err});
    }
});

module.exports = server;