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
        qtyProjectsForPage: 9,
        formRequest: {
          typesSelected: [],
          typesSelectedNull: [],
          tecnologiesSelected: []
        },
        typeShowGrid: 'col-4',
        isActiveFiltr: false,
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
      // Sostituisce il valore 'page' con il valore della pagina cliccata e fa il fetch per restituire nuova pagina
      setCurrentPage($page) {
        this.currentPage = $page;
        this.fetchProjects();
      },
      // Sposta nella prima pagina
      goToFirstPage() {
        this.currentPage = 1;
        this.fetchProjects();
      },
      // Sposta nell'ultima pagina
      goToLastPage() {
        this.currentPage = this.lastPage;
        this.fetchProjects();
      },
      // Sposta nella pagina sucessiva
      goToNextPage(){
        if(this.currentPage < this.lastPage){
          this.currentPage += 1;
          this.fetchProjects();
        } 
      },
      // Sposta nella pagina precedente 
      goToPreviousPage(){
        if(this.currentPage > 1){
          this.currentPage -= 1;
          this.fetchProjects();
        } 
      },
      // In base alle condizioni restituisce il numero delle elementi da visualizzare nel menu navigazione delle pagine 
      getPageNavElement(){
        let currentPage = this.currentPage; // prima pagina
        let lastPage = this.lastPage; // ultima pagina
        let numberOfPage; // numero da restituire

        // Se numere delle pagine inferiore 3
        // prev 123 next
        if( lastPage <= 3) {
          numberOfPage = lastPage;
        }

        // Se numero delle pagine superiore 3 e siamo sulla prima pagina 
        // prev 123...lastPage next
        if(lastPage > 3 && currentPage ==1){
          numberOfPage = 3;
        } // Partendo con la base 1 2 3 cliccando sulla page 3 verra visualizzata anche 4, e lo stesso se clicchi page [4] verra mostrata 5 
          // prev 123[4]5...lastPage  next
          else if ( lastPage > 3 && currentPage < 5) {
          numberOfPage = currentPage + 1;
        } // Quando currentePage diventa 5 verrano mostrati 3 elementi centrali finche non arrivi alla fine dove la diff (lastPage - currentPage) >= 4
          // prev 1...A B C...lastPage  next
          else if (lastPage > 3 && currentPage >= 5 && (lastPage - currentPage) >= 4) {
          numberOfPage = 3;
        } // Replica stesso comportamento del menu come all'inizio 
          // prev 1...A [B] C D lastPage  next
          else if (currentPage >= 5 && (lastPage - currentPage) < 4) {
          numberOfPage = 5;
        }
   
        return numberOfPage;
      },
      // Restituisce il numero della pagina nel menu in base alle condizioni e posizionamento nel menu 
      getNumberOfPagination(n){
        let currentPage = this.currentPage;
        let lastPage = this.lastPage;
        let previuosPage = currentPage - 1;
        let nextPage = currentPage + 1;
        let numberOfPage;

        // Il numero da mostrare sara quello uguale del ciclo
        if(currentPage < 5) {
          numberOfPage = n;
        } 

        // Qua i numeri vanno modificati perche il ciclo avra solo 3 elementi(quelli che vanno visualizzati in mezzo) 
        // prev 1...A B C...100  next
        // Condizione per elemento A
        if(currentPage >= 5 && (lastPage - currentPage) >= 4 && n == 1){
          numberOfPage = previuosPage;
        } // Condizione per elemento B
          else if (currentPage >= 5 && (lastPage - currentPage) >= 4 && n == 2) {
          numberOfPage = currentPage;
        } // Condizione per elemento C
          else if (currentPage >= 5 && (lastPage - currentPage) >= 4 && n == 3) {
          numberOfPage = nextPage;
        }

        // Condizioni per mostrare i numeri delle pagine quando siamo alle fine del menu e vengono mostrati 5 elementi
        // prev 1...A B C D E next
        // Condizione per elemento A
        if(currentPage >= 5 && (lastPage - currentPage) < 4 && n == 1){
          numberOfPage = lastPage - 4;
        } // Condizione per elemento B
          else if (currentPage >= 5 && (lastPage - currentPage) < 4 && n == 2) {
          numberOfPage = lastPage - 3;
        } // Condizione per elemento C
          else if (currentPage >= 5 && (lastPage - currentPage) < 4 && n == 3) {
          numberOfPage = lastPage - 2;
        } // Condizione per elemento D
          else if (currentPage >= 5 && (lastPage - currentPage) < 4 && n == 4) {
          numberOfPage = lastPage - 1;
        } // Condizione per elemento E
          else if (currentPage >= 5 && (lastPage - currentPage) < 4 && n == 5) {
          numberOfPage = lastPage;
        }

        return numberOfPage;
      },
      // Condizione per assegnare classe active alla pagina selezionata
      getActiveToPagination(n) {
        let currentPage = this.currentPage;
        let lastPage = this.lastPage;

        // In questo momento il numero n preso dal ciclo corisponde al numero della pagina effetiva per cui si puo uttilizzarlo come riferimento
        if(currentPage < 5 && n === currentPage) {
          return true;
        }
        // In questa fase il menu ci mostra tre elementi con il ciclo da 3, quindi verra assegnato active sempre all'elemento centrale con n = 2
        if(currentPage >= 5 && n === 2 && (lastPage - currentPage) >= 4) {
          return true;
        } // Qua siamo arrivati alla fine del menu dove viene mostrati ultimi 5 elementi 
          // ESEMPIO prev 1...50 [51] 52 53 54 next 
          // condizione : ([51] >= 5 && 5 - 2 == (54 - 51) && (54 - 51) < 4)
          // n - il numero di elemento del ciclo nel esempio n = 2 perche 51 e al secondo posto
          else if (currentPage >= 5 && 5 - n == (lastPage - currentPage) && (lastPage - currentPage) < 4) {
          return true;
        } 
      },
      // Condizione per visualizzare i 3 puntini al fondo del menu navigazione delle pagine
      isVisibleDotFine(){
        let currentPage = this.currentPage;
        let lastPage = this.lastPage;

        if( lastPage > 3 && currentPage < 4) {
          return true;
        }

        if(lastPage - currentPage >= 4 && lastPage > 6) {
          return true;
        }
      },
      // Condizione per visualizzare btn della last page al fondo del menu navigazione delle pagine
      isVisibleBtnLastPage(){
        let currentPage = this.currentPage;
        let lastPage = this.lastPage;

        if( lastPage > 3 && currentPage < 5) {
          return true;
        }

        if(currentPage + 1 < lastPage && (lastPage - currentPage) >= 4 ) {
          return true;
        }
      },
      // Cambia la quantita dei progetti da visualizzare
      filtrQtyPage(newQtyForPage){
        this.qtyProjectsForPage = newQtyForPage;
        this.currentPage = 1;

        if( this.qtyProjectsForPage == 4) {
          this.typeShowGrid = 'col-6';
        } else if ( this.qtyProjectsForPage == 9) {
          this.typeShowGrid = 'col-4';
        } else if ( this.qtyProjectsForPage == 1) {
          this.typeShowGrid = 'col-12';
        }
         
        this.fetchProjects();
      },
      // Esegue chiamata fetch nel momento in qui viene selezionato un filtro
      filtrPage(){
        console.log('checkbox', this.formRequest);
        this.currentPage = 1;
        this.fetchProjects();
      },
      // Restituisce true o false sul click del checkbox 
      isChecked(id, form){
        return form.includes(id);
      },
      // Apre menu filtri per tecnologies e types
      openFiltrMenu(){
        this.isActiveFiltr = !this.isActiveFiltr
      },
    },
    created() {
      this.fetchProjects();
    }
  }
</script>

<template>
  <div class="projects">
    <!--Start Title -->
    <div class="projects__title">
      <div class="container">
        <div class="row mb-5">
          <div class="col text-center">
            <h1>Progetti</h1>
            <!-- <p><strong>CurrentPage:</strong> {{ currentPage }}</p>
            <p><strong>LastPage:</strong> {{ lastPage }}</p> -->
          </div>
        </div>
      </div>
    </div>
    <!--End Title -->

    <!--Start Menu filtri -->
    <div class="projects__menu-filtr">
      <div class="container">
        <div class="row mb-5 row-gap-4">

          <div class="col-12 overflow-hidden">
            <div class="input-filtr" :class="{'active' : isActiveFiltr}">
              <div class="row row-gap-5 py-4">
                <!--Start Scelta tipologia dei progetti -->
                <div class="col-12">
                  <div class="menu-filtr__types d-flex gap-5 justify-content-center" >
                    <div class="check-button" :class="{ 'checked': isChecked(projectType.id, formRequest.typesSelected) }" v-for="projectType in types">
                      <label class="check-button__label">
                        <input class="check-button__input" type="checkbox" v-model="formRequest.typesSelected" :value="projectType.id" :id="projectType.id" @change="filtrPage()">
                        <span>{{ projectType.name }}</span>
                      </label>
                    </div>
                    <div class="check-button" :class="{ 'checked': isChecked(1, formRequest.typesSelectedNull) }">
                      <label class="check-button__label">
                        <input class="check-button__input" type="checkbox" v-model="formRequest.typesSelectedNull" :value="1" @change="filtrPage()">
                        <span>Senza</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!--End Scelta tipologia dei progetti -->

                <!--Start Scelta tecnologie dei progetti -->
                <div class="col-12">
                  <div class="menu-filtr__tecnologies d-flex justify-content-around" >
                    <div class="check-button" :class="{ 'checked': isChecked(tecnology.id, formRequest.tecnologiesSelected) }"  v-for="tecnology in tecnologies">
                      <label class="check-button__label">
                        <input class="check-button__input" type="checkbox" v-model="formRequest.tecnologiesSelected" :value="tecnology.id" :id="tecnology.id" @change="filtrPage()">
                        <span>{{ tecnology.name }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!--End Scelta tecnologie dei progetti -->
              </div>
            </div>
          </div>
          <!-- Start nav filtr -->
          <div class="col d-flex">
            <ul class="nav w-100">
              <li class="nav-item flex-grow-1" :class="{ 'active' : isActiveFiltr }">
                <a href="#" @click="openFiltrMenu()">
                  <font-awesome-icon :icon="['fas', 'filter']" />
                </a>
              </li>
              <li class="nav-item" :class="{ 'active' : qtyProjectsForPage === 1}">
                <a href="#" @click="filtrQtyPage(1)">
                  <font-awesome-icon :icon="['far', 'square']" />
                </a>
              </li>
              <li class="nav-item" :class="{ 'active' : qtyProjectsForPage === 4}">
                <a href="#" @click="filtrQtyPage(4)">
                  <font-awesome-icon :icon="['fas', 'table-cells-large']" />
                </a>
              </li>
              <li class="nav-item" :class="{ 'active' : qtyProjectsForPage === 9}">
                <a href="#" @click="filtrQtyPage(9)">
                  <font-awesome-icon :icon="['fas', 'table-cells']" />
                </a>
              </li>
            </ul>
          </div>
          <!-- End nav filtr -->
        </div>
      </div>
    </div>
    <!--End Menu filtri -->

    <!--Start Show projects -->
    <div class="projects__show-projects mb-5">
      <div class="container">
        <div class="row row-gap-5">
          <div :class="typeShowGrid" v-for="project in projects">
            <ProjectCard :project="project"/>
          </div>
        </div>
      </div>
    </div>
    <!-- End Show projects -->

    <!-- Start Navigazione tra le pagine -->
    <div class="projects__nav-pagination">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-auto">
            <nav aria-label="Page navigation example">
              <ul class="pagination-custom">
                <!-- Button Previous Page -->
                <li class="page-item previous-btn">
                  <a class="page-link" href="#/" aria-label="Previous" @click="goToPreviousPage()">
                    <span aria-hidden="true">Prev</span>
                  </a>
                </li>
                <!-- Prima pagina -->
                <li class="page-item number-page" v-if="currentPage > 4">
                  <a class="page-link" href="#/" @click="goToFirstPage()"> 1 </a>
                </li>
                <!-- Puntini inizio -->
                <li class="page-item" v-if="currentPage > 4">
                  <span class="page-link">...</span> 
                </li>

                <!-- CICLO -->
                <div class="page-item" v-for="n in getPageNavElement() ">
                  <li class="number-page" :class="{'active': getActiveToPagination(n)}">
                    <a class="page-link" href="#/" @click="setCurrentPage(getNumberOfPagination(n))">{{ getNumberOfPagination(n) }}</a>
                  </li>
                </div>

                <!-- Puntini alla fine -->
                <li class="page-item" v-if="isVisibleDotFine()">
                  <span class="page-link">...</span> 
                </li>
                <!-- Ultima pagina -->
                <li class="page-item number-page" v-if="isVisibleBtnLastPage()">
                  <a class="page-link" href="#/" @click="goToLastPage()"> {{ lastPage }} </a>
                </li>
                <!-- Button Next Page -->
                <li class="page-item next-btn">
                  <a class="page-link" href="#/" aria-label="Next" @click="goToNextPage()">
                    <span aria-hidden="true">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- End Navigazione tra le pagine -->  
  </div>
</template>

<style lang="scss" scoped>

  .projects{
    .input-filtr{
      height: 0px;
      transition: height 1s;
      &.active{
        height: 210px;
        transition: height 1s;
      }
    }
    .check-button{
      border-radius: 16px;
      // border: 3px solid #a5a5a5;
      color: #a5a5a5;
      -webkit-box-shadow: inset -1px 3px 8px 5px rgba(255,0,0,0.82), 4px 1px 26px 0px rgba(255,0,0,0.82); 
      box-shadow: inset -1px 3px 8px 5px rgba(255,0,0,0.82), 4px 1px 26px 0px rgba(255,0,0,0.82);
      text-shadow: 0 0 15px rgba(255,255,255,.5), 0 0 10px rgba(255,255,255,.5), 0px 0px 20px rgba(206,0,0,0.62);
      &.checked{
        -webkit-box-shadow: inset -1px 3px 8px 5px rgba(0, 255, 0, 0.938), 4px 1px 26px 0px rgba(0, 255, 0, 0.938); 
        box-shadow: inset -1px 3px 8px 5px rgba(0, 255, 0, 0.938), 4px 1px 26px 0px rgba(0, 255, 0, 0.938);
        text-shadow: 0 0 15px rgba(255,255,255,.5), 0 0 10px rgba(255,255,255,.5), 0px 0px 20px rgba(206,0,0,0.62);
        color: rgba(255, 255, 255, 0.767);
      }
      label {
        padding: 15px 30px;
        min-width: 80px;
        text-align: center;
      }
      label input {
        display: none;
      }
    }
    ul {
      display: flex;
      gap: 15px;
      & a {
        // color: #f1f0f0;
        color: #a5a5a5;
        svg {
          width: 30px;
          height: 100%;
        }
      }
      & .nav-item.active a {
          color: white;
        }
    }
    .pagination-custom {
      padding: 0;
      margin-bottom: 50px;
      list-style: none;
      display: flex;
      gap: 40px;
      font-size: 50px;
      color: #a5a5a5;
      & li.number-page:hover,
      & li.next-btn:hover,
      & li.previous-btn:hover
      {
        color: #f1f0f0;
        scale: 1.2;
      }
      & li.active {
        text-shadow: 0px 0px 26px  rgba(0, 255, 0, 0.938);
        color:  rgba(0, 255, 0, 0.938);
      }
      & li.active::after{
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        background-color:  rgba(0, 255, 0, 0.938);
        box-shadow: 0px 0px 26px  rgba(0, 255, 0, 0.938);
        margin: 0 auto;
      }
    }
  }
</style>
