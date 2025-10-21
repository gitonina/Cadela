import { Circuit } from "./models/circuit";
import { CyclingRace } from "./models/cyclingRace";
import config from "../src/utils/config";
import mongoose from "mongoose";
import logger from "./utils/logger";
import Cyclist from "./models/cyclist"
import { Category } from "./models/category";
import { Inscription } from "./models/inscription";
import { Result } from "./models/result";


const resetDataBase = async () => {
  await Circuit.deleteMany({});
  await CyclingRace.deleteMany({});
  await Cyclist.deleteMany({});
  await Category.deleteMany({});
  await Inscription.deleteMany({});
  await Result.deleteMany({});
};

const populateCircuits = async () => {

  const autodromoVizcachas = {
    name: "Autódromo Las Vizcachas",
    distance: 1.61,
    elevationGain: 14,
    pathPhoto: "src/circuits_images/autodromo.png",
  };

  const dobleToyo = {
    name: "Doble Toyo",
    distance: 84.05,
    elevationGain: 1138,
    pathPhoto: "src/circuits_images/toyo.jpg",
  };

  const cuestaBarriga = {
    name: "Cuesta Barriga",
    distance: 86.50,
    elevationGain: 744,
    pathPhoto: "src/circuits_images/barriga.jpg",
  };

  const cuestaChada = {
    name: "Cuesta Chada",
    distance: 103.54,
    elevationGain: 675,
    pathPhoto: "src/circuits_images/chada.jpg",
  };

  const autodromoVizcacasDoc = new Circuit(autodromoVizcachas);
  const dobleToyoDoc = new Circuit(dobleToyo);
  const cuestaBarrigaDoc = new Circuit(cuestaBarriga);
  const cuestaChadaDoc = new Circuit(cuestaChada);

  await autodromoVizcacasDoc.save();
  await dobleToyoDoc.save();
  await cuestaBarrigaDoc.save();
  await cuestaChadaDoc.save();

  console.log("Populate Circuits");
};

const populateCyclingRaces = async (nraces: number) => {
  const circuitsIds = await Circuit.find().select('_id');

  const getSundays = () => {
    const sundays: Date[] = [];
    const actualSunday = new Date(2025, 8, 7);

    for (let i = 0; i < nraces; i++) {
      sundays.push(new Date(actualSunday));
      actualSunday.setDate(actualSunday.getDate() + 7);
    };

    return sundays;
  };

  const sundays = getSundays();
  let actualIndexCircuit = 0;
  const nCircuits = circuitsIds.length; 

  for (const sunday of sundays) {
    const cyclingRace = {
      circuitId: circuitsIds[actualIndexCircuit],
      date: sunday
    }
    const cyclingRaceDoc = new CyclingRace(cyclingRace);
    await cyclingRaceDoc.save();
    actualIndexCircuit = (actualIndexCircuit + 1) % nCircuits;
  };
  console.log("Populate Cycling Races");
}

const populateCyclists = async () => {

  const cyclist0 = {
    rut: "21022072-0",
    name: "Esteban Romero Berríos",
    club: "ECUCH",
    n_dorsal: 136,
    password: "password",
  };

  const cyclist1 = {
    rut: "21432432-2",
    name: "Ricardo Fernández Reyes",
    club: "Talca Cycling",
    n_dorsal: 9,
    password: "password",
  };

  const cyclist2 = {
    rut: "21789432-8",
    name: "Victor Alfaro P.",
    club: "Colo Colo Cycling",
    n_dorsal: 39,
    password: "password",
  };

  const cyclist3 = {
    rut: "21678436-k",
    name: "Champi Villalobos C.",
    club: "Beauchef Cycling",
    n_dorsal: 100,
    password: "password",
  };

  const cyclist4 = {
    rut: "21083920-3",
    name: "Edgar Morales Gonzáles",
    club: "Nvim Cycling",
    n_dorsal: 21,
    password: "password",
  };

  const cyclist5 = {
    rut: "21999002-5",
    name: "Jean Paul Duchens",
    club: "TocToc Cycling",
    n_dorsal: 99,
    password: "password",
  };

  const cyclist6 = {
    rut: "23093202-2",
    name: "Juan Ortega Castro",
    club: "TocToc Cycling",
    n_dorsal: 169, 
    password: "password",
  };

  const cyclist7 = {
    rut: "20145678-3",
    name: "Carlos Muñoz Sepúlveda",
    club: "Santiago Riders",
    n_dorsal: 45,
    password: "password",
  };

  const cyclist8 = {
    rut: "22567890-1",
    name: "Diego Torres Valdés",
    club: "Valparaíso Cycling",
    n_dorsal: 78,
    password: "password",
  };

  const cyclist9 = {
    rut: "21345678-k",
    name: "Andrés Silva Contreras",
    club: "Team Cordillera",
    n_dorsal: 152,
    password: "password",
  };

  const cyclist10 = {
    rut: "20789432-6",
    name: "Felipe Ramírez Soto",
    club: "Pucon Bikers",
    n_dorsal: 267,
    password: "password",
  };

  const cyclist11 = {
    rut: "22890123-4",
    name: "Luis Castillo Moreno",
    club: "Andes Cycling Team",
    n_dorsal: 189,
    password: "password",
  };

  const cyclist12 = {
    rut: "21567234-7",
    name: "Matías Rojas Fuentes",
    club: "La Reina Cyclists",
    n_dorsal: 234,
    password: "password",
  };

  const cyclist13 = {
    rut: "20456789-2",
    name: "Jorge Peña Herrera",
    club: "Concepción Racing",
    n_dorsal: 67,
    password: "password",
  };

  const cyclist14 = {
    rut: "22123456-9",
    name: "Rodrigo Vega Campos",
    club: "Viña Cycling Club",
    n_dorsal: 123,
    password: "password",
  };

  const cyclist15 = {
    rut: "21890765-5",
    name: "Sebastián Pinto Núñez",
    club: "Maipo Valley Riders",
    n_dorsal: 198,
    password: "password",
  };

  const cyclist16 = {
    rut: "20678901-k",
    name: "Pablo Gutiérrez Leiva",
    club: "Temuco Wheelers",
    n_dorsal: 56,
    password: "password",
  };

  const cyclist17 = {
    rut: "22345123-8",
    name: "Cristián Díaz Paredes",
    club: "Rancagua Cycling",
    n_dorsal: 145,
    password: "password",
  };

  const cyclist18 = {
    rut: "20912345-7",
    name: "Marco López Bravo",
    club: "Osorno Bikers",
    n_dorsal: 213,
    password: "password",
  };

  const cyclist19 = {
    rut: "21234567-3",
    name: "Tomás Sánchez Rivera",
    club: "Quilicura Riders",
    n_dorsal: 88,
    password: "password",
  };

  const cyclist20 = {
    rut: "22678234-0",
    name: "Nicolás Álvarez Cortés",
    club: "Antofagasta Cycling",
    n_dorsal: 171,
    password: "password",
  };

  const cyclist21 = {
    rut: "20543210-6",
    name: "Ignacio Hernández Lagos",
    club: "Puerto Montt Team",
    n_dorsal: 254,
    password: "password",
  };

  const cyclist22 = {
    rut: "21876543-1",
    name: "Gabriel Vargas Medina",
    club: "Chillán Wheelers",
    n_dorsal: 92,
    password: "password",
  };

  const cyclist23 = {
    rut: "22456789-k",
    name: "Manuel Castro Espinoza",
    club: "La Serena Cycling",
    n_dorsal: 134,
    password: "password",
  };

  const cyclist24 = {
    rut: "20234567-9",
    name: "Francisco Mora Guzmán",
    club: "Iquique Riders",
    n_dorsal: 276,
    password: "password",
  };

  const cyclist25 = {
    rut: "21654321-4",
    name: "Alejandro Núñez Tapia",
    club: "Curicó Cycling Club",
    n_dorsal: 107,
    password: "password",
  };

  const cyclist26 = {
    rut: "22789456-2",
    name: "Javier Fuentes Rojas",
    club: "Arica Bikers",
    n_dorsal: 163,
    password: "password",
  };

  const cyclist27 = {
    rut: "20876543-5",
    name: "Maximiliano Ortiz Salas",
    club: "Copiapó Racing",
    n_dorsal: 241,
    password: "password",
  };

  const cyclist28 = {
    rut: "21987654-8",
    name: "Benjamín Carrasco Pérez",
    club: "Linares Cycling",
    n_dorsal: 118,
    password: "password",
  };

  const cyclist29 = {
    rut: "22234567-7",
    name: "Gonzalo Bravo Muñoz",
    club: "Los Ángeles Team",
    n_dorsal: 287,
    password: "password",
  };

  const cyclist30 = {
    rut: "20345678-k",
    name: "Patricio Soto Ramírez",
    club: "Valdivia Wheelers",
    n_dorsal: 74,
    password: "password",
  };

  const cyclistDoc0 = new Cyclist(cyclist0);
  const cyclistDoc1 = new Cyclist(cyclist1);
  const cyclistDoc2 = new Cyclist(cyclist2);
  const cyclistDoc3 = new Cyclist(cyclist3);
  const cyclistDoc4 = new Cyclist(cyclist4);
  const cyclistDoc5 = new Cyclist(cyclist5);
  const cyclistDoc6 = new Cyclist(cyclist6);
  const cyclistDoc7 = new Cyclist(cyclist7);
  const cyclistDoc8 = new Cyclist(cyclist8);
  const cyclistDoc9 = new Cyclist(cyclist9);
  const cyclistDoc10 = new Cyclist(cyclist10);
  const cyclistDoc11 = new Cyclist(cyclist11);
  const cyclistDoc12 = new Cyclist(cyclist12);
  const cyclistDoc13 = new Cyclist(cyclist13);
  const cyclistDoc14 = new Cyclist(cyclist14);
  const cyclistDoc15 = new Cyclist(cyclist15);
  const cyclistDoc16 = new Cyclist(cyclist16);
  const cyclistDoc17 = new Cyclist(cyclist17);
  const cyclistDoc18 = new Cyclist(cyclist18);
  const cyclistDoc19 = new Cyclist(cyclist19);
  const cyclistDoc20 = new Cyclist(cyclist20);
  const cyclistDoc21 = new Cyclist(cyclist21);
  const cyclistDoc22 = new Cyclist(cyclist22);
  const cyclistDoc23 = new Cyclist(cyclist23);
  const cyclistDoc24 = new Cyclist(cyclist24);
  const cyclistDoc25 = new Cyclist(cyclist25);
  const cyclistDoc26 = new Cyclist(cyclist26);
  const cyclistDoc27 = new Cyclist(cyclist27);
  const cyclistDoc28 = new Cyclist(cyclist28);
  const cyclistDoc29 = new Cyclist(cyclist29);
  const cyclistDoc30 = new Cyclist(cyclist30);

  await cyclistDoc0.save();
  await cyclistDoc1.save();
  await cyclistDoc2.save();
  await cyclistDoc3.save();
  await cyclistDoc4.save();
  await cyclistDoc5.save();
  await cyclistDoc6.save();
  await cyclistDoc7.save();
  await cyclistDoc8.save();
  await cyclistDoc9.save();
  await cyclistDoc10.save();
  await cyclistDoc11.save();
  await cyclistDoc12.save();
  await cyclistDoc13.save();
  await cyclistDoc14.save();
  await cyclistDoc15.save();
  await cyclistDoc16.save();
  await cyclistDoc17.save();
  await cyclistDoc18.save();
  await cyclistDoc19.save();
  await cyclistDoc20.save();
  await cyclistDoc21.save();
  await cyclistDoc22.save();
  await cyclistDoc23.save();
  await cyclistDoc24.save();
  await cyclistDoc25.save();
  await cyclistDoc26.save();
  await cyclistDoc27.save();
  await cyclistDoc28.save();
  await cyclistDoc29.save();
  await cyclistDoc30.save();

  console.log("Populate Cyclists");
};

const populateCategory = async () => {
  const categories = [
    "Intermedia(15 y 16 años)",
    "Junior(17 y 18 años)",
    "Todo competidor(19 años y más)",
    "Adultos A (18 años y más)",
    "Master (35 a 49 años)",
    "Master C (50 a 59 años)",
    "Master D (60 a 69 años)",
    "Master E (70 años y más)",
    "Amateur (18 años y más)",
    /*"Damas Adultos A (18 años y más)",*/
    /*"Damas Master (35 años y más)",*/
    /*"Federado DAMAS",*/
    "Federado JUNIOR",
    "Federado INTERMEDIA",
    "Federado ELITE/TODO COMPETIDOR"
  ];

  for (const category of categories) {
    const newCategory = {
      name: category
    }
    const categoryDoc = new Category(newCategory);
    await categoryDoc.save();
  };

  console.log("Populate Categories");
};

const populateInscriptions = async () => {
  const cyclistIds = await Cyclist.find().select('_id');
  const cyclingRaceIds = await CyclingRace.find().select('_id');
  const categoryIds = await Category.find().select('_id');

  for (const cyclist of cyclistIds) {
    for (const cyclingRace of cyclingRaceIds) {
      for (const category of categoryIds) {
        if (Math.random() < 0.5) {
          const inscription = {
            cyclingRaceId: cyclingRace,
            cyclistId: cyclist,
            categoryId: category
          };
          const inscriptionDoc = new Inscription(inscription);
          await inscriptionDoc.save();
        };
      };
    };
  };
  console.log("Populate Inscriptions");
}

const populateResults = async () => {
  const inscriptionsFirst5 = await Inscription.aggregate([
    {
      $addFields: {
        randomSort: { $rand: {} }
      }
    },
    {
      $sort: {
        cyclingRaceId: 1,
        categoryId: 1,
        randomSort: 1
      }
    },
    {
      $group: {
        _id: {
          cyclingRaceId: '$cyclingRaceId',
          categoryId: '$categoryId'
        },
        inscriptions: { $push: { _id: '$_id' } }
      }
    },
    {
      $project: {
        cyclingRaceId: '$_id.cyclingRaceId',
        categoryId: '$_id.categoryId',
        inscriptions: { $slice: ['$inscriptions', 5] },
        _id: 0
      }
    }
  ]);
  
  console.log(inscriptionsFirst5)

  let placement = 0;
  
  for (const first5 of inscriptionsFirst5) {    
    for (const inscription of first5.inscriptions) {
      const result = {
        inscriptionId: inscription._id,
        placement: (placement % 5) + 1
      }
      placement += 1
      const resultDoc = new Result(result);
      await resultDoc.save();
    }
  }
  console.log("Populate Results");
}

const seedDatabase = async () => {
  try {
    if (config.MONGODB_URI) {
      await mongoose.connect(config.MONGODB_URI)
      .then(() =>
          console.log("connected to mongoose")
      )
      .catch((error) => {
          logger.error("error connecting to MongoDB:", error.message);
      });
    }

    const nCyclingRaces = 20; 

    await resetDataBase();
    await populateCircuits();
    await populateCyclingRaces(nCyclingRaces);
    await populateCyclists();
    await populateCategory();
    await populateInscriptions();
    await populateResults();

    await mongoose.connection.close();

  } catch (error) {
    console.log("Error:", error);
    await mongoose.connection.close();
  }
};

seedDatabase();