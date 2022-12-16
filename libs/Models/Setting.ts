export interface ISetting {
  id: number;
  key: string;

  min: number;
  max: number;

  rate: number;

  feature_on: boolean;
  interval: number;
}
