import { ref } from 'vue';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';

export function useCityData() {
  //Creamos una promesa para que carga todo los datos bien con el componente
  return new Promise((resolve, reject) => {

    const cityData = ref<any>({});
    const cityValues = ref<any>({});
    let ipAddress = "";

    // Función para desencriptar datos
    const decryptData = (encryptedData: string) => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, 'cityDataUP');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (error) {
        return null;
      }
    };

    const correcionCoordenadas = (valorOriginal: any) => {
      // Valor original
      // Verificar si el valor es mayor que 1000
      let valorAjustado = valorOriginal;
      if (Math.abs(valorOriginal) > 180 && Math.abs(valorOriginal) < 1800) {
        // Dividir por 100
        valorAjustado = valorOriginal / 10;
      } else if (Math.abs(valorOriginal) > 1800) {
        // Verificar si el valor absoluto está fuera del rango [-1000, 1000]
        // Dividir por 100 (manteniendo el signo)
        valorAjustado = valorOriginal / 100;
      }
      return valorAjustado
      
    }
      //método para coger los datos usando latitude y logitude
      const fetchData = async (decryptedData: any) => {
        decryptedData.latitude =  correcionCoordenadas(decryptedData.latitude);
          decryptedData.longitude =  correcionCoordenadas(decryptedData.longitude);
        try {
          //hacemos el fetch
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${decryptedData.latitude}&longitude=${decryptedData.longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm,temperature_1000hPa,relativehumidity_1000hPa,cloudcover_1000hPa,windspeed_1000hPa,winddirection_1000hPa,geopotential_height_1000hPa,shortwave_radiation,direct_radiation,diffuse_radiation,direct_normal_irradiance,terrestrial_radiation,shortwave_radiation_instant,direct_radiation_instant,diffuse_radiation_instant,direct_normal_irradiance_instant,terrestrial_radiation_instant,uv_index,uv_index_clear_sky,is_day,cape,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&timezone=auto`, {
            method: "GET",
            headers: {},
          });

          //datos de la ciudad
          const data = await response.json();

          // Asignar los valores a cityValues
          cityValues.value.data = data;
          if (!localStorage.getItem('cityData')) {
            // Cambiar los valores de cityData después de obtener cityValues
            cityData.value.name = cityData.value.regionName;
            cityData.value.country = cityData.value.countryName;
            cityData.value.latitude = cityValues.value.latitude;
            cityData.value.longitude = cityValues.value.longitude;
            cityData.value.elevation = cityValues.value.elevation;
          }
          //resolvemos la promesa
          resolve({
            cityValues,
            cityData
          });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      };
      if (!localStorage.getItem('cityData')) {
        // Usando una solicitud a un servicio de terceros
        fetch('https://api64.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            ipAddress = data.ip;
          })
          .catch(error => {
            console.error('Error al obtener la dirección IP:', error);
          });

        // Define la dirección IP que deseas consultar
        const url = `https://freeipapi.com/api/json/${ipAddress}`;

        // Realizar la solicitud HTTP usando axios
        axios.get(url)
          .then(response => {
            const data = response.data;
            cityData.value = data;
            console.log(cityData.value);
            fetchData(data);

          })
          .catch(error => {
            console.error(error);
          });
      }

      // Definimos un computed para obtener el valor del parámetro "data" de la URL
      /*
      const dataValue = computed(() => localStorage.getItem('cityData') as string);
      
    
      // Función para manejar cambios en la query
      const handleQueryChange = async (encryptedData: string) => {
        const decryptedData = decryptData(encryptedData);
    
        if (decryptedData) {
          // Si se descifra correctamente, actualiza cityData
          cityData.value = decryptedData;
    
          // Si se descifra correctamente, actualiza cityData
          fetchData(decryptedData);
          console.log('KHE')
        } else {
          // Si la descifrado falla, establece un valor predeterminado
          console.warn('Ciudad de búsqueda no existente');
        }
      };
    
      // Llamamos a handleQueryChange al cargar la página inicialmente
      handleQueryChange(dataValue.value);
    
      // Creamos un watcher para detectar cambios en dataValue y llamar a la función de manejo
      watch(dataValue, handleQueryChange);
    
      */

      //guardamos el localstorage de la ciudad para que no se reinicie al actualizar
      const storedCityData = localStorage.getItem('cityData');

      //Lo usamos en el caso que no se esté usando la ip, es decir, que estemos buscando un lugar con el buscador
      if (storedCityData !== null) {
        const decryptedData = decryptData(storedCityData);

        if (decryptedData) {
          // Si se descifra correctamente, actualiza cityData
          cityData.value = decryptedData;

          // Si se descifra correctamente, actualiza cityData
          fetchData(decryptedData);
        } else {
          // Si la descifrado falla, establece un valor predeterminado
          console.warn('Ciudad de búsqueda no existente');
        }
      }

      // Retorna las variables cityData y cityValues

    }
  )
}
