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
  <main class="page-main">
    <RouterView></RouterView>
  </main>
</template>

<style lang="scss">
@use "./style/general.scss" ;

.page-main{
  padding-top: 100px;
}
</style>