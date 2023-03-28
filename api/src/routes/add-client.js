const {Router} = require('express');
const {Client} = require('../db');
const router = Router();
const Sequelize  = require('sequelize');
const { Op } = require("sequelize");

router.post('/add-client', async (req, res) => {
    const {name , address, phone, email} = req.body;
    try{
       await Client.create({
          name,
          address, 
          phone, 
          email  
        });
        return res.sendStatus(200);

    } catch(err){
       return res.sendStatus(400);
    }
});

router.get('/clients', async (req, res) => {
    const {name} = req.query;
    if(name){
        const client = await Client.findAll(
            {
                where: {
                    name: {
                        [Op.iLike]: `%${name}`
                    }
                }
            }
        )
        return client ? res.json(client) : res.sendStatus(400)
    }
    else{
        const clients = await Client.findAll();
        return clients ? res.json(clients) : res.sendStatus(400)
    }
})


module.exports = router;