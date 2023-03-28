const {Router} = require('express');
const {Service} = require('../db');
const router = Router();
const Sequelize  = require('sequelize');
const { Op } = require("sequelize");

router.post('/add-service', async(req, res)=>{
    const {name, description, cost, orderId} = req.body;
    try{
        const service = await Service.create({
            name,
            description,
            cost
        })
        await service.setOrder(orderId);
        return res.sendStatus(200);
    }catch(err){
        return res.sendStatus(400)
    }
});

router.get('/service', async(req, res)=> {
    const {orderId} = req.query;
    if(orderId){
        const service = await Service.findAll({
            where:{
                orderId: orderId
            }
        });
        return service ? res.json(service) : res.sendStatus(400);
    } else{
        const service = await Service.findAll();
        return service ? res.json(service) : res.sendStatus(400);
    }
});

module.exports = router;