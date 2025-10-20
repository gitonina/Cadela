import mongoose from "mongoose";

interface IResult{
    inscriptionId: mongoose.Types.ObjectId;
    place: number;
    is_MV: boolean;
}

const resultSchema = new mongoose.Schema<IResult>({
    inscriptionId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Inscription'
    },
    place: {
        type: Number, 
        required: true
    },
    is_MV: {
        type: Boolean, 
        required: true
    }
}, {timestamps: true});

resultSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Result = mongoose.model("Result", resultSchema);