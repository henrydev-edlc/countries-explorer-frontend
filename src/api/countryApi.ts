import axios from 'axios'; // cliente HTTP, para hacer la peticion al API

const countryApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
});

export const getAllCountries = async () => {
  // Hemos agregado: area, currencies, languages y borders
  const response = await countryApi.get('/all?fields=name,capital,flags,population,cca3,region,area,currencies,languages,borders');
  return response.data;
};