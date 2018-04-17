import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {apartmentSchema} from './apartment';

const snapshotSchema = new mongoose.Schema({
  apartmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'apartment', index: true},
  value: {type: apartmentSchema, required: true},
});
snapshotSchema.plugin(timestamps); // Adding createdAt and updatedAt

export default mongoose.model('snapshot', snapshotSchema);
