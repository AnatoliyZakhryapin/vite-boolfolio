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
        types: [],
        BASE_URL: 'http://127.0.0.1:8000/api',
        formRequest: {
          typesSelected: []
        },
      }
    },
    components: {
      ProjectCard,
    },
    methods: {
      fetchProjects(postApiPage, qtyForPage, formRequest) {
        axios.get(`${this.BASE_URL}/projects`, {
          params: {
            page: postApiPage,
            qtyForPage: qtyForPage,
            formRequest: formRequest,
          }
        })
        .then((res) => {
          this.projects = res.data.results.projects.data
          this.currentPage = res.data.results.projects.current_page
          this.lastPage = res.data.results.projects.last_page
          this.tecnologies = res.data.results.tecnologies
          this.types = res.data.results.types
          console.log('risposta axios',res)
          console.log('return projects',this.projects)
        })
      },
      getProjectApiPage($page) {
        this.projectApiPage = $page;
        console.log(this.projectApiPage);
        this.fetchProjects($page, this.qtyForPage, this.formRequest)
      },
      goToFirstPage() {
        this.fetchProjects( 1, this.qtyForPage, this.formRequest)
      },
      goToLastPage() {
        this.fetchProjects(this.lastPage, this.qtyForPage, this.formRequest)
      },
      filtrQtyPage(newQtyForPage){
        this.qtyForPage = newQtyForPage;
        this.fetchProjects(this.postApiPage, this.qtyForPage, this.formRequest)
      },
      filtrPage(){
        console.log('checkbox', this.formRequest)
        this.fetchProjects(this.postApiPage, this.qtyForPage, this.formRequest)
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
                <button type="button" name='page' class="btn btn-outline-secondary"  @click="filtrQtyPage(5)">5</button>
              </li>
              <li class="nav-item">
                <button type="button" name='page' class="btn btn-outline-secondary"  @click="filtrQtyPage(10)">10</button>
              </li>
              <li class="nav-item">
                <button type="button" name='page'  class="btn btn-outline-secondary"  @click="filtrQtyPage(20)">20</button>
              </li>
            </ul>
        </p>

        <!-- Scelta tecnologie utilizzate -->
        <!-- <p class="d-flex gap-3"><strong>Tecnologies:</strong>
          <form action="">
            <div class="form-check" v-for="tecnology in tecnologies">>
              <input class="form-check-input" type="checkbox" v-model="f" :value="tecnology.id" :id="tecnology.id" @change="show()">
              <label class="form-check-label">{{ tecnology.name }}</label>
            </div>
          </form>
        </p> -->

        <p class="d-flex gap-3"><strong>Types:</strong>
          <form action="">
            <div class="form-check" v-for="projectType in types">>
              <input class="form-check-input" type="checkbox" v-model="formRequest.typesSelected" :value="projectType.id" :id="projectType.id" @change="filtrPage()">
              <label class="form-check-label">{{ projectType.name }}</label>
            </div>
          </form>
        </p>
      </div>

      <!-- Navigazione tra le pagine -->
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" @click="goToFirstPage()">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="n in lastPage">
            <a class="page-link" href="#" @click="getProjectApiPage(n)">{{ n }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" @click="goToLastPage()">
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
