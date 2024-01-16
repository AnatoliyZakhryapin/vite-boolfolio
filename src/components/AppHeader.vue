<script>
</script>

<template>
    <h1>Header</h1>
    <ul>
        <li>
            <router-link :to="{ name: 'home'}">Home</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'projects.index'}">Portfolio</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'contacts'}">Contatti</router-link>
        </li>
    </ul>
</template>

<style lang="scss">


</style>
