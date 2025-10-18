import mongoose from "mongoose";

export interface Circuit {
    name: string;
    distance?: number;
    elevationGain?: number;
    kml_path?: string
    pathPhoto?: string;
};

const circuitSchema = new mongoose.Schema<Circuit>({
    name: {
        type: String, 
        required: true 
    },
    distance: {
        type: Number, 
        required: true, 
        default: 0 
    },
    elevationGain: {
        type: Number, 
        required: true, 
        default: 0 
    },
    kml_path: {
        type: String,
        default: null,
    },
    pathPhoto: {
        type: String,
        default: null,
    }
}, { timestamps: true });

export const Circuit = mongoose.model("Circuit", circuitSchema);

