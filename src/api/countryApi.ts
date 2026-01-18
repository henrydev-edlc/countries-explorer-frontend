import axios from 'axios';

const countryApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
});

export const getAllCountries = async () => {
  // Añadimos ?fields para que la API responda correctamente y sea más rápida
  const response = await countryApi.get('/all?fields=name,capital,flags,population,cca3,region');
  return response.data;
};