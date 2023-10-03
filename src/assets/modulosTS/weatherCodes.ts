type WeatherCode = {
    code: string;
    description: string;
  };
  
  //arrau con datos de los códigos y descripción del tiempo
  export const weatherCodes: WeatherCode[] = [
    { code: "0", description: "Cielo despejado" },
    { code: "1", description: "Mayormente despejado" },
    { code: "2", description: "Parcialmente nublado" },
    { code: "3", description: "Nublado" },
    { code: "45", description: "Niebla" },
    { code: "48", description: "Niebla con helada" },
    { code: "51", description: "Llovizna ligera" },
    { code: "53", description: "Llovizna moderada" },
    { code: "55", description: "Llovizna de intensidad densa" },
    { code: "56", description: "Llovizna congelante ligera" },
    { code: "57", description: "Llovizna congelante de intensidad densa" },
    { code: "61", description: "Lluvia ligera" },
    { code: "63", description: "Lluvia moderada" },
    { code: "65", description: "Lluvia de intensidad fuerte" },
    { code: "66", description: "Lluvia congelante ligera" },
    { code: "67", description: "Lluvia congelante de intensidad fuerte" },
    { code: "71", description: "Caída de nieve ligera" },
    { code: "73", description: "Caída de nieve moderada" },
    { code: "75", description: "Caída de nieve de intensidad fuerte" },
    { code: "77", description: "Granitos de nieve" },
    { code: "80", description: "Lluvias fuertes ligeras" },
    { code: "81", description: "Lluvias fuertes moderadas" },
    { code: "82", description: "Lluvias fuertes de intensidad fuerte" },
    { code: "85", description: "Nevadas ligeras" },
    { code: "86", description: "Nevadas fuertes" },
    { code: "95", description: "Tormenta eléctrica ligera o moderada" },
    { code: "96", description: "Tormenta eléctrica con granizo ligero" },
    { code: "99", description: "Tormenta eléctrica con granizo fuerte" }
  ];