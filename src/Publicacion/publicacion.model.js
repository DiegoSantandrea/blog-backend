import mongoose, { Schema } from "mongoose";

const publicacionSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  curso: {
    type: String,
    enum: ['Tecno', 'taller', 'practicasupervisad'],
    required: true
  },
  comentarios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comentario'
    }
  ],
  fecha: {
    type: Date,
    default: Date.now
  },
  status:{
        type: Boolean,
        default: true
    },
}, 
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Publicacion', publicacionSchema);