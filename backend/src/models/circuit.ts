import mongoose from "mongoose";

export interface ICircuit {
    name: string;
    distance?: number;
    elevationGain?: number;
    kml_path?: string
    pathPhoto?: string;
};

const circuitSchema = new mongoose.Schema<ICircuit>({
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

circuitSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Circuit = mongoose.model("Circuit", circuitSchema);