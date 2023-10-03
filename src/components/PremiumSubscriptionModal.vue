<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <button @click="closeModal" class="close-button">X</button>
      </div>
      <div class="modal-content">
        <!-- Contenido del modal aquí -->
        <h2>
        </h2>
        <h2>¿Quieres seguir utilizando nuestro contenido?</h2>
        <h3>Apuntate a nuestro plan de suscripciones!</h3>
        <router-link to="/subscription"><img class="premiumSubscription" src="@/assets/SuscriptionPremium.png" alt="premiumSubscription"></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount } from 'vue';
export default {
  name: 'PremiumSubscriptionModal',
  setup() {
    
    //Creación de variables reactivas
    const isModalOpen = ref(false);

    //Método para abrir o cerrar modal
    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };
    //Método cerrar modal
    const closeModal = () => {
      isModalOpen.value = false;
    };
    
    // Reiniciar countBusquedas al reiniciar la página
    const resetCountOnUnload = () => {
      localStorage.setItem('countBusquedas', '0');
    };

    // Agregar un listener para hacer check
    window.addEventListener('checkCountBusquedas', toggleModal);

    // Utilizamos onBeforeUnmount para resetear el localStorage
    onBeforeUnmount(() => {
      resetCountOnUnload();
    });

    return {
      isModalOpen,
      toggleModal,
      closeModal,
    };
  }
};
</script>

<style lang="stylus">
// Variables de colores
$modalOverlayBackgroundColor = rgba(0, 0, 0, 0.5)
$modalBackgroundColor = #fff
$modalBoxShadowColor = rgba(0, 0, 0, 0.6)
$modalContentColor = black

.modal-overlay
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background $modalOverlayBackgroundColor
  display flex
  justify-content center
  align-items center
  z-index 999999

.modal
  background var(--modalBackgroundColor)
  padding 20px
  border-radius 5px
  box-shadow 0px 0px 10px $modalBoxShadowColor
  color var(--modalColor)

.modal-header
  display flex
  justify-content flex-end

.close-button
  background none
  border none
  font-size 1.2rem
  cursor pointer
  color var(--modalColor)

.modal-content
  padding 20px

.premiumSubscription
  width 300px
  height auto

</style>