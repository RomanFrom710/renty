import {Schema, model} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {apartmentSchema} from './apartment';

const snapshotSchema = new Schema({
  value: {type: apartmentSchema, required: true},
});
snapshotSchema.plugin(timestamps); // Adding createdAt and updatedAt

export default model('snapshot', snapshotSchema);
