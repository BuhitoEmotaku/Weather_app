// Array con propiedades comunes
export const propiedadesComunes = [
  "relativehumidity_2m",
  "dewpoint_2m",
  "apparent_temperature",
  "precipitation_probability",
  "precipitation",
  "rain",
  "showers",
  "snowfall",
  "snow_depth",
  "pressure_msl",
  "surface_pressure",
  "cloudcover",
  "visibility",
  "evapotranspiration",
  "vapor_pressure_deficit",
  "windspeed_10m",
  "winddirection_10m",
  "windgusts_10m",
  "temperature_80m",
];

// Array con propiedades menos comunes
export const propiedadesMenosComunes = [
  "soil_temperature_0cm",
  "temperature_1000hPa",
  "relativehumidity_1000hPa",
  "cloudcover_1000hPa",
  "windspeed_1000hPa",
  "winddirection_1000hPa",
  "geopotential_height_1000hPa",
  "shortwave_radiation",
  "direct_radiation",
  "diffuse_radiation",
  "direct_normal_irradiance",
  "terrestrial_radiation",
  "shortwave_radiation_instant",
  "direct_radiation_instant",
  "diffuse_radiation_instant",
  "uv_index",
  "uv_index_clear_sky",
  "cape",
  "freezinglevel_height",
];

// Array con propiedades menos comunes (con espacios en blanco)
export const propiedadesMenosComunesEspacios = [
  "Temperatura del Suelo a 0cm",
  "Temperatura a 1000hPa",
  "Humedad Relativa a 1000hPa",
  "Cobertura de Nubes a 1000hPa",
  "Velocidad del Viento a 1000hPa",
  "Dirección del Viento a 1000hPa",
  "Altura Geopotencial a 1000hPa",
  "Radiación de Onda Corta",
  "Radiación Directa",
  "Radiación Difusa",
  "Irradiancia Directa Normal",
  "Radiación Terrestre",
  "Radiación de Onda Corta Instantánea",
  "Radiación Directa Instantánea",
  "Radiación Difusa Instantánea",
  "Índice UV",
  "Índice UV Cielo Despejado",
  "CAPE",
  "Altura del Nivel de Congelación",
];

// Array con propiedades comunes (con espacios en blanco)
export const propiedadesComunesEspacios = [
  "Humedad Relativa a 2m",
  "Punto de Rocío a 2m",
  "Temperatura Aparente",
  "Probabilidad de Precipitación",
  "Precipitación",
  "Lluvia",
  "Chubascos",
  "Acumulación de Nieve",
  "Espesor de Nieve",
  "Presión al Nivel del Mar",
  "Presión a Nivel de Superficie",
  "Cobertura de Nubes",
  "Visibilidad",
  "Evapotranspiración",
  "Déficit de Presión de Vapor",
  "Velocidad del Viento a 10m",
  "Dirección del Viento a 10m",
  "Ráfagas de Viento a 10m",
  "Temperatura a 80m",
];

// Array con propiedades comunes en ingles
export const dataDescriptionsKeysWeekend = [
  "apparent_temperature_max",
  "apparent_temperature_min",
  "sunrise",
  "sunset",
  "uv_index_max",
  "uv_index_clear_sky_max",
  "precipitation_sum",
  "rain_sum",
  "showers_sum",
  "snowfall_sum",
  "precipitation_hours",
  "precipitation_probability_max",
  "windspeed_10m_max",
  "windgusts_10m_max",
  "winddirection_10m_dominant",
  "shortwave_radiation_sum",
  "et0_fao_evapotranspiration"
];
// Array con propiedades comunes en español
export const dataDescriptionsKeysEspanolWeekend = [
  "Temperatura aparente máxima",
  "Temperatura aparente mínima",
  "Hora de salida del sol",
  "Hora de puesta del sol",
  "Índice UV máximo",
  "Índice UV máximo cielo despejado",
  "Acumulación de precipitación",
  "Acumulación de lluvia",
  "Acumulación de aguaceros",
  "Acumulación de nevadas",
  "Horas de precipitación",
  "Probabilidad máxima de precipitación",
  "Velocidad máxima del viento a 10m",
  "Ráfagas máximas de viento a 10m",
  "Dirección dominante del viento a 10m",
  "Radiación de onda corta acumulada",
  "Evapotranspiración ET0 FAO"
];

// Array con propiedades unidades
export const unitsByKey:any = {
  apparent_temperature_max: "°C",
  apparent_temperature_min: "°C",
  sunrise: "",
  sunset: "",
  uv_index_max: "",
  uv_index_clear_sky_max: "",
  precipitation_sum: "mm",
  rain_sum: "mm",
  showers_sum: "mm",
  snowfall_sum: "cm",
  precipitation_hours: "h",
  precipitation_probability_max: "%",
  windspeed_10m_max: "km/h",
  windgusts_10m_max: "km/h",
  winddirection_10m_dominant: "°",
  shortwave_radiation_sum: "MJ/m²",
  et0_fao_evapotranspiration: "mm"
};

