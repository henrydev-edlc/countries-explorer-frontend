import { useState, useMemo } from 'react';
import { CountryTable } from './components/CountryTable';
import { CssBaseline, Container, ThemeProvider, createTheme, IconButton, Box } from '@mui/material';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CountryDetail } from './components/CountryDetail';

// Importamos los iconos
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icono de Luna
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icono de Sol

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

 
  const theme = useMemo(() => createTheme({
    palette: { 
      mode,
      ...(mode === 'dark' && {
        background: {
          default: '#0a1929', 
          paper: '#0b0b0b',
        },
      }),
    },
  
    shape: {
      borderRadius: 12,
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>        
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', // Centra el contenido horizontalmente
            minHeight: '100vh' 
          }}
        >
          {/* Box para el switch de modo claro/oscuro */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <IconButton 
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} 
              sx={{ 
                p: 1.5,
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: '1px solid',
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '&:hover': {
                   bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                }
              }}
              color="inherit"
            >
              {mode === 'dark' ? (
                <Brightness7Icon sx={{ color: '#f3f3f3' }} /> // Color blanco en modo oscuro
              ) : (
                <Brightness4Icon sx={{ color: '#000000' }} /> // Color negro en modo claro
              )}
            </IconButton>
          </Box>

          {/* Rutas de la aplicacion */}
          <Box sx={{ width: '100%' }}>
            <Routes>
              <Route path='/' element={<CountryTable />} />
              <Route path='/country/:id' element={<CountryDetail />} />
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;