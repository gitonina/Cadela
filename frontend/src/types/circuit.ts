export interface Circuit {
    id: number;
    name: string;
    distance: number;
    elevationGain: number;
    kml_path: string;
    pathPhoto: string;
    location: string;
}

export interface CircuitCreate {
    name: string;
    distance: number;
    elevationGain: number;
    kml_path?: string;
    pathPhoto?: string;
    location: string;
}