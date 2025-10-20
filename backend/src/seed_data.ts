import { Circuit } from "./models/circuit";
import { CyclingRace } from "./models/cyclingRace";
import config from "../src/utils/config";
import mongoose from "mongoose";
import logger from "./utils/logger";


const resetDataBase = async () => {
  await Circuit.deleteMany({});
  await CyclingRace.deleteMany({});
};

const populateCircuits = async () => {

  const autodromoVizcachas = {
    name: "Autódromo Las Vizcachas",
    distance: 1.61,
    elevationGain: 14,
    pathPhoto: "circuit_images/src/assets/autodromo.jpg",
  };

  const dobleToyo = {
    name: "Doble Toyo",
    distance: 84.05,
    elevationGain: 1138,
    pathPhoto: "circuit_images/src/assets/toyo.jpg",
  };

  const cuestaBarriga = {
    name: "Cuesta Barriga",
    distance: 86.50,
    elevationGain: 744,
    pathPhoto: "circuit_images/src/assets/barriga.jpg",
  };

  const cuestaChada = {
    name: "Cuesta Chada",
    distance: 103.54,
    elevationGain: 675,
    pathPhoto: "circuit_images/src/assets/chada.jpg",
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

    await mongoose.connection.close();

  } catch (error) {
    console.log("Error:", error);
    await mongoose.connection.close();
  }
};

seedDatabase();