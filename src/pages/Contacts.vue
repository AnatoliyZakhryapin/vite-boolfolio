<script>
export default {
    data() {
        return {
            title: "Contatti",
        }
    }
}
</script>

<template>
    <div class="contacts-page">
        <div class="container">
            <div class="row justify-content-center align-content-center">
                <div class="col-auto">
                    <h1>{{ title }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .contacts-page{
        padding-top: 15vh;
    }
</style>
