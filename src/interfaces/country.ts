/* === Interfaz que define la estructura de datos de un pais === */
export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string; // Código de 3 letras (ID único)
  capital: string[];
  region: string;
  population: number;
  area: number;
  flags: {
    svg: string;
    png: string;
  };
  currencies?: Record<string, {name: string, symbol: string}>; // moneda
  languages?: Record<string, string>;
  borders?: string[]; // paises vecinos
}