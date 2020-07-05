const jwt = require('jwt-simple');
const User = require('../../src/models/User');
const Task = require('../../src/models/Task');
const cfg = require('../../src/configs/security/sec-config');

describe('Routes: Tasks', () => {

    let token;
    let fakeTask;

    beforeEach(() => {
        return new Promise((done) => {
            
            User.destroy({where: {}})
                .then(() => User.create({
                    name: "user",
                    email: "user@email.com",
                    age: "28",
                    password: "123456"
                }))
                .then(user => {
                    Task.destroy({where: {}})
                    .then(() => Task.bulkCreate([{
                        id: 1,
                        title: "Work",
                        user_id: user.id,
                        done: false
                    }, {
                        id: 2,
                        title: "Study",
                        user_id: user.id,
                        done: false
                    }]))
                    .then(tasks => {
                        fakeTask = tasks[0];
                        token = jwt.encode(
                            { id: user.id }, 
                            cfg.jwtSecret
                        );
                        done();
                    });
                });
        });
    });

    describe("GET /tasks", () => {

        describe("status 200", () => {

            it("returns a list of tasks", done => {
                request.get("/tasks")
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql("Work");
                        expect(res.body[1].title).to.eql("Study");
                        done(err);
                    });
            });

        });

    });

    describe("POST /tasks/", () => {

        describe("status 200", () => {

            it("creates a new task", done => {
                request.post("/tasks")
                    .set("Authorization", `Bearer ${token}`)
                    .send({ title: "Run" })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Run");
                        expect(res.body.done).to.be.false;
                        done(err);
                    });
            });

        });

    });

    describe("GET /tasks/:id", () => {

        describe("status 200", () => {
            it("returns one tasks", done => {
                request.get(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Work");
                        expect(res.body.done).to.be.false;
                        done(err);
                    });
            });
        })

        describe("status 404", () => {
            it("throws error when task not exist", done => {
                request.get("/tasks/0")
                    .set("Authorization", `Bearer ${token}`)
                    .expect(404)
                    .end((err, res) => {
                        done(err);
                    });
            });
        });

    });

    describe("PUT /tasks/:id", () => {

        describe("status 200", () => {

            it("updates a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .send({
                        title: "Travel", done: true
                    })
                    .expect(204)
                    .end((err, res) => done(err));
            });

        })

    });
   
    describe("DELETE /tasks/:id", () => {

        describe("status 200", () => {

            it("removes a task", done => {
                request.delete(`/tasks/${fakeTask.id}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            });

        })

    });

});