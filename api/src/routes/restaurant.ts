import { NextFunction, Request, Router,Response } from "express";
import { Restaurant } from "../models/restaurant";
import { getNearbyRestaurants,createRestaurant,deleteRestaurant,getRestaurants,updateRestaurant, getNearbyRestaurantsbyRange } from "../restro";

const router = Router();


    const sessionCheck = (req: Request, res: Response, next: NextFunction) => {
        if (req.session.userId) {
            next();
        } else {
            res.status(401).json({ error: "Login to continue" });
        }
    };
    

router.use('/restaurants',sessionCheck);

router.post('/restaurants', createRestaurant);
router.get('/restaurants', getRestaurants);
router.put('/restaurants/:id', updateRestaurant);
router.delete('/restaurants/:id', deleteRestaurant);
router.get('/restaurants/range', getNearbyRestaurantsbyRange);

router.get('/restaurants/nearby',async(req, res) => {
    const { latitude, longitude, maxD } =  req.body;


    try{
        const restaurants = await getNearbyRestaurants(
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(maxD)  
        );
        res.json(restaurants);
    }
    catch(error){
        res.status(500).send('Error fetching nearby restaurants');
    }
    
});

export default router
