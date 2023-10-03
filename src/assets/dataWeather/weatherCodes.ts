type WeatherCode = {
    code: string;
    description: string;
  };
  //Objeto para añadir los códigos del tiempo
  export function useCityData() {
    const weatherCodes: WeatherCode[] = [
      { code: "0", description: "Cielo despejado" },
      { code: "1, 2, 3", description: "Mayormente despejado, parcialmente nublado, y nublado" },
      { code: "45, 48", description: "Niebla y niebla con helada" },
      { code: "51, 53, 55", description: "Llovizna: Ligera, moderada y de intensidad densa" },
      { code: "56, 57", description: "Llovizna congelante: Ligera y de intensidad densa" },
      { code: "61, 63, 65", description: "Lluvia: Ligera, moderada y de intensidad fuerte" },
      { code: "66, 67", description: "Lluvia congelante: Ligera y de intensidad fuerte" },
      { code: "71, 73, 75", description: "Caída de nieve: Ligera, moderada y de intensidad fuerte" },
      { code: "77", description: "Granitos de nieve" },
      { code: "80, 81, 82", description: "Lluvias fuertes: Ligera, moderada y fuerte" },
      { code: "85, 86", description: "Nevadas ligeras y fuertes" },
      { code: "95 *", description: "Tormenta eléctrica: Ligera o moderada" },
      { code: "96, 99 *", description: "Tormenta eléctrica con granizo ligero y fuerte" }
    ];
  
    return weatherCodes;
  }