/**
 * Scanner should go through the whole site and get all apartment page urls.
 */
export default class BaseScanner {
  /**
   * Add url to the tasks queue to be parsed.
   * @param {String} url Page address to be scraped.
   * @returns {Promise} Promise of saving task to the queue.
   */
  async saveUrl(__url) {
    // add to tasks queue
  }
}
