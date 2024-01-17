<script>
  import axios from 'axios';
  import ProjectCard from '../../components/ProjectCard.vue';

  export default {
    data() {
      return {
        BASE_URL: 'http://127.0.0.1:8000/api',
        projects: [],
        tecnologies: [],
        types: [],
        currentPage: 1,
        lastPage: 0,
        qtyProjectsForPage: 1,
        formRequest: {
          typesSelected: []
        },
      }
    },
    components: {
      ProjectCard,
    },
    methods: {
      fetchProjects() {
        axios.get(`${this.BASE_URL}/projects`, {
          params: {
            page: this.currentPage,
            qtyForPage: this.qtyProjectsForPage,
            formRequest: this.formRequest,
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
      setCurrentPage($page) {
        this.currentPage = $page;
        this.fetchProjects();
      },
      goToFirstPage() {
        this.currentPage = 1;
        this.fetchProjects();
      },
      goToLastPage() {
        this.currentPage = this.lastPage;
        this.fetchProjects();
      },
      goToNextPage(){
        if(this.currentPage < this.lastPage){
          this.currentPage += 1;
          this.fetchProjects();
        } 
      },
      goToPreviousPage(){
        if(this.currentPage > 1){
          this.currentPage -= 1;
          this.fetchProjects();
        } 
      },
      isShowPageBtn(n){
        let current = this.currentPage;
        let previuos = current - 1;
        let next = current + 1;

        if(this.lastPage < 7 || current < 7) {
          if(n < 7){
            return true
          }
        }

        if(this.lastPage > 7) {
          if(n === current || n === previuos || n === next) {
            return true
          }
        }
        
      },
      filtrQtyPage(newQtyForPage){
        this.qtyProjectsForPage = newQtyForPage;
        this.fetchProjects();
      },
      filtrPage(){
        console.log('checkbox', this.formRequest)
        this.fetchProjects();
      }
    },
    created() {
      this.fetchProjects();
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
          <!-- Button Previous Page -->
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" @click="goToPreviousPage()">
              <span aria-hidden="true">Prev</span>
            </a>
          </li>
          <!-- Prima pagina -->
          <li class="page-item" :class="{'active': n === currentPage}" v-if="currentPage > 6">
            <a class="page-link" href="#" @click="goToFirstPage()"> 1 </a>
          </li>
           <!-- Vuota -->
          <li class="page-item" v-if="currentPage > 6">
            <span class="page-link">...</span> 
          </li>
          <div class="page-item" v-for="n in lastPage">
            <li v-if="isShowPageBtn(n)"  :class="{'active': n === currentPage}">
              <a class="page-link" href="#" @click="setCurrentPage(n)">{{ n }}</a>
            </li>
          </div>
          <!-- Vuota -->
          <li class="page-item" v-if="lastPage > 6">
            <span class="page-link">...</span> 
          </li>
          <!-- Ultima pagina -->
          <li class="page-item" :class="{'active': n === currentPage}" v-if="lastPage > 6">
            <a class="page-link" href="#" @click="goToLastPage()"> {{ lastPage }} </a>
          </li>
          <!-- Button Next Page -->
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" @click="goToNextPage()">
              <span aria-hidden="true">Next</span>
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
