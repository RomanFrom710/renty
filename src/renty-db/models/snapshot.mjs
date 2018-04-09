import {Schema, model} from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {apartmentSchema} from './apartment';

const snapshotSchema = new Schema({
  apartmentId: {type: Schema.Types.ObjectId, ref: 'apartment', index: true},
  value: {type: apartmentSchema, required: true},
});
snapshotSchema.plugin(timestamps); // Adding createdAt and updatedAt

export default model('snapshot', snapshotSchema);
