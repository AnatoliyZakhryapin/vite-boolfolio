<script>
  import axios from 'axios';
  import ProjectCard from '../../components/ProjectCard.vue';

  export default {
    data() {
      return {
        projects: [],
        currentPage: [],
        lastPage: [],
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
          this.projects = res.data.results.data
          this.currentPage = res.data.results.current_page
          this.lastPage = res.data.results.last_page
          console.log(this.projects)
          console.log(this.currentPage)
          console.log(this.lastPage)
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
    <div class="row mb-5">
      <div class="col">
        <p><strong>CurrentPage:</strong> {{ currentPage }}</p>
        <p><strong>LastPage:</strong> {{ lastPage }}</p>
      </div>
    </div>
    <div class="row row-gap-5">
      <div class="col-6" v-for="project in projects">
        <ProjectCard :project="project"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
