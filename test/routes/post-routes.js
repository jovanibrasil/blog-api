const jwt = require("jwt-simple");
const User = require("../../src/models/User");
const Post = require("../../src/models/Post");
const cfg = require("../../src/configs/security/sec-config");

describe("Routes: posts", () => {
  let token;
  let fakePost;

  beforeEach(() => {
    return new Promise(done => {
      User.destroy({ where: {} })
        .then(() =>
          User.create({
            name: "user",
            email: "user@email.com",
            age: "28",
            password: "123456"
          })
        )
        .then(user => {
          Post.destroy({ where: {} })
            .then(() =>
              Post.bulkCreate([
                {
                  id: 1,
                  title: "title 1",
                  content: "content 1",
                  user_id: user.id
                },
                {
                  id: 2,
                  title: "title 2",
                  content: "content 2",
                  user_id: user.id
                }
              ])
            )
            .then(posts => {
              fakePost = posts[0];
              token = jwt.encode({ id: user.id }, cfg.jwtSecret);
              done();
            });
        });
    });
  });

  describe("GET /posts", () => {
    describe("status 200", () => {
      it("returns a list of posts", done => {
        request
          .get("/posts")
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.eql("title 1");
            expect(res.body[1].title).to.eql("title 2");
            done(err);
          });
      });
    });
  });

  describe("POST /posts/", () => {
    describe("status 200", () => {
      it("creates a new post", done => {
        request
          .post("/posts")
          .set("Authorization", `Bearer ${token}`)
          .send({ title: "title", content: "content" })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("title");
            expect(res.body.content).to.be.eql("content");
            done(err);
          });
      });
    });
  });

  describe("GET /posts/:id", () => {
    describe("status 200", () => {
      it("returns one posts", done => {
        request
          .get(`/posts/${fakePost.id}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("title 1");
            expect(res.body.content).to.be.eql("content 1");
            done(err);
          });
      });
    });

    describe("status 404", () => {
      it("throws error when post not exist", done => {
        request
          .get("/posts/0")
          .set("Authorization", `Bearer ${token}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });

  describe("PUT /posts/:id", () => {
    describe("status 200", () => {
      it("updates a post", done => {
        request
          .put(`/posts/${fakePost.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "title",
            content: "content"
          })
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe("DELETE /post/:id", () => {
    describe("status 200", () => {
      it("removes a post", done => {
        request
          .delete(`/posts/${fakePost.id}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
