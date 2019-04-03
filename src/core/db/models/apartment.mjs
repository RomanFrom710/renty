import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {features} from '../enums';

const photoSchema = new mongoose.Schema({
  origin: String,
  preview: String,
});

const apartmentSchema = new mongoose.Schema({
  price: {type: Number, required: true},
  phones: {type: [String], required: true, index: true},
  url: {type: String, required: true},
  site: {type: String, required: true},
  address: {type: String, required: true},
  features: {type: [String], enum: Object.values(features)},

  photos: [photoSchema],
  author: String,
  description: String,
  floor: Number,
  rooms: {type: Number, default: 1},

  isAgency: Boolean,
  isEntire: Boolean,
  disappearedAt: Date,
  geo: {type: [Number], index: '2d'},
});

/**
 * Get apartment history (array of snapshots).
 */
function getHistory() {
  return this.model('snapshot').find({apartmentId: this._id});
}

/**
 * Find apartments from the same author.
 */
function findSiblings() {
  return this.model('apartment').find({phones: {$in: this.phones}});
}

apartmentSchema.plugin(timestamps); // Adding createdAt and updatedAt
apartmentSchema.methods.getHistory = getHistory;
apartmentSchema.methods.findSiblings = findSiblings;

export {apartmentSchema};
export default mongoose.model('apartment', apartmentSchema);
