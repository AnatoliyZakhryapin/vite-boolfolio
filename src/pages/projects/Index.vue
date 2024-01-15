<script>
  import axios from 'axios';
  import ProjectCard from '../../components/ProjectCard.vue';

  export default {
    data() {
      return {
        projects: [],
        BASE_URL: 'http://127.0.0.1:8000/api',
      }
    },
    components: {
      ProjectCard,
    },
    methods: {
      fetchProjects() {
        axios.get(`${this.BASE_URL}/projects`)
        .then((res) => {
          console.log(res)
          this.projects = res.data.results
          console.log(this.projects)
        })
      }
    },
    created() {
      this.fetchProjects()
      console.log(this.projects)
    }
  }
</script>

<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col text-center">
        <h1>Projects</h1>
      </div>
    </div>
    <div class="row">
      <div class="col" >
        <ProjectCard v-for="project in projects" :project="project"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
