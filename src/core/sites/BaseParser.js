import axios from 'axios';
import cheerio from 'cheerio';

import {Apartment, Snapshot} from '../db';

/**
 * Parser should convert page url content into apartment object.
 */
export default class BaseParser {
  /**
   * Parses apartment page and saves it to db.
   *
   * @param {object} $ Cheerio representation of the page.
   * @param {string} url Page url to be parsed.
   * @returns {Promise} ???????
   */
  async parsePage(__$, __url) {
    throw new Error('parsePage method is not implemented!');
  }

  /**
   * Checks if the parser supports given url.
   *
   * @param url Page url to be checked.
   * @returns {boolean} Is the url supported.
   */
  checkUrl(__url) {
    throw new Error('checkUrl method is not implemented!');
  }

  /**
   * Downloads page and retutrns its cheerio representation.
   *
   * @param {string} url Page url to be downloaded.
   * @returns {Promise<object>} Cheerio representation of the page.
   */
  async downloadPage(url) {
    const response = await axios.get(url);
    return cheerio.load(response.data);
  }

  /**
   * Calls apartments saver that contains all saving logic
   * (duplicates, snapshots, etc.).
   * It frees us from importing saver in every parser.
   *
   * @param {Object} apartment Apartment to be saved.
   * @returns {Promise} Saver result.
   */
  async saveApartment(apartment) {
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
}
