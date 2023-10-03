<template>
  <div class="opcionesBusqueda">
    <input id="search" type="search" v-model="searchInput" placeholder="Ciudad para buscar..." autofocus required
      autocomplete="off" @input="fetchDataInput" @click="fetchDataInput" />
    <div class="citiesSearch">
      <div class="citiesContainer">
        <div class="cittyUnic" v-for="(city, index) in cityList" :key="index" @click="sendCityData(city)">
          <b>{{ city.name }}, {{ city.country }}</b>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onUnmounted } from "vue";
import * as CryptoJS from 'crypto-js';

export default defineComponent({
  name: 'CittySearch',

  setup() {
    //Creación de interfaces
    interface CityData {
      name: string;
      country: string;
      latitude: number;
      longitude: number;
      elevation: number;
    }

    //Creación de variables reactivas
    const searchInput = ref<string>("");
    const cityList = ref<CityData[] | null>([]);

    //Fetch data para conseguir datos de la api
    const fetchDataInput = () => {
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput.value}&count=10&language=es&format=json`, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.json().then((data) => {

            // Accede a la clave "results" para obtener la lista de ciudades
            const results = data.results;


            // Procesa todos los objetos de la lista de ciudades y guarda sus nombres y países en cityList
            cityList.value = [];
            if (results)
              for (const item of results) {
                cityList.value.push({
                  name: item.name,
                  country: item.country,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  elevation: item.elevation
                });
              }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    /*const router = useRouter(); // Usa useRouter para acceder al enrutador
    const sendCityData = (data:CityData) => {
      
      // Convierte el objeto Proxy en un objeto JavaScript estándar
      const cityData = Object.assign({}, data);
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(cityData), 'cityDataUP').toString();

      
      // Luego, pasa cityData a router.push
      router.push({ name: 'home', query: { data: encryptedData } });
    };
*/
    //Método para mandar los datos por localstorage para que otros componentes lo detecten
    const sendCityData = (data: CityData) => {

      // Convierte el objeto Proxy en un objeto JavaScript estándar
      const cityData = Object.assign({}, data);
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(cityData), 'cityDataUP').toString();

      localStorage.setItem('cityData', encryptedData);
      // Dispara un evento personalizado llamado 'localStorageChanged'
      let storedCount = Number(localStorage.getItem('countBusquedas'));
      storedCount += 1;
      console.log(storedCount)

      //Checkeamos si el contador de búsquedas es mayor a 5
      if (storedCount > 5) {
        const checkCountBusquedas = new Event('checkCountBusquedas');
        window.dispatchEvent(checkCountBusquedas);
      } else {
        //mandamos un evento del localstorage cambiado
        localStorage.setItem('countBusquedas', String(storedCount))
        const localStorageChangeEvent = new Event('localStorageChanged');
        window.dispatchEvent(localStorageChangeEvent);
        cityList.value = null;

      }

    }

    //Método para comprobar el toggle del menú de búsqueda
    const toggleCityList = (event: any) => {
      if (event.target.className !== "citiesSearch") {
        // Si cityList no es null y se hace clic fuera de citiesSearch, establece cityList nuevamente en null
        cityList.value = null;
      }
    }

    //Añadimos el listener al montarse el componenteee
    onMounted(() => {
      window.addEventListener("click", toggleCityList);
    });

    //Quitamos el listener al quitarse el componente
    onUnmounted(() => {
      window.removeEventListener("click", toggleCityList);
    });

    // Utiliza watch para observar cambios en searchInput y ejecutar fetchData
    watch(searchInput, () => {
      fetchDataInput();
    });

    return {
      searchInput,
      cityList,
      fetchDataInput,
      sendCityData,
      toggleCityList
    };
  },


});
</script>

<style scoped lang="stylus">
$cittyUnicHoverBackgroundColor = #2a5fdb
$cittyUnicHoverColor = white

.opcionesBusqueda
  width 100%
  height 70px
  background #0314336b
  display flex
  flex-direction column
  justify-content center

#search
  margin 0 auto
  padding 12px 20px

input
  width 100px
  height 40px
  border 0
  color white
  font-size 1.2rem

.error-input-border
  border 1px solid #FF0000

input[type="search"]
  border-radius 6px
  border 2px solid #63ffb6
  text-align center
  outline 0
  width 390px
  background var(--backgroundInput)
  appearance none
  font-weight bold
  color var(--colorInput)

.citiesContainer
  color var(--white)
  position absolute
  height auto
  margin 0 auto
  width 380px
  border 1px solid var(--white)
  background-color var(--citiesContainerBackgroundColor)
  border-radius 9px
  top 132px
  left 0
  right 0
  z-index 100

.cittyUnic
  font-size 1.2rem
  display flex
  align-items center
  height 35px
  font-weight 200
  justify-content center

.cittyUnic:hover
  cursor pointer
  border-radius 10px
  background-color $cittyUnicHoverBackgroundColor
  color $cittyUnicHoverColor
</style>
