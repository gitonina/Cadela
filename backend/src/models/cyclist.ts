import mongoose,{Schema,Document} from 'mongoose'

export interface ICyclist extends Document {
  id: string,
  rut: number,
  name: string,
  club: string,
  n_dorsal: number,
  password: string,
  inscriptions: mongoose.Types.ObjectId[];
}

const cyclistSchema = new Schema<ICyclist>({
  rut: {type: Number,required: true,minlength: 7,
    validate: {
      validator: function(v) {
        return v.toString().length === 10;
      },
    },
  unique:true},
  name: {type: String,required: true,minlength: 7},
  club: {type: String,required: true,minlength: 3},
  n_dorsal: {type: Number,required: true,minlength: 1,unique:true},
  password: {type: String,required: true,minlength: 6},
  inscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Inscription' }]
})


cyclistSchema.set("toJSON", {
  transform: (document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const Cyclist = mongoose.model<ICyclist>('Cyclist', cyclistSchema);

export default Cyclist;