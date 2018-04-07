/**
 * Parser should convert page url content into apartment object.
 */
export default class BaseParser {
  /**
   * Parses apartment page and saves it to db.
   *
   * @param {String} url Page url to be parsed.
   */
  parse(url) {
    throw new Error('')
  }
}
