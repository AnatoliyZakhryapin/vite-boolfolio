<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        projects: [],
        BASE_URL: 'http://127.0.0.1:8000/api',
      }
    },
    methods: {
      fetchProjects() {
        axios.get(`${this.BASE_URL}/projects`)
        .then((res) => {
          console.log(res)
        })
      }
    },
    created() {
      this.fetchProjects()
    }
  }
</script>

<template>
  <h1>Projects</h1>
</template>

<style lang="scss">


</style>
