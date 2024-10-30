const request = require('supertest');
const app = require('./server');

describe('POST /register', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                username: "newuser",
                email: "newuser@example.com",
                password: "password123",
                bio: "This is a test user.",
                profile_picture_url: "http://example.com/profile-pic.jpg", 
                tags: "newby"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user_id'); 
    });

    it('should return 400 if email is already in use', async () => {
        await request(app)
            .post('/register')
            .send({
                username: "duplicateuser",
                email: "existing@example.com",
                password: "password123",
                bio: "Bio for duplicate user.",
                profile_picture_url: "http://example.com/profile-pic.jpg",
                tags: "newby"
            });

        const res = await request(app)
            .post('/register')
            .send({
                username: "anotheruser",
                email: "existing@example.com", 
                password: "password123",
                bio: "Bio for another user.",
                profile_picture_url: "http://example.com/profile-pic-another.jpg",
                tags: "newby"
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Email already in use.');
    });
});
