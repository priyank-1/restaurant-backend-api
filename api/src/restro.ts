import { NextFunction, Request, Response } from "express";
import { Restaurant } from "./models/restaurant"



export const createRestaurant = async(req : Request , res :Response , next : NextFunction)=>{
    try {
        const { name, address, location, cuisine, rating } = req.body;
        const found = await Restaurant.exists({name , location});
        if(found){
          return next(new Error("Restaurant already exists!"))
        }
        const newRestaurant = Restaurant.create({
          name,
          address,
          location: {
            type: 'Point',
            coordinates: [location.coordinates[0], location.coordinates[1]],
          },
          cuisine,
          rating,
        });
    
        // const savedRestaurant = await newRestaurant.;
        res.status(201).json(newRestaurant);
      } catch (error : any) {
        next(new Error("Unable to add Restaurant"))
      }
};

export const getRestaurants = async (req: Request, res: Response , next : NextFunction) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (error : any) {
      next(new Error("Unable to list Restaurants"))
    }
  };

  export const updateRestaurant = async (req: Request, res: Response , next : NextFunction) => {
    try {
      const { id } = req.params;
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedRestaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.status(200).json(updatedRestaurant);
    } catch (error:any) {
      next(new Error("Unable to update Restaurants"))
    }
  }; 
  
  export const deleteRestaurant = async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { id } = req.params;
      const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
  
      if (!deletedRestaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error:any) {
      next(new Error("Unable to delete Restaurants"))
    }
  };  

  export const getNearbyRestaurantsbyRange = async (req: Request, res: Response ,next : NextFunction) => {
    try {
      const { latitude, longitude, minimumDistance, maximumDistance } = req.body;
  
      if (!latitude || !longitude || !minimumDistance || !maximumDistance) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
  
      // const restaurants = await Restaurant.find({
      //   location : {
      //     $nearSphere : {
      //       $geometry: {
      //         type: "Point",
      //         coordinates: [parseFloat(longitude), parseFloat(latitude)],
              
      //       },
      //         $minDistance: 100,
      //         $maxDistance: 1000,
            
      //     },
      //   }
      //   },
      // );
      // console.log(restaurants)

      const maxRest = await getNearbyRestaurants(parseFloat(latitude),parseFloat(longitude),parseFloat(maximumDistance))
      const minRest = await getNearbyRestaurants(parseFloat(latitude),parseFloat(longitude),parseFloat(minimumDistance))
      const restaurants = maxRest.filter(function(item){
        return minRest.indexOf(item.id) === -1;
      })
      res.status(200).json(restaurants);
    } catch (error : any) {
      return next(new Error("Failed to get Restaurants in range"))
    }
  };

export const getNearbyRestaurants = async (latitude : any, longitude : any , maxD : any ) =>{
    try{
        const restaurants = await Restaurant.find({
            location : {
                $geoWithin : {
                    $centerSphere : [
                        [longitude , latitude],
                        maxD/6378100
                    ]
                }
            }
        });
        return restaurants;
    }
    catch(error){
        console.log(error);
        throw new Error("Failed to get nearby restaurants")
    }
};