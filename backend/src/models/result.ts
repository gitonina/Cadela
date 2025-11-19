import mongoose from "mongoose";

interface IResult{
    inscriptionId: mongoose.Types.ObjectId;
    placement: number;
    is_MV: boolean;
}

const resultSchema = new mongoose.Schema<IResult>({
    inscriptionId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Inscription'
    },
    placement: {
        type: Number, 
        required: true
    },
    is_MV: {
        type: Boolean, 
        required: true,
        default: false
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