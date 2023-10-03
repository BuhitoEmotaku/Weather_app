<template>
  <div v-if="bool">
    <main class="region-main">


      <section class="cards-climate weatherPreciseData">
        <div class="cityRegion">
          <div class="currentConditionHeader">
            <h2>Tiempo semanal en {{ cityDataRef.name }} - {{ cityDataRef.country }}</h2>
          </div>
        </div>
        <div v-for="(panel, index) in infoPanels" :key="index">
          <div class="infoPanelWeekend" @click="toggleInfo(index)">
            <div>
              <div>
                <span>{{ panel.dayName }}&nbsp;-&nbsp;</span>
                <span>{{ panel.dayNumber }}</span>
              </div>

              <div>
                <span>Max {{ cityValuesRef.daily.temperature_2m_max[index] }} °</span>&nbsp;<span> Min {{
                  cityValuesRef.daily.temperature_2m_min[index] }}°</span>
              </div>

              <div>
                <span>{{ weatherCode[index] }} </span>
              </div>

            </div>
          </div>
          <div v-if="panel.showInfo" :class="{ active: panel.showInfo }" :id="'infoContentWeekend' + index">
            <div v-for="(data, indexx) in dataDescriptionsKeysWeekend" :key="indexx" class="infoContentWeekendInside">
              <span>{{ dataDescriptionsKeysEspanolWeekend[indexx] }}</span>
              <span>{{ cityValuesRef.daily[data][index] }} {{ unitsByKey[data] }}</span>
            </div>
          </div>
        </div>
      </section>


    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, onMounted} from "vue";
import { useCityData } from '@/assets/modulosTS/getDataCity';
import { weatherCodes } from '@/assets/modulosTS/weatherCodes';

import { dataDescriptionsKeysWeekend, dataDescriptionsKeysEspanolWeekend, unitsByKey } from '@/assets/modulosTS/moreDetails';


export default defineComponent({
  name: 'NextHoursView',

  setup() {

    const cityDataRef = ref<{ name: string; country: string } | any>(null);
    const bool = ref<boolean>(false);
    const cityValuesRef = ref<any>({});
    const weatherCode = ref<any>();

    const handleLocalStorageChange = async () => {
      try {
        const { cityData, cityValues } = await useCityData() as {
          cityValues: any;
          cityData: any;
        };
        cityDataRef.value = cityData.value;
        cityValuesRef.value = cityValues._value.data;
        bool.value = true;
        // Llamar a formatHour para calcular currentTime
        weatherCode.value = WeatherDescription(cityValuesRef.value.daily.weathercode)
        const dayNames = updateInfoPanels(cityValuesRef.value.daily.time);



      } catch (error) {
        console.error('Error al obtener los datos de la ciudad:', error);
      }
    };


    const toggleInfo = (index: number) => {
      infoPanels.value[index].showInfo = !infoPanels.value[index].showInfo;
    };


    const infoPanels = ref([
      { title: 'Panel 1', showInfo: false, dayName: '', dayNumber: '' },
      { title: 'Panel 2', showInfo: false, dayName: '', dayNumber: '' },
      { title: 'Panel 3', showInfo: false, dayName: '', dayNumber: '' },
      { title: 'Panel 4', showInfo: false, dayName: '', dayNumber: '' },
      { title: 'Panel 5', showInfo: false, dayName: '', dayNumber: '' },
      { title: 'Panel 6', showInfo: false, dayName: '', dayNumber: '' },
      { title: 'Panel 7', showInfo: false, dayName: '', dayNumber: '' },
    ]);

    const updateInfoPanels = (dates: string[]) => {
      const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

      dates.forEach((dateString: string, index: number) => {
        const date = new Date(dateString);
        const dayOfMonth = date.getDate();
        const formattedDay = dayOfMonth.toString().padStart(2, '0');
        const dayNumber = date.getDay();
        const dayName = days[dayNumber];

        infoPanels.value[index].dayNumber = formattedDay;
        infoPanels.value[index].dayName = dayName;
      });
    };



    // Función para obtener las descripciones de los códigos
    const WeatherDescription = (codesObject: Record<string, number>) => {
      const codes = Object.values(codesObject);
      return codes.map((code: number) => { // Especifica el tipo de 'code' como número
        const matchingCode = weatherCodes.find((item) => item.code === code.toString());
        return matchingCode ? matchingCode.description : 'Código meteorológico no encontrado';
      });
    };



    window.addEventListener('localStorageChanged', handleLocalStorageChange);


    onBeforeUnmount(() => {
      window.removeEventListener("localStorageChanged", handleLocalStorageChange);
    });

    onMounted(() => {
      handleLocalStorageChange();
    });


    return {
      cityDataRef,
      cityValuesRef,
      bool,
      weatherCode,
      infoPanels,
      dataDescriptionsKeysEspanolWeekend,
      dataDescriptionsKeysWeekend,
      unitsByKey,
      toggleInfo
    };
  },
});
</script>

<style scoped lang="stylus">
// Variables de colores
$borderColor = #000
$textColor = #000
$textHoverColor = blue
$backgroundColor = #fff
$borderContentColor = #ddd
$backgroundColorHover = blue
$backgroundColorOpacity = rgba(0, 0, 0, 0.7)
$boxShadowColor = rgba(0, 0, 0, 0.6)
$backgroundColorBlack = black
$backgroundTextColor = rgb(0, 0, 0)
$borderContentColor2 = #fff
$boxShadowColor2 = rgba(0, 0, 0, 0.6)
$backgroundTextColor2 = rgba(255, 255, 255, 1)
$backgroundShadowColor = rgba(124, 99, 128, .8)
$borderColor2 = white
$textShadowColor2 = rgba(4, 7, 82, 0.7) 
$backgroundColorDay = url('@/assets/images/basicActualWeather/day.jpg')
$backgroundColorNight = url('@/assets/images/basicActualWeather/night.jpg')
$backgroundColorSunrise = url('@/assets/images/basicActualWeather/sunrise.jpg')
$backgroundColorSunset = url('@/assets/images/basicActualWeather/sunset.jpg')

.infoPanelWeekend
  background-color var(--backgroundInfoPanelWeekend)
  border 1px solid var(--borderColorInfoPanelWeekend)
  cursor pointer
  color var(--textColorInfoPanelWeekend)
  &:hover
    background-color grey

  & div
    min-height 80px
    display flex
    justify-content center
    align-items center
    flex-wrap wrap

  & div div
    font-size 1.2rem
    padding 0 30px 0 30px

  & span
    font-weight bold

.infoContentWeekend
  background-color $backgroundColor
  border 1px solid $borderContentColor
  padding 10px
  color $textColor

.infoContentWeekend.active
  display block

.infoContentWeekendInside
  display flex
  justify-content space-between
  align-items center
  padding 30px 50px 30px 50px
  font-weight bold
  background-color var(--background-colorInfoContentWeekendInside)
  color: var(--colorInfoContentWeekendInside)

  &:hover
    background-color var(--infoContentWeekendInsideBackgroundColorHover)

.region-main
  width 100%
  height auto
  margin-top 13px

.cards-climate
  overflow hidden
  border-radius 10px
  margin-bottom 10px
  background-repeat no-repeat
  background-size cover
  border 1px solid $borderColor
  box-shadow 5px 5px 6px $boxShadowColor
  background-color $backgroundColorBlack

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
  background-color $backgroundTextColor
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
  text-shadow 4px 4px 5px $textShadowColor2

.maxMin
  display flex
  justify-content center
  width 320px
  font-size 2.0rem
  color $backgroundTextColor2
  text-shadow 4px 2px 1px #470252
  background-color $backgroundShadowColor
  border-radius 10px
  border 1px solid $borderColor2

.temperatureStatus
  font-size 2.4rem
  color yellow
  text-shadow 4px 2px 1px black
  margin-bottom 2px

.backgroundDay
  background-image $backgroundColorDay

.backgroundNight
  background-image $backgroundColorNight

.backgroundSunrise
  background-image $backgroundColorSunrise

.backgroundSunset
  background-image $backgroundColorSunset

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
  box-shadow 5px 5px 6px $boxShadowColor2

.temperatureSensationContainer
  display flex
  flex-direction column
  justify-content space-around
  align-items center
  font-weight bold
  font-size 2rem
  color $textColor
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
  color $textColor
  box-shadow 0px 5px 10px $boxShadowColor2
  border-radius 10px
  background linear-gradient(to bottom, rgba(255, 18, 18, 0.5), rgba(255, 255, 255, 0.5))
  padding 0 5px

.detailInfoContainer
  display flex
  flex-wrap wrap
  gap 47px
  justify-content center
  padding 25px

.detailInfo
  flex 1
  max-width 50%
  border 1px solid $borderContentColor2
  padding 17px
  text-align center
  background-color $backgroundColorOpacity
  border-radius 10px
  color $textColor

.goDetails
  color $backgroundTextColor2
  padding 3px 8px 3px 8px
  border-radius 4px
  background-color $backgroundColorHover
  border 2px solid $borderColor

  transition background-color .3s linear

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
    background-color red

@media (max-width: 820px)
  .sunRiseSetImgTemperatureSensation
    gap 0px
    justify-content center
  .temperatureSensationContainer
    padding 0
  .detailInfoContainer
    flex-direction column
    gap 0px

  .detailInfo
    flex 1 100%
    min-width 88%
    display flex
    flex-direction column
    justify-content space-between
    font-size 1rem

@media (max-width: 500px)
  .detailCommon
    flex-direction column

</style>
