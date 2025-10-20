import mongoose from "mongoose";

interface Icategory {
    id: string;
    name: string;
}

const categorySchema = new mongoose.Schema<Icategory>({
    name: {
        type: String, 
        required: true 
    },
});

categorySchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


export const Category = mongoose.model("Category", categorySchema);