export interface GreetingResponse {
  greeting: string;
  signature: string;
}

export interface TreeConfig {
  rotationSpeed: number;
  lightsColor: string;
  ornamentColor: string;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SHOWING = 'SHOWING',
  ERROR = 'ERROR'
}
