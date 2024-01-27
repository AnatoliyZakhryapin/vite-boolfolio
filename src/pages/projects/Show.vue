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
            }).catch((error) => {
                console.log('post not found',error.response)
                
                if(error.response.status === 404) {
                    this.$router.push({ name: 'not-found' })
                }
            })
        }
    },
    created() {
        this.fetchProject()
    }
}
</script>

<template>
    <div v-if="project">
        <div class="container">
            <div class="row row-gap-5 justify-content-center">
                <div class="col">
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="https://picsum.photos/300/200" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
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
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>