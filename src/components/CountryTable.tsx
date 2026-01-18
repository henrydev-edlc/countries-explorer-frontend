import { useEffect, useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { 
  Card, CardContent, Typography, CardMedia, Box, Chip, 
  TextField, MenuItem, Select, FormControl, InputLabel, 
  Pagination, Button, ButtonGroup, Stack, Divider 
} from '@mui/material';
import { getAllCountries } from '../api/countryApi';
import type { Country } from '../interfaces/country';

export const CountryTable = () => {
  const [countries, setCountries] = useState<Country[]>([]); // Datos de API
  const [search, setSearch] = useState(''); // Buscador
  const [region, setRegion] = useState(''); // Filtro por continente o region
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); //Cambio de diseño
  const [page, setPage] = useState(1); // Pagina actual
  const itemsPerPage = 5; // Limite de paginacion 5

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  // Lógica de Filtrado (Nombre y Región)
  const filteredCountries = useMemo(() => {
    return countries.filter(c => {
      const matchesName = c.name.common.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === '' || c.region === region;
      return matchesName && matchesRegion;
    });
  }, [countries, search, region]);

  // Lógica de Paginación
  const count = Math.ceil(filteredCountries.length / itemsPerPage);
  const pagedCountries = filteredCountries.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* CONTROLES: Búsqueda, Filtro y Vista */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <TextField 
          label="Buscar por nombre..." 
          variant="outlined" 
          fullWidth 
          onChange={(e) => {setSearch(e.target.value); setPage(1);}}
        />
        
        // Select para seleccionar una region
        <FormControl fullWidth>
          <InputLabel>Región</InputLabel>
          <Select value={region} label="Región" onChange={(e) => {setRegion(e.target.value); setPage(1);}}>
            <MenuItem value="">Todas las Regiones</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">América</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europa</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>

        // Fragmaneto para mostrar los paises en forma de Grid o Lista
        <ButtonGroup sx={{ height: '56px' }}>
          <Button variant={viewMode === 'grid' ? 'contained' : 'outlined'} onClick={() => setViewMode('grid')}>Grid</Button>
          <Button variant={viewMode === 'list' ? 'contained' : 'outlined'} onClick={() => setViewMode('list')}>Lista</Button>
        </ButtonGroup>
      </Stack>

      {/* LISTADO DE PAÍSES */}
      <Grid container spacing={3}>
        {pagedCountries.map((country) => {
          // Procesamiento de datos 
          const currencies = country.currencies 
            ? Object.values(country.currencies).map(c => c.name).join(', ') 
            : 'N/A';
          const languages = country.languages 
            ? Object.values(country.languages).join(', ') 
            : 'N/A';

          return (
            // rotornar los paises en grid ya con sus datos 
            <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} md={viewMode === 'grid' ? 4 : 12} key={country.cca3}>
              <Card sx={{ display: viewMode === 'list' ? 'flex' : 'block', height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    width: viewMode === 'list' ? { xs: '100%', sm: 300 } : '100%', 
                    height: 200,
                    objectFit: 'cover'
                  }}
                  image={country.flags.svg}
                  alt={country.name.common}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom>{country.name.common}</Typography>
                  <Divider sx={{ mb: 1 }} />
                  
                  <Typography variant="body2"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</Typography>
                  <Typography variant="body2"><strong>Población:</strong> {country.population.toLocaleString()}</Typography>
                  <Typography variant="body2"><strong>Área:</strong> {country.area.toLocaleString()} km²</Typography>
                  <Typography variant="body2"><strong>Región:</strong> {country.region}</Typography>
                  <Typography variant="body2"><strong>Moneda:</strong> {currencies}</Typography>
                  <Typography variant="body2" noWrap title={languages}><strong>Lenguajes:</strong> {languages}</Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>Vecinos:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {country.borders?.length ? (
                        country.borders.map(b => <Chip key={b} label={b} size="small" variant="outlined" color="primary" />)
                      ) : (
                        <Typography variant="caption" color="text.secondary">Sin fronteras</Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* PAGINACION*/}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
        <Pagination count={count} page={page} onChange={(_, v) => setPage(v)} color="primary" size="large" />
      </Box>
    </Box>
  );
};