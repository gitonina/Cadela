import mongoose from "mongoose";

export interface ICyclingRace {
    circuitId: mongoose.Types.ObjectId;
    date: Date;
};

const cyclingRaceSchema = new mongoose.Schema<ICyclingRace>({
    circuitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circuit',
        required: true 
    },
    date: {
        type: Date,
        required: true 
    },
});

cyclingRaceSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CyclingRace = mongoose.model("CyclingRace", cyclingRaceSchema);