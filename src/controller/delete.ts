import { VehicleStore } from '../store/vehicle';
import { Request, Response } from 'express';

/**
 * Define the parameters interface for the request
 */
interface Parameters {
  id: string;
}

/**
 * The DeleteVehicleController class is responsible for handling vehicle deletion requests
 */
export class DeleteVehicleController {
  /**
   * Constructs a new instance of DeleteVehicleController
   * vehicleStore An instance of VehicleStore for accessing vehicle data
   */
  constructor(private readonly vehicleStore: VehicleStore) {}

  /**
   * Handles vehicle deletion requests
   * req The request object, containing the vehicle ID to be deleted
   * res The response object, used to send responses back to the client
   */
  public async handle(req: Request<Parameters>, res: Response): Promise<void> {
    try{
      // Parse the vehicle ID from the request parameters and convert it to a number
      const id =parseInt(req.params.id, 10);

      // Validate the vehicle ID
      if(isNaN(id)){
        res.status(400).send({error: 'Invalid vehicle id'})
        return;
      }

      // Attempt to delete the vehicle by ID from the vehicle store
      const success = await this.vehicleStore.delete(id);

      // Check the result of the deletion operation
      if (success) {
        // If successful, return a 204 status code indicating successful deletion with no content
        res.status(204).send();} else {
        // If unsuccessful, return a 404 status code indicating the vehicle was not found
        res.status(404).send({error: 'Vehicle not found'});
      }
    } catch (error) {
      // Log the error and return a 500 status code indicating an internal server error if an exception occurs
      console.error('error deleting vehicle:', error);
      res.status(500).send({error: 'Internal server error'});
    }
  }
}