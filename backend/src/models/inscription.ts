import mongoose from "mongoose";

interface Iinscription{
    club: string;
    fullname: string;
    dorsalnumber: string;
    category: string;
}

const inscriptionSchema = new mongoose.Schema<Iinscription>({
    club: {type: String, required: true},
    fullname: {type: String, required: true},
    dorsalnumber: {type: String, required: true},
    category: {type: String, required: true}
}, {timestamps: true});

inscriptionSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const inscription = mongoose.model("inscription", inscriptionSchema);

export {inscription}


