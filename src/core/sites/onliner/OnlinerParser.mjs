import axios from 'axios';
import cheerio from 'cheerio';

// todo: refactor
export default async function (url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const photoUrls = $('.apartment-gallery__slide').map((__i, element) => {
    const background = $(element).attr('style');
    return background.match(/url\((.*)\)/)[1];
  }).get();
  const phones = $('[href^="tel"]').map((__i, element) => {
    const href = $(element).attr('href');
    return href.split(':')[1];
  }).get();

  return {
    price: +($('.apartment-bar__price-value_complementary').text().match(/\d+/)[0]),
    photoUrls,
    phones,
    url,
    isAgency: $('.apartment-bar__part_right .apartment-bar__value').text().includes('Агентство'),
    type: $(':not(.apartment-bar__part_right)>.apartment-bar__item>.apartment-bar__value').text(),
    site: 'Onliner',
    address: $('.apartment-info__sub-line.apartment-info__sub-line_large').text().trim(),
    description: $('.apartment-info__sub-line_extended-bottom').text().trim(),
  };
}
