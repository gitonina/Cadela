export type CyclingRaceResults = {
  id: string
  category: string
  placements: CyclingRaceResult[]
}

export type CyclingRaceResult = {
  id: string
  place: number
  is_mv: boolean
  club: string,
  fullname: string,
  dorsalnumber: string,
}
