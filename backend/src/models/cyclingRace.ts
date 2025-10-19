import mongoose from "mongoose";

export interface CyclingRace {
    circuitId: mongoose.Types.ObjectId;
    date: Date;
};

const cyclingRaceSchema = new mongoose.Schema<CyclingRace>({
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

export const CyclingRace = mongoose.model("CyclingRace", cyclingRaceSchema);