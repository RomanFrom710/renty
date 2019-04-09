import axios from 'axios';

const baseUrl = 'https://ak.api.onliner.by/search/apartments';
const belarusCoordinates = {
  'bounds[lb][lat]': 53.74872821486161,
  'bounds[lb][long]': 27.3147029051893,
  'bounds[rt][lat]': 54.04737476870836,
  'bounds[rt][long]': 27.8101046516287,
};

export default async function (pageNumber = 1) {
  const params = {
    ...belarusCoordinates,
    page: pageNumber,
  };

  const response = await axios.get(baseUrl, {params});
  return response.data.apartments.map(ap => ap.url);
}
