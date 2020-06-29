module.exports = app => {
    return {
        findAll: (params, callback) => {
            return callback(
                [
                    { title: "Buy a new computer" },
                    { title: "Fix my old PC" }
                ]
            );
        }
    };
};