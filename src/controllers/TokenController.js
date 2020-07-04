const User = require('../models/User');
const jwt = require('jwt-simple');
const cfg = require('../configs/security/sec-config');

module.exports = {

    async getToken(req, res){
        if(req.body.email && req.body.password){
            const email = req.body.email;
            const password = req.body.password;
            User.findOne({where: {email}})
                .then(user => {
                    if(user.isPassword(user.password, password)){
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);            
                    }
                })
                .catch(error => res.sendStatus(401));
        } else {
            res.sendStatus(401);
        }

    }

}