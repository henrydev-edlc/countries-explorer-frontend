import axios from 'axios'; // cliente HTTP, para hacer la peticion al API

const countryApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
});

// Obtener todos los paises
export const getAllCountries = async () => {
  // Con los siguientes datos
  const response = await countryApi.get('/all?fields=name,capital,flags,population,cca3,region,area,currencies,languages,borders');
  return response.data;
};