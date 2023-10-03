<template>
  <div class="backgroundGradient" :data-theme=componentTypes[5]></div>
  <BannerWeather :data-theme=componentTypes[0]></BannerWeather>
  <CittySearch :data-theme=componentTypes[1]></CittySearch>
  <PremiumSubscriptionModal :data-theme=componentTypes[2]></PremiumSubscriptionModal>
  <div class="optionsWeather" :data-theme=componentTypes[3]>
    <router-link to="/">24h</router-link>
    <router-link to="/about">Semanal</router-link>
  </div>

  <main class="mainContent" :data-theme=componentTypes[6]>
    <router-view></router-view>
  </main>
  <mainFooter :data-theme=componentTypes[4]></mainFooter>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import BannerWeather from "@/components/BannerWeather.vue";
import CittySearch from "@/components/CittySearch.vue";
import PremiumSubscriptionModal from "@/components/PremiumSubscriptionModal.vue";
import mainFooter from "@/components/mainFooter.vue";

import { ref, onMounted, onBeforeUnmount } from 'vue';
export default defineComponent({
  components: {
    BannerWeather,
    CittySearch,
    PremiumSubscriptionModal,
    mainFooter

  },
  setup() {
    // Definimos una variable reactiva llamada isDarkTheme para controlar el tema.
    const isDarkTheme = ref<any>('');
    // Inicializamos componentTypes con un valor predeterminado (puede ser light o dark).
    const componentTypes = ref([
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ]);
    const componentDark = [
      'darkBannerWeather',
      'darkCittySearch',
      'darkPremiumSubscriptionModal',
      'darkOptionsWeather',
      'darkMainFooter',
      'darkbackgroundGradient',
      'darkMainRouterLink'
    ];
    const componentLight = [
      'lightBannerWeather',
      'lightCittySearch',
      'lightPremiumSubscriptionModal',
      'lightOptionsWeather',
      'lightMainFooter',
      'lightbackgroundGradient',
      'lightMainRouterLink'
    ];
    
    // Esta función manejará el cambio en el almacenamiento local (localStorage).
    const handleLocalStorageChange = () => {
      // Obtenemos el valor almacenado en 'theme' en localStorage y lo asignamos a isDarkTheme.
      isDarkTheme.value = localStorage.getItem('theme');
      if (isDarkTheme.value == 'dark') {
        componentTypes.value = componentDark
      } else {
        componentTypes.value = componentLight
      }
    }
    // Verificamos si el tema no está definido en localStorage, y si es así, lo establecemos en "light".
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }
    
    // Agregamos un event listener personalizado llamado 'changeTheme' que activará handleLocalStorageChange cuando se llame.
    window.addEventListener('changeTheme', handleLocalStorageChange);

    // Eliminamos el event listener cuando el componente se desmonte para evitar posibles pérdidas de memoria.
    onBeforeUnmount(() => {
      window.removeEventListener("changeTheme", handleLocalStorageChange);
    });

    // Al montar el componente, llamamos a handleLocalStorageChange para inicializar isDarkTheme con el valor actual.
    onMounted(() => {
      handleLocalStorageChange();
    });

    // Devolvemos isDarkTheme para que pueda ser utilizado en el componente.
    return {
      componentTypes
    };
  }
});
</script>

<style lang="stylus">
@import url('@/assets/styles/themes.css');

#app
  font-family Source Sans Pro,sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color white

a
	text-decoration none
	font-weight 700

.optionsWeather
  display flex
  flex-direction row
  justify-content center
  background-color var(--background)
  border 2px solid black

.optionsWeather a
  position relative
  transition color 0s linear
  margin 15px
  display flex
  align-items center
  color var(--white)

  &::before
    content ''
    position absolute
    top 110%
    width 100%
    height 2px
    background-color var(--white)
    transform scaleX(0)
    transition transform 0.2s linear
    
  &:hover::before,
  &.router-link-exact-active::before
    transform scaleX(1)
/* nav li:hover,
 nav li.router-link-active,
 nav li.router-link-exact-active {
   background-color: indianred;
   cursor: pointer;
 }
 */
ul li
  text-decoration: none;
  list-style: none;
.mainContent
  margin: 0 auto !important;
  max-width 900px

.backgroundGradient
  background-image: var(--background-gradient)
  position fixed
  width 100vw
  height 100vh
  z-index -99999
  
</style>