<script>
import axios from 'axios';

export default {
    data() {
        return {
            BASE_URL: 'http://127.0.0.1:8000/api',
            types: null,
            projects: [],
        }
    },
    props: {
        slug: String,
    },
    methods: {
        fetchTypesProjects() {
            axios.get(`${this.BASE_URL}/types/${this.$route.params.slug}`)
            .then(res => {
                console.log('questo risposta', res)
                
            })
        }
    },
    created() {
        this.fetchTypesProjects()
    }
}
</script>

<template>
    <h1>{{ slug }}</h1>
</template>

<style lang="scss">
</style>
