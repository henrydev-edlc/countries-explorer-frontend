import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { getAllCountries } from '../api/countryApi';
import type { Country } from '../interfaces/country';

export const CountryTable = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getAllCountries().then(data => setCountries(data));
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {countries.map((country) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={country.flags.svg}
              alt={country.name.common}
            />
            <CardContent>
              <Typography variant="h6">{country.name.common}</Typography>
              <Typography variant="body2" color="text.secondary">
                Capital: {country.capital ? country.capital[0] : 'N/A'}
              </Typography>
              <Typography variant="body2">
                Población: {country.population.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};