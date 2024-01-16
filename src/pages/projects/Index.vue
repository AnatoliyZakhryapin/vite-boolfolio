<script>
  import axios from 'axios';
  import ProjectCard from '../../components/ProjectCard.vue';

  export default {
    data() {
      return {
        projects: [],
        currentPage: [],
        lastPage: [],
        projectApiPage: 1,
        qtyForPage: 1,
        tecnologies: [],
        BASE_URL: 'http://127.0.0.1:8000/api',
      }
    },
    components: {
      ProjectCard,
    },
    methods: {
      fetchProjects(postApiPage, qtyForPage) {
        axios.get(`${this.BASE_URL}/projects`, {
          params: {
            page: postApiPage,
            qtyForPage: qtyForPage,
          }
        })
        .then((res) => {
          this.projects = res.data.results.projects.data
          this.currentPage = res.data.results.projects.current_page
          this.lastPage = res.data.results.projects.last_page
          this.tecnologies = res.data.results.tecnologies
          console.log('res',res)
          console.log('prjects',this.projects)
          console.log('tec', this.tecnologies)
        })
      },
      getProjectApiPage($page) {
        this.projectApiPage = $page;
        console.log(this.projectApiPage);
        this.fetchProjects($page, this.qtyForPage)
      },
      getFirstPage() {
        this.fetchProjects(1, this.qtyForPage)
      },
      getLastPage() {
        this.fetchProjects(this.lastPage, this.qtyForPage)
      },
      filtr(newQtyForPage){
        this.qtyForPage = newQtyForPage;
        this.fetchProjects(this.postApiPage, this.qtyForPage)
      }
    },
    created() {
      this.fetchProjects(this.postApiPage, this.qtyForPage)
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

    <!-- Menu filtri -->
    <div class="row mb-5">
      <div class="col">
        <p><strong>CurrentPage:</strong> {{ currentPage }}</p>
        <p><strong>LastPage:</strong> {{ lastPage }}</p>

        <!-- Quantita dei projects per pagina -->
        <p><strong>Projects for page:</strong>
          <ul class="nav">
              <li class="nav-item">
                <button type="button" name='page' class="btn btn-outline-secondary"  @click="filtr(5)">5</button>
              </li>
              <li class="nav-item">
                <button type="button" name='page' class="btn btn-outline-secondary"  @click="filtr(10)">10</button>
              </li>
              <li class="nav-item">
                <button type="button" name='page'  class="btn btn-outline-secondary"  @click="filtr(20)">20</button>
              </li>
            </ul>
        </p>

        <!-- Scelta tecnologie utilizzate -->
        <p class="d-flex gap-3"><strong>Tecnologies:</strong>
          <div class="form-check" v-for="tecnology in tecnologies">>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">{{ tecnology.name }}</label>
          </div>
        </p>
      </div>

      <!-- Navigazione tra le pagine -->
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" @click="getFirstPage()">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="n in lastPage">
            <a class="page-link" href="#" @click="getProjectApiPage(n)">{{ n }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" @click="getLastPage()">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Stampa projects -->
    <div class="row row-gap-5">
      <div class="col-3" v-for="project in projects">
        <ProjectCard :project="project"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">


</style>
