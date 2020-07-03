const User = require('../models/User');
const jwt = require('jwt-simple');
const cfg = require('../configs/security/sec-config');

module.exports = {

    async getToken(req, res){
        console.log("Autenticando ..." + req.body.email)
        if(req.body.email && req.body.password){
            const email = req.body.email;
            const password = req.body.password;
            User.findOne({where: {email}})
                .then(user => {
                    console.log(user);
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