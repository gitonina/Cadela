import type { Category } from "./categories";

type CyclingRaceResultCyclist = {
  id: string;
  name: string;
  club: string;
  n_dorsal: number;
}

type CyclingRaceResultInscription = {
  id?: string;
  cyclingRaceId: string;
  categoryId: Category;
  cyclistId: CyclingRaceResultCyclist;
}

export type CyclingRaceResult = {
  id: string
  placement: number
  is_MV: boolean
  inscriptionId: CyclingRaceResultInscription
}
