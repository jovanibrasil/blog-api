const User = require('../../src/models/User');

describe("Routers: Token", () => {

    describe("POST /token", () => {

        beforeEach(() => {
            return new Promise((done) => {
                User.destroy({where: {}})
                    .then(() => {
                        User.create({
                            name: "user",
                            email: "user@email.com",
                            age: "28",
                            password: "123456"
                        });
                        done();
                    });
            });
        });

        describe("status 200", () => {

            it("returns authenticated user token", done => {
                request.post("/token")
                    .send({
                        email: "user@email.com",
                        password: "123456"
                    })
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token");
                        done(err);
                    });
            });

        });

        describe("status 401", () => {

            it("throws error when password is incorrect", done => {
                request.post("/token")
                    .send({
                        email: "user@gmail.com",
                        password: "INCORRECT_PASSWORD"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });

            it("throws email when emails not exists", done => {
                request.post("/token")
                .send({
                    email: "EMAIL_NOT_EXISTS",
                    password: "INCORRECT_PASSWORD"
                })
                .expect(401)
                .end((err, res) => {
                    done(err);
                });
            });

            it("throws error when email and password are blank", done => {
                request.post("/token")
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });

        });

    });

});