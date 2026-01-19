import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import type { Country } from "../interfaces/country";

export const CountryDetail = () => {
  // Extrae el 'id' de la URL (/country/:id)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Para el botón de "Volver"
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para buscar el país por su código-alpha
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${id}`,
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Error al buscar el detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]); // Se vuelve a ejecutar si el ID cambia (cuando seleccionas otro vecino)

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (!country) return <Typography>No se encontró el país.</Typography>;

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate("/")} sx={{ mb: 3 }}>
        Volver al listado
      </Button>

      <Card sx={{ maxWidth: 800, mx: "auto" }}>
        <CardMedia
          component="img"
          height="300"
          image={country.flags.svg}
          alt={country.name.common}
          sx={{ objectFit: "contain", bgcolor: "background.paper", p: 2 }}
        />
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {country.name.common}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {country.name.official}
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Typography>
              <strong>Capital:</strong> {country.capital?.[0]}
            </Typography>
            <Typography>
              <strong>Región:</strong> {country.region}
            </Typography>
            <Typography>
              <strong>Población:</strong> {country.population.toLocaleString()}
            </Typography>
            <Typography>
              <strong>Área:</strong> {country.area.toLocaleString()} km²
            </Typography>
            <Typography>
              <strong>Moneda: </strong>
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => `${c.name} (${c.symbol})`)
                    .join(", ")
                : "N/A"}
            </Typography>

            <Typography>
              <strong>Lenguajes: </strong>
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
