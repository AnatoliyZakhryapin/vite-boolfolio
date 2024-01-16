<script>
import axios from 'axios';

export default {
    data() {
        return {
            project: null,
            BASE_URL: 'http://127.0.0.1:8000/api'
        }
    },
    methods: {
        fetchProject() {
            axios.get(`${this.BASE_URL}/projects/${this.$route.params.slug}`)
            .then(res => {
                console.log('questo project', res.data.results)
                this.project = res.data.results
            })
        }
    },
    created() {
        this.fetchProject()
    }
}
</script>

<template>
    <h5 class="card-title">Titolo: </h5>
    <div class="container">
        <div class="row row-gap-5 justify-content-center">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Titolo: {{ project.title }}</h5>
                        <p class="card-text">Slug:{{ project.slug}}</p>
                        <p v-if="project.type">
                            <strong>
                            {{ project.type.name }}
                            </strong>
                        </p>

                        <ul class="d-flex gap-2">
                            <li class="badge rounded-pill text-bg-primary" v-for="tecnology in project.tecnologies">
                                {{ tecnology.name }}
                            </li>
                        </ul>

                        <p class="card-text">Descrizione: {{ project.description}}</p>
                        <p class="card-text">Creato da: {{ project.user.name}}</p>
                        <p class="card-text">Link: {{ project.url}}</p>
                        <p class="card-text">Data: {{ project.created_at}}</p>
                        <p class="card-text">Aggiornato: {{ project.updated_at}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>