<script>

import AppHeader from './components/AppHeader.vue';
  export default {
    components: {
      AppHeader,
    }
  }
</script>

<template>
  <AppHeader></AppHeader>
  <RouterView></RouterView>
</template>

<style lang="scss">
@use "./style/general.scss";

</style>