<script>
export default {
    data() {
        return {
            title: "Anatoliy Zakhryapin",
            jobtitle: 'Junior Full Stack Developer'
        }
    }
}
</script>

<template>
    <div class="home-page">
        <div class="container">
            <div class="row justify-content-center align-content-center ">
                <div class="col-auto">
                    <h1 class="fs-1">{{ title }}</h1>
                    <h2>{{ jobtitle }}</h2>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .home-page{
        padding-top: 15vh;
    }
</style>
