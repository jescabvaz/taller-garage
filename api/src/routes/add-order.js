const {Router} = require('express');
const { Order } = require('../db');
const router = Router();


router.post('/add-order', async (req, res) => {
    const {km, gasLevel, reason, admissionDate, totalCost, carId  } = req.body;
    try{
        const order = await Order.create({
            km,
            gasLevel, 
            reason, 
            admissionDate, 
            totalCost
        });
        await order.setCar(carId);
        return res.sendStatus(200);
    } catch(err){
        return res.sendStatus(400);
    }

});

router.get('/orders', async (req, res)=>{
    const {carId} = req.query;

    if(carId){
        const id = parseInt(carId)
        const order = await Order.findAll(
            {
                where:{
                    carId:id
                }
            }
        )
        return order ? res.json(order) : res.sendStatus(400)
    }
    else {
        const order = await Order.findAll()
        return order ? res.json(order) : res.sendStatus(400)

    }

})

module.exports = router;