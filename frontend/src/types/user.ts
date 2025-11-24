import type { Inscription } from "./inscription";

export interface User {
  id : string;
  rut: string;
  name: string;
  club: string;
  n_dorsal: number;
  inscriptions: Inscription[];
  role: UserRole;
}

export interface UserRole {
  id: string;
  name: string;
}