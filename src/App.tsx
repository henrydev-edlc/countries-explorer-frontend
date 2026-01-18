import { CountryTable } from './components/CountryTable';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      {/* CssBaseline quita los márgenes feos del navegador y pone el fondo claro */}
      <CssBaseline /> 
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CountryTable />
      </Container>
    </>
  );
}

export default App;