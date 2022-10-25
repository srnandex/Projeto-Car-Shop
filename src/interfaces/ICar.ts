import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type ICar = z.infer<typeof CarSchema>;

export { CarSchema, ICar };