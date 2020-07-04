
describe("Routes: users-routes", () => {
    describe("GET /users", () => {
        it("Returns all created users", done => {
            request.get("/users")
                .expect(200)
                .end((err, res) => {
                expect(res.body).is.not.empty;
                done(err);
            });
        });
    });
})