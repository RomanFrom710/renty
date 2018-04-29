import {Apartment, Snapshot} from 'renty-db';

/**
   * Saves apartment to db, handles snapshotting.
   *
   * @param {object} apartment Apartment to be saved.
   * @returns {Promise} Saving result.
   */
async function saveApartment(apartment) {
  const existingApartment = await Apartment.find({url: apartment.url});
  if (!existingApartment) {
    return Apartment.create(apartment);
  }

  await Snapshot.create({
    apartmentId: existingApartment._id,
    value: existingApartment,
  });

  return Apartment.update(apartment, {runValidators: true});
}

export default saveApartment;
