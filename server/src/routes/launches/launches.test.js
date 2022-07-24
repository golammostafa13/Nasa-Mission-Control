const app = require('../../app');
const request = require('supertest');

describe('Test GET /launches', ()=>{
    test('It should respond 200 success', async ()=>{
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe('Test POST /launch', ()=>{
    const launchWithDate = {
        mission: 'abc',
        target: 'dbdd',
        launchDate: 'July 17, 2024',
        rocket: 'ddd'
    };

    const launchWithoutDate = {
        mission: 'abc',
        target: 'dbdd',
        rocket: 'ddd',
    }
    test("It should respond 201 success", async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(launchWithDate)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(launchWithDate.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(requestDate).toBe(responseDate);
        expect(response.body).toMatchObject(launchWithoutDate);
    });
    test("It should catche missing requirements", async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(launchWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({
            error: 'Missing launch information',
        })
    });


    const invalidLaunchDate = {
        mission: 'abc',
        target: 'dbdd',
        launchDate: 'rocket',
        rocket: 'ddd'
    }

    test("It should catch invalid dates", async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(invalidLaunchDate)
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({
            error: 'Invalid launch date',
        });
    });
});
