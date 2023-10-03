<template>
  <footer>
    <span>Meteologica Climate</span>
    <b>- Made by Luis Sanz -</b>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'mainFooter'

});
</script>


<style lang="stylus">

footer
  display flex
  flex-direction column
  justify-content center
  align-items center
  max-width 100%
  background var(--footerBackgroundColor)
  color var(--footerTextColor)
  height 60px
  margin-top 60px
  border 2px solid black

</style>