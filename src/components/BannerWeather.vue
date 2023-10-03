<template>
  <header>
    <div class="logoTopLeft">
      <a href="#"><img src="../assets/meteologica.png" class="logoWeather" alt="logoWeather">
        <img class="logoSunMoon" src="../assets/sunMoon.png" alt="">
      </a>
    </div>

    <ul class="itemsNavbar" v-if="isMenuOpen">
      <li><router-link to="/future">💻 Quiénes Somos</router-link></li>
      <li><router-link to="/future">🌕🌙 Qué Ofrecemos</router-link></li>
      <li><router-link to="/future">⭐ Suscripciones</router-link></li>
      <li><router-link to="/future">📞 Contáctanos</router-link></li>
    </ul>
    <span class="buttonMenu" @click="toggleMenu">Menú</span>


    <div class="main" @click="toggleModal">
      <b><i>ES | °C
        </i></b>
    </div>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <button @click="closeModal" class="close-button">X</button>
        </div>
        <div class="modal-content">
          <!-- Contenido del modal aquí -->
          <h2>
            <ThemeSwitcher />
          </h2>
          <h2>°C -> °F No disponible</h2>
          <button @click="resetPremium" class="resetSubscription"><b>Resetear subscripción</b></button>
        </div>
      </div>
    </div>

  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

export default defineComponent({
  name: 'BannerWeather',
  components: {
    ThemeSwitcher

  },
  setup() {
    // Variable reactiva que controla si el modal está abierto o cerrado
    const isModalOpen = ref(false);

    // Función para alternar la apertura/cierre del modal
    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };

    // Función para cerrar el modal
    const closeModal = () => {
      isModalOpen.value = false;
    };

    // Función para reiniciar el contador de búsquedas premium en el localStorage
    const resetPremium = () => {
      localStorage.setItem('countBusquedas', '0')
    };

    // Variable reactiva que controla si el menú está abierto o cerrado (inicialmente abierto)
    const isMenuOpen = ref(true);

    // Variable reactiva para realizar un seguimiento de si el menú ha sido revisado o no
    const checkMenu = ref(false);

    // Función para alternar la apertura/cierre del menú y gestionar el tamaño de la ventana
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    // Función que gestiona el tamaño de la ventana del navegador
    const handleWindowResize = () => {
      if (window.innerWidth < 1070 && checkMenu.value != true) {
        isMenuOpen.value = false; // Cierra el menú si el ancho es menor que 1070px
        checkMenu.value = true;
      } else if (window.innerWidth > 1070 && checkMenu.value != false) {
        checkMenu.value = false; // Abre el menú si el ancho es mayor o igual a 1070px
        isMenuOpen.value = true;
      }
    };

    // Observa el tamaño de la ventana y actualiza el estado del menú
    const resizeHandler = () => {
      handleWindowResize();
    };

    // Maneja el tamaño de la ventana al cargar el componente
    onMounted(() => {
      handleWindowResize();
      window.addEventListener('resize', resizeHandler);
    });

    // Limpia el evento resize al desmontar el componente
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler);
    });

    //retorno varariables al template
    return {
      isModalOpen,
      isMenuOpen,
      toggleMenu,
      toggleModal,
      closeModal,
      resetPremium

    };
  }

});
</script>

<style scoped lang="stylus">
// Variables de colores

navbarBoxShadow = rgba(0, 0, 0, 0.8)
navbarTextHoverColor = black
navbarTextHoverShadow = 0 110%, 100%, 3px 2px #effc35

modalOverlayBackgroundColor = rgba(0, 0, 0, 0.5)
modalBoxShadow = rgba(0, 0, 0, 0.6)
resetSubscriptionBackgroundColor = #007bff
resetSubscriptionTextColor = #fff
resetSubscriptionHoverBackgroundColor = #0056b3
buttonMenuTextColor = white

header
  position relative
  width 100%
  height 75px
  display flex
  align-items center
  justify-content space-around
  background var(--navbarBackgroundColor)
  border-radius 4px
  z-index 1000

.logoWeather
  width 100px
  height auto

.logoSunMoon
  width 80px
  height auto

ul li
  padding 5px

.itemsNavbar
  display flex

.logoTopLeft a
  display flex
  align-items center
  justify-content center
  color black

.main
  padding 10px
  border 1px solid black
  background-color #254b5e
  cursor pointer
  border-radius 6px

.itemsNavbar a
  position relative
  transition color 0.3s linear
  color var(--navbarTextColor)
  font-size 1.2rem

  &::before
    content ''
    position absolute
    top 110%
    width 100%
    height 3px
    background-color #effc35
    transform scaleX(0)
    transition transform 0.3s linear

  &:hover::before
    transform scaleX(1)

.modal-overlay
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background modalOverlayBackgroundColor
  display flex
  justify-content center
  align-items center

.modal
  background var(--modalBackgroundColor)
  padding 20px
  border-radius 5px
  box-shadow modalBoxShadow
  border: 1px solid var(--borderModal);

.modal-header
  display flex
  justify-content flex-end

.close-button
  background none
  border none
  font-size 1.2rem
  cursor pointer
  color var(--modalTextColor)

.modal-content
  padding 20px
  color var(--modalTextColor)

.resetSubscription
  width 100px
  height auto
  border-radius 20px
  background-color resetSubscriptionBackgroundColor
  padding 10px
  color resetSubscriptionTextColor
  font-size 14px
  border none
  cursor pointer

.resetSubscription:hover
  background-color resetSubscriptionHoverBackgroundColor

.buttonMenu
  display none
  padding 10px
  background-color var(--buttonMenuBackgroundColor)
  font-weiht bold
  cursor pointer

@media (max-width: 1070px)
  .buttonMenu
    display block
    border-radius 10px
    background-color var(--buttonMenuTextColor)
    border 2px solid var(--buttonMenuColor)
  .itemsNavbar
    display flex
    flex-direction column
    border-radius 10px
    border 1px solid black
    padding 20px
    background-color #6565b3
    position absolute
    top 60px
    right 0
    left 0

</style>

