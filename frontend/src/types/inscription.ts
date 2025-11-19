export type Inscription = {
  id?: string;
  cyclistId: string;
  cyclingRaceId: string;
  categoryId: string;
  createdAt?: string;
};

export type InscriptionCreate = {
  cyclistId: string;
  cyclingRaceId: string;
  categoryId: string;
};

export type InscriptionForm = {
  categoryId: string;
}