<script>

export default {
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div class="card h-100">
        <img src="https://picsum.photos/300/200" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <p class="card-text">{{ project.slug }}</p>
            <p v-if="project.type">{{  project.type.name }}</p>
            <p class="d-flex gap-1 flex-wrap">
                <span  v-for="tecnology in project.tecnologies">{{ tecnology.name }}</span>
            </p>
            <p class="card-text">{{ project.description }}</p>
            <p class="card-text">{{ project.user.name }}</p>
            <p class="card-text"><a href="#">{{ project.url }}</a></p>
            <router-link :to="{ name: 'projects.show', params: { slug: project.slug }}" >
                <a href="#" class="btn btn-primary">Apri progetto</a>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">


</style>




