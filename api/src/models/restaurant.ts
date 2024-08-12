import mongoose, { Document, Schema } from 'mongoose';

interface IRestaurant extends Document {
  name: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  cuisine: string;
  rating: number;
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

RestaurantSchema.index({ location: '2dsphere' }); // Indexing location for geospatial queries


export const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
