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
    <router-link class="text-decoration-none" :to="{ name: 'projects.show', params: { slug: project.slug }}" >
        <div class="card h-100">
            <img src="https://picsum.photos/300/200" class="card-img" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
    .card{
        position: relative;
        color: white;
        border: none;
        .card-title{
            opacity: 0;
        }
        .card-body{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            text-align: center;
        }
        &:hover{
            -webkit-box-shadow: inset -1px 3px 8px 5px rgba(0, 255, 0, 0.938), 4px 1px 26px 0px rgba(0, 255, 0, 0.938); 
            box-shadow: inset -1px 3px 8px 5px rgba(0, 255, 0, 0.938), 4px 1px 26px 0px rgba(0, 255, 0, 0.938);
            text-shadow: 0 0 15px rgba(255,255,255,.5), 0 0 10px rgba(255,255,255,.5), 0px 0px 20px rgba(206,0,0,0.62);
            .card-title{
                opacity: 100;
                transition: opacity 1s;
            }
        }
    }
</style>




