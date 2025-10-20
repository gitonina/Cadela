import mongoose from "mongoose";

interface Iinscription{
    cyclingRaceId: mongoose.Types.ObjectId;
    cyclistId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    /*club: string;*/
    /*fullname: string;*/
    /*dorsalnumber: string;*/
    /*category: string;*/
}

const inscriptionSchema = new mongoose.Schema<Iinscription>({
    /*club: {type: String, required: true},*/
    /*fullname: {type: String, required: true},*/
    /*dorsalnumber: {type: String, required: true},*/
    /*category: {type: String, required: true}*/
    cyclingRaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CyclingRace'
    },
    cyclistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cyclist'
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
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

const Inscription = mongoose.model("Inscription", inscriptionSchema);

export {Inscription}


