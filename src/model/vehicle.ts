export interface Position {
  longitude: number;
  latitude: number;
};

export class Vehicle {
  constructor(
    public id: number,
    public shortcode: string,
    public battery: number,
    public position: Position,
  ) {}
}
