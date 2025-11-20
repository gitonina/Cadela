import mongoose,{Schema,Document} from 'mongoose'

export interface ICyclist extends Document {
  id: string,
  rut: string,
  name: string,
  club: string,
  n_dorsal: number,
  password: string,
  inscriptions: mongoose.Types.ObjectId[];
  rolId: mongoose.Types.ObjectId
}

const cyclistSchema = new Schema<ICyclist>({
  rut: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 7 && v.length <= 10;
      },
      message: "El RUT debe tener entre 7 y 10 dígitos",
    },
  },
  name: {
    type: String,
    required: true, 
    minlength: 7
  },
  club: {
    type: String,
    required: true, 
    minlength: 3
  },
  n_dorsal: {
    type: Number,
    required: true,
    minlength: 1,
    unique:true
  },
  password: {
    type: String, 
    required: true,
    minlength: 6
  },
  inscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inscription',
    default: [] 
  }],
  rolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
})

cyclistSchema.set("toJSON", {
  transform: (
    document, 
    /*returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number; password?: string }*/
    returnedObject: any
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  }
});

const Cyclist = mongoose.model<ICyclist>('Cyclist', cyclistSchema);

export default Cyclist;