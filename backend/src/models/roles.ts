import mongoose from "mongoose"

export interface IRole {
    id:string,
    name: "admin" | "cyclist";
}

const RolSchema= new mongoose.Schema<IRole>({
  name:{
    type:String,
    required:true,
    enum: ["admin", "cyclist"]
  }

})

RolSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Role=mongoose.model<IRole>("Role",RolSchema)