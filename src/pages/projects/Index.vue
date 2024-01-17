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
          typesSelected: [],
          typesSelectedNull: [],
          tecnologiesSelected: []
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
        this.fetchProjects();
      },
      // Esegue chiamata fetch nel momento in qui viene selezionato un filtro
      filtrPage(){
        console.log('checkbox', this.formRequest);
        this.currentPage = 1;
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
        <p class="d-flex gap-3"><strong>Tecnologies:</strong>        
          <div class="form-check" v-for="tecnology in tecnologies">>
            <input class="form-check-input" type="checkbox" v-model="formRequest.tecnologiesSelected" :value="tecnology.id" :id="tecnology.id" @change="filtrPage()">
            <label class="form-check-label">{{ tecnology.name }}</label>
          </div>
        </p>

        <!-- Scelta tipologia dei progetti -->
        <p class="d-flex gap-3"><strong>Types:</strong>
          <div class="form-check" v-for="projectType in types">>
            <input class="form-check-input" type="checkbox" v-model="formRequest.typesSelected" :value="projectType.id" :id="projectType.id" @change="filtrPage()">
            <label class="form-check-label">{{ projectType.name }}</label>
          </div>
          <div class="form-check">>
            <input class="form-check-input" type="checkbox" v-model="formRequest.typesSelectedNull" :value="1" @change="filtrPage()">
            <label class="form-check-label">Senza</label>
          </div>
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
          <li class="page-item" v-if="currentPage > 4">
            <a class="page-link" href="#" @click="goToFirstPage()"> 1 </a>
          </li>
           <!-- Puntini inizio -->
          <li class="page-item" v-if="currentPage > 4">
            <span class="page-link">...</span> 
          </li>

          <!-- CICLO -->
          <div class="page-item" v-for="n in getPageNavElement() ">
            <li :class="{'active': getActiveToPagination(n)}">
              <a class="page-link" href="#" @click="setCurrentPage(getNumberOfPagination(n))">{{ getNumberOfPagination(n) }}</a>
            </li>
          </div>

          <!-- Puntini alla fine -->
          <li class="page-item" v-if="isVisibleDotFine()">
            <span class="page-link">...</span> 
          </li>
          <!-- Ultima pagina -->
          <li class="page-item" v-if="isVisibleBtnLastPage()">
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
