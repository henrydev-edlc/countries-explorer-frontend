export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string; // Código de 3 letras (ID único)
  capital: string[];
  region: string;
  population: number;
  flags: {
    svg: string;
    png: string;
  };
}