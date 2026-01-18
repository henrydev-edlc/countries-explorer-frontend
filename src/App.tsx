import { useState, useMemo } from 'react';
import { CountryTable } from './components/CountryTable';
import { CssBaseline, Container, ThemeProvider, createTheme, Button, Box } from '@mui/material';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createTheme({
    palette: { mode },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Button variant="contained" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            Modo {mode === 'light' ? 'Oscuro' : 'Claro'}
          </Button>
        </Box>
        <CountryTable />
      </Container>
    </ThemeProvider>
  );
}
export default App;