import {Schema, model} from 'mongoose';
import timestamps from 'mongoose-timestamp';

const photoSchema = new Schema({
  origin: String,
  preview: String,
});

const apartmentSchema = new Schema({
  price: {type: Number, required: true},
  phones: {type: [String], required: true},
  url: {type: String, required: true},
  site: {type: String, required: true},
  address: {type: String, required: true},
  photos: [photoSchema],
  description: String,
  isAgency: Boolean,
  isEntire: Boolean,
  rooms: {type: Number, default: 1},
  geo: {type: [Number], index: '2d'},
  history: {type: [Schema.Types.ObjectId], ref: 'history'},
});
apartmentSchema.plugin(timestamps); // Adding createdAt and updatedAt

export {apartmentSchema};
export default model('apartment', apartmentSchema);
