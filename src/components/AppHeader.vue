<script>
</script>

<template>
    <header class="page-header py-3">
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav>
                        <ul class="nav-menu">
                            <li class="menu-item">
                                <router-link :to="{ name: 'home'}">Home</router-link>
                            </li>
                            <li class="menu-item">
                                <router-link :to="{ name: 'projects.index'}">Progetti</router-link>
                            </li>
                            <li class="menu-item">
                                <router-link :to="{ name: 'contacts'}">Contatti</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .page-header{
        position: fixed;
        width: 100%;
        z-index: 1;
        height: 100px;
    }
    .nav-menu {
        display: flex;
        gap: 30px;
        list-style: none;
        font-size: 30px;
        & .menu-item{
            a {
                text-decoration: none;
                color: currentColor;
            };
        };
        li:hover{
            color: #f1f0f0;
            scale: 1.2;
        }
        li a.router-link-active{
            text-shadow: 0px 0px 26px  rgba(0, 255, 0, 0.938);
            color:  rgba(0, 255, 0, 0.938);
            &::after{
                content: "";
                display: block;
                width: 100%;
                height: 2px;
                background-color:  rgba(0, 255, 0, 0.938);
                box-shadow: 0px 0px 26px  rgba(0, 255, 0, 0.938);
                margin: 0 auto;
            }
        }
    }
</style>
