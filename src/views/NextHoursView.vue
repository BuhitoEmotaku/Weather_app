<template>
  <div v-if="bool">
    <main class="region-main">
      <section :class="['cards-climate', backgroundImageClass]">
        <div class="cityRegion">
          <div class="currentConditionHeader">
            <h2>{{ cityDataRef.name }} - {{ cityDataRef.country }} / <span class="currentConditionTimestamp">
                {{ currentTime.hour }}:{{ currentTime.minute }} {{ currentTime.ampm }}
              </span></h2>
          </div>
        </div>
        <div class="basicWeatherData">
          <div class="infoCurrentWeather">
            <span class="currentTemperature">{{ cityValuesRef.current_weather.temperature }}°</span>
            <span class="temperatureStatus"><b>{{ weatherCode }} </b></span>
            <span class="maxMin"><b>Max {{ cityValuesRef.daily.temperature_2m_max[0] }} °</b>&nbsp;<b> Min {{
              cityValuesRef.daily.temperature_2m_min[0] }}°</b></span>
          </div>
        </div>
      </section>

      <section class="cards-climate weatherPreciseData">
        <div class="cityRegion">
          <div class="currentConditionHeader">
            <h2>Tiempo detallado en {{ cityDataRef.name }} - {{ cityDataRef.country }}</h2>
          </div>
        </div>
        <div class="basicWeatherData">
          <div class="infoCurrentWeather spaceCorrection">
            <div class="sunRiseSetImgTemperatureSensation">
              <div class="temperatureSensationContainer">
                <span>Sensación Térmica</span>
                <b class="temperatureSensation">{{ cityValuesRef.hourly.apparent_temperature[currentTime.hour] }}°</b>
              </div>
              <div class="sunsetSunrise"><img class="sunRiseSetImg"
                  src="@/assets/images/basicActualWeather/sunriseSunset.png" alt="imgSunriseSunset">
                <div class="sunsetSunrisetHours">
                  <span><b>{{ sunriseTime }}</b></span>
                  <span><b> {{ sunsetTime }}</b></span>
                </div>
              </div>
            </div>

            <div class="detailInfoContainer">
              <div class="detailInfo">
                <div v-for="(value, index) in propiedadesComunes" :key="value">
                  <div class="detailCommon">
                    <div>{{ propiedadesComunesEspacios[index] }}</div>
                    <div>{{ cityValuesRef.hourly[value][currentTime.hour] }}{{ cityValuesRef.hourly_units[value] }}</div>



                  </div>
                </div>
              </div>
              <div class="detailInfo">
                <div v-for="(value, index) in propiedadesMenosComunes" :key="value">
                  <div class="detailCommon">
                    <div>{{ propiedadesMenosComunesEspacios[index] }}</div>
                    <div>{{ cityValuesRef.hourly[value][currentTime.hour] }} {{ cityValuesRef.hourly_units[value] }}</div>

                  </div>
                </div>
              </div>
            </div>
            <h1><router-link class="goDetails" to="/about">Ver más</router-link></h1>
          </div>
        </div>
      </section>
      <section class="cards-climate weatherPreciseData">
        <iframe style="width: 100%; height: 400px;"
          :src="'https://maps.google.com/maps?q=' + cityValuesRef.latitude + ',' + cityValuesRef.longitude + '&hl=es;z=14&amp;output=embed'"></iframe>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, onMounted} from "vue";
import { useCityData } from '@/assets/modulosTS/getDataCity';
import { weatherCodes } from '@/assets/modulosTS/weatherCodes';

import { propiedadesComunes, propiedadesMenosComunes, propiedadesComunesEspacios, propiedadesMenosComunesEspacios } from '@/assets/modulosTS/moreDetails';

export default defineComponent({
  name: 'NextHoursView',

  setup() {

    // Declaramos las variables reactivas que vamos a utilizar
    const cityDataRef = ref<{ name: string; country: string } | any>(null);
    const bool = ref<boolean>(false);
    const cityValuesRef = ref<any>({});
    const currentTime = ref<{ hour: number; minute: string; ampm: string }>({
      hour: 0,
      minute: '00',
      ampm: 'AM',
    });
    const sunriseTime = ref<number | any>();
    const sunsetTime = ref<number | any>();
    const weatherCode = ref<string>();
    const backgroundImageClass = ref<string>('');


    // Esta función manejará el cambio en el almacenamiento local (localStorage)
    const handleLocalStorageChange = async () => {
      try {
        const { cityData, cityValues } = await useCityData() as {
          cityValues: any;
          cityData: any;
        };

        // Asignamos los datos obtenidos a las variables reactivas correspondientes
        cityDataRef.value = cityData.value;
        cityValuesRef.value = cityValues._value.data;
        bool.value = true;
        updateSunriseSunsetTimes();
        changeBackground(cityValuesRef.value.current_weather.time)
        // Llamar a formatHour para calcular currentTime
        formatHour(cityValuesRef.value.current_weather.time, true);

      } catch (error) {
        console.error('Error al obtener los datos de la ciudad:', error);
      }
    };


    // Función para dar formato a la hora
    const formatHour = (dateTimeString: any, mainLogic = false) => {
      const dateTime = new Date(dateTimeString);
      const hour = parseInt(dateTime.getHours().toString(), 10);
      const minute = dateTime.getMinutes().toString().padStart(2, '0');
      const ampm = hour >= 12 ? 'PM' : 'AM';
      // Si se está llamando desde la lógica principal, calculamos el código meteorológico
      if (mainLogic) {
        weatherCode.value = WeatherDescription();
      }
      // Actualizamos la hora actual
      currentTime.value = { hour, minute, ampm };
      return { hour, minute, ampm }
    };

    // Función para cambiar el fondo según la hora del día
    const changeBackground = (dateTimeString: any) => {
      const hour = formatHour(dateTimeString).hour;
      const sunset = sunsetTime.value.split(':').map(Number);
      const sunrise = sunriseTime.value.split(':').map(Number);
      if (hour >= (sunrise[0] + 1) && hour < sunset[0]) {
        backgroundImageClass.value = 'backgroundDay';
      } else if (hour >= (sunset[0] + 1) || hour < sunrise[0]) {
        backgroundImageClass.value = 'backgroundNight';
      } else if (hour >= sunrise[0] && hour < (sunrise[0] + 1)) {
        backgroundImageClass.value = 'backgroundSunrise';
      } else if (hour >= sunset[0] && hour < (sunset[0] + 1)) {
        backgroundImageClass.value = 'backgroundSunset';
      }
      return '';
    };

    // Función para obtener la descripción del tiempo según el código meteorológico
    const WeatherDescription = () => {
      const matchingCode = weatherCodes.find(item => item.code.includes(cityValuesRef.value.current_weather.weathercode));
      return matchingCode ? matchingCode.description : 'Código meteorológico no encontrado';
    };

    // Función para dar formato a la hora y minutos
    const formatHourMeth = (dateTimeString: any) => {
      const formattedTime = formatHour(dateTimeString);
      return `${formattedTime.hour}:${formattedTime.minute}`;
    };

    // Función para actualizar las horas de amanecer y atardecer
    const updateSunriseSunsetTimes = () => {
      sunriseTime.value = formatHourMeth(cityValuesRef.value.daily.sunrise[0]);
      sunsetTime.value = formatHourMeth(cityValuesRef.value.daily.sunset[0]);
    };

    // Agregamos un event listener personalizado llamado 'localStorageChanged' que activará handleLocalStorageChange cuando se llame.
    window.addEventListener('localStorageChanged', handleLocalStorageChange);

    // Eliminamos el event listener cuando el componente se desmonte para evitar posibles problemas de memoria.
    onBeforeUnmount(() => {
      window.removeEventListener("localStorageChanged", handleLocalStorageChange);
    });

    // Al montar el componente, llamamos a handleLocalStorageChange para inicializar los datos y tiempos.
    onMounted(() => {
      handleLocalStorageChange();
    });

    // Devolvemos las variables y funciones que se utilizarán en el componente.
    return {
      cityDataRef,
      cityValuesRef,
      bool,
      currentTime,
      sunriseTime,
      sunsetTime,
      weatherCode,
      backgroundImageClass,
      propiedadesMenosComunes,
      propiedadesComunes,
      propiedadesMenosComunesEspacios,
      propiedadesComunesEspacios,
      formatHour,
      formatHourMeth,
      updateSunriseSunsetTimes
    };
  },
});
</script>

<style scoped lang="stylus">
// Variables de colores
$backgroundGradientStart = #000
$backgroundGradientEnd = #fff
$backgroundTextColor = #fff
$borderColor = black
$textShadowColor = rgba(0, 0, 0, .5)
$backgroundColorNight = #000000f7
$backgroundColorHover = #2a5fdb
$backgroundColorDay = #254b5e
$backgroundColorSunset = #748ae3
$backgroundGradientRed = rgba(255, 18, 18, 0.5)
$backgroundColorOpacity = rgba(0, 0, 0, 0.8)

.region-main
  width 100%
  height auto
  margin-top 13px

.cards-climate
  overflow hidden
  border-radius 10px
  margin-bottom 10px
  text-shadow $textShadowColor
  background-repeat no-repeat
  background-size cover
  padding-bottom 14px
  background-image var(--cards-climateBackgroundColor)
  border 1px solid $borderColor

.topCityInfo
  width 100%
  height 50px

.currentConditionHeader
  margin-left 20px
  display flex

.currentConditionTimestamp
  font-size 1.1rem

.cityRegion
  height 50px
  background-color $backgroundColorOpacity
  display flex
  align-items center

.infoCurrentWeather
  display flex
  flex-direction column
  text-align left
  margin 0 30px 0 30px

.spaceCorrection
  margin-top 15px
  text-align center

.currentTemperature
  font-size 6.7rem
  text-shadow 4px 4px 5px $textShadowColor

.maxMin
  display flex
  justify-content center
  width 320px
  font-size 2.0rem
  color $backgroundTextColor
  text-shadow 4px 2px 1px #470252
  background-color rgba(124, 99, 128, .8)
  border-radius 10px
  border 1px solid white

.temperatureStatus
  font-size 2.4rem
  color yellow
  text-shadow 4px 2px 1px black
  margin-bottom 2px

.backgroundDay
  background-image url('@/assets/images/basicActualWeather/day.jpg')

.backgroundNight
  background-image url('@/assets/images/basicActualWeather/night.jpg')

.backgroundSunrise
  background-image url('@/assets/images/basicActualWeather/sunrise.jpg')

.backgroundSunset
  background-image url('@/assets/images/basicActualWeather/sunset.jpg')

.sunRiseSetImg
  width 250px
  height auto

.sunRiseSetImgTemperatureSensation
  display flex
  justify-content center
  margin-top 20px
  gap 18%

.sunsetSunrise
  display flex
  flex-direction column
  border-radius 10px
  border 2px solid $borderColor
  background-color $backgroundColorSunset
  margin-left 27px

.sunsetSunrise div
  padding 0 23px
  display flex
  justify-content space-between
  font-size 1.6rem
  margin-bottom 10px

.sunsetSunrise div span
  color orange
  border 2px solid $borderColor
  padding 0.6px
  border-radius 10px
  background linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 0, 0, 0.5))
  box-shadow 5px 5px 6px rgba(0, 0, 0, 0.8)

.temperatureSensationContainer
  display flex
  flex-direction column
  justify-content space-around
  align-items center
  font-weight bold
  font-size 2rem
  color black
  text-align center

.temperatureSensationContainer span
  box-shadow 0px 5px 10px rgba(255, 255, 255, 0.8)
  border-radius 10px
  padding 13px
  background linear-gradient(to bottom, rgba(255, 255, 255, 0.68), rgba(255, 0, 0, 0.5))
  text-shadow 4px 4px 5px rgba(255, 255, 255, .6)
  font-size 1.4rem

.temperatureSensationContainer b
  margin 10px
  font-size 3rem
  padding 5px 20px

.temperatureSensation
  font-weight bold
  color black
  box-shadow 0px 5px 10px rgba(0, 0, 0, 0.8)
  border-radius 10px
  background linear-gradient(to bottom, $backgroundGradientRed, rgba(255, 255, 255, 0.5))
  padding 0 5px

.detailInfoContainer
  display flex
  flex-wrap wrap
  gap 47px
  justify-content center
  padding 25px

.detailInfo 
  flex 1 /* Ocupa la mitad del ancho disponible */
  max-width 50% /* Evita que los divs sean más estrechos que la mitad del ancho */
  border 1px solid $backgroundTextColor
  padding 17px
  text-align center
  background-color: var(--detailInfoBackground)
  border-radius 10px
  color var(--colorDetailInfo)
  font-weight bold
  border: 2px solid black;

.goDetails
  color: $backgroundTextColor
  padding: 5px 9px 5px 9px
  border-radius: 4px
  background-color: #00f
  border: 2px solid $borderColor
  transition: background-color 0.3s linear

  &:hover
    background-color red
    border 1px solid $borderColor

.detailCommon
  display flex
  justify-content space-between
  align-items center
  padding 10px
  border-radius 10px

  &:hover
    border 1px solid $borderColor
    background-color var(--detailCommon)

@media (max-width: 820px) 
  .sunRiseSetImgTemperatureSensation
    gap 0px
    justify-content center
  .temperatureSensationContainer
    padding 0
  .detailInfoContainer 
    flex-direction column /* Cambia a disposición en columna cuando no hay suficiente espacio */
    gap 0px

  .detailInfo 
    flex 1 100% /* Ocupa el 100% del ancho cuando no hay suficiente espacio */
    min-width 88% /* Asegura que ocupe el 100% del ancho mínimo */
    display flex
    flex-direction column
    justify-content space-between
    font-size 1rem

@media (max-width: 500px) 
  .temperatureSensationContainer 
    padding 0px
    & span
      padding 0px
  .detailCommon
    flex-direction column
  .sunRiseSetImg
    width: 202px
  .sunsetSunrise
    margin-left 0px
</style>
