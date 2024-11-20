import { VehicleStore } from '../store/vehicle';
import { Request, Response } from 'express';

/**
 * Define the parameters interface for the request
 */
interface Parameters {
  id: string;
}

export class DeleteVehicleController {
  constructor(private readonly vehicleStore: VehicleStore) {
    this.vehicleStore = vehicleStore;
  }


  public async handle(req: Request<Parameters>, res: Response): Promise<void> {
    const idString: string = req.params.id;
    const id: number = parseInt(idString);
    await this.vehicleStore.deleteVehicle({id});
    res.status(200).send({ message: 'success' });
  }
}