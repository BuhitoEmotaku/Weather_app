<template>
  <div>
    <div class="theme-switch-wrapper">
      <label class="theme-switch" for="checkbox">
        <input @click="toggleTheme" v-model="isDarkTheme" type="checkbox" id="checkbox" :checked="isDarkTheme" />
        <div class="slider round"></div>
      </label>
      <em>Modo oscuro!</em>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'ThemeSwitcher',
  setup() {

    const isDarkTheme = ref(localStorage.getItem('theme') === 'dark');
    //Método para controlar el tema, blanco o negro según la opción escogida
    const toggleTheme = () => {
      const newTheme = isDarkTheme.value ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      isDarkTheme.value = !isDarkTheme.value;
      const localStorageChangeEvent = new Event('changeTheme');
      window.dispatchEvent(localStorageChangeEvent);
    };

    return {
      isDarkTheme,
      toggleTheme,
    };
  },
};
</script>

<style lang="stylus">
// Variables de colores
$switchBackgroundColor = #fff
$switchBackgroundColorChecked = #66bb6a
$sliderColor = black
$sliderRoundBorderColor = black

/* Simple stylus to style it like a toggle switch */
.theme-switch-wrapper
  display flex
  align-items center

em
  margin-left 10px
  font-size 1.4rem

.theme-switch
  display inline-block
  height 34px
  position relative
  width 60px

.theme-switch input
  display none

.slider
  position absolute
  cursor pointer
  bottom 0
  left 0
  right 0
  top 0
  transition .5s
  border 1px solid $sliderColor

.slider:before
  background-color $switchBackgroundColor
  bottom 2px
  content ""
  height 26px
  left 4px
  position absolute
  transition .4s
  width 26px

input:checked + .slider
  background-color $switchBackgroundColorChecked

input:checked + .slider:before
  transform translateX(26px)

.slider.round
  border-radius 30px

.slider.round:before
  border 1px solid $sliderRoundBorderColor
  border-radius 50%
</style>