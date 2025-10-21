export interface Cyclist{
    id:string,
    rut:string,
    name:string,
    club:string,
    n_dorsal:number,
    password:string,
}

export interface CyclistCreate{
    rut:string,
    name:string,
    club:string,
    n_dorsal:number,
    password:string,
}