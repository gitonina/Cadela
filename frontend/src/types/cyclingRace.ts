import type { Circuit } from "./circuit";

export interface CyclingRace {
    id: string;
    circuitId: Circuit
    date: string;
};

export interface CyclingRaceCreate {
    circuitId: string;
    date: string;
}