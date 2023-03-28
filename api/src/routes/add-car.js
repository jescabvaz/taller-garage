const {Router} = require('express');
const {Car, Client} = require('../db');
const router = Router();
const Sequelize  = require('sequelize');
const { Op } = require("sequelize");

router.post('/add-car', async (req, res) => {
    const {make, model, year, color, serie, id} = req.body;
    console.log(make, model, year, color, serie, id)
    try{
       const addCar = await Car.create({
        make,
        model,
        year,
        color,
        serie
        });
        await addCar.setClient(id);
        return res.sendStatus(200);

    } catch(err){
       return res.sendStatus(400);
    }
});

router.get('/cars', async (req, res) => {
    const {make, model, serie, year, clientId} = req.query;
   if(make){
        const car = await Car.findAll(
            {
                where: {
                    make: {
                        [Op.iLike]: `%${make}`
                    }
                }
            }
        )
        return car ? res.json(car) : res.sendStatus(400)
    }
    else if(model){
        const car = await Car.findAll(
            {
              where: {
                model: {
                    [Op.iLike]: `%${model}`
                }
              }  
            }
        )
        return car ? res.json(car) : res.sendStatus(400)
    }
    else if(serie){
        const car = await Car.findAll(
            {
              where: {
                serie: {
                    [Op.iLike]: `%${serie}`
                }
              }  
            }
        )
        return car ? res.json(car) : res.sendStatus(400)
    }
    else if(year){
        const car = await Car.findAll(
            {
              where: {
                year: {
                    [Op.iLike]: `%${year}`
                }
              }  
            }
        )
        return car ? res.json(car) : res.sendStatus(400)
    }
    else if(clientId){
        const id = parseInt(clientId);
        const car = await Car.findAll(
            {
                where: {
                    clientId: id
                }
            },
        )
        return car ? res.json(car) : res.sendStatus(400)
    }
    else {
        const car = await Car.findAll();
        return car ? res.json(car) : res.sendStatus(400)
    }
})


module.exports = router;