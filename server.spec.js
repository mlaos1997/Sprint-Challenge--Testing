const request = require('supertest');
const server = require('./server.js');

const db = require('./data/dbConfig.js');

describe('GET /games', () => {

    afterEach(async() => {
        await db('games').truncate();
    });

    it('always returns an array', async() => {
        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
        expect(res.body.games).toEqual([]);
    });

    it('returns array of games stored in the database', async() => {
        const games = [
            {
                id: 1,
                title: 'Call of Duty 5',
                genre: 'First Person Shooter',
                releaseYear: 2008
            }, {
                id: 2,
                title: 'GTA 5',
                genre: 'Some Genre',
                releaseYear: 2013
            }
        ];

        await db('games').insert(games);

        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
        expect(res.body.games).toEqual(games);
    });
    
    it('should return JSON', async () => {
        const res = await request(server).get('/games');
        expect(res.type).toBe('application/json');
    })
});

describe('POST /games', () => {
    
    afterEach(async() => {
        await db('games').truncate();
    });

    it('returns a status code of 200 when correct data is sent', async() => {
        const newGame = {
            id: 1,
            title: 'Call of Duty 4',
            genre: 'First Person',
            releaseYear: 2007
        };

        const res = await request(server).post('/games').send({...newGame}).set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
    it('returns a status code of 422 when field(s) are missing', async () => {
        const newGame = {
            id: 1,
            title: 'Apex Legends'
        } ;

        const res = await request(server).post('/games').send({...newGame});
        expect(res.status).toBe(422);
    });

    it('should return JSON', async () => {
        const res = await request(server).get('/games');
        expect(res.type).toBe('application/json');
    })
});