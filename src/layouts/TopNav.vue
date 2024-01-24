<template>
    <header class="header-bar">
        <div class="logo-container">
            <img src="@/assets/logo.png" alt="Logo" class="logo">
        </div>
        <div class="title-container">
            <h1>lorcana.top</h1>
        </div>
        <nav class="navigation">
            <ul>
                <li><a href="/">Card Search</a></li>
                <li @click="toggleDeckPreview">Current List (<ListCounter />)</li>
                <li>Login</li>
            </ul>
        </nav>
    </header>
    <DeckPreview v-if="showDeckPreview"/>
</template>
<script>
    import DeckPreview from '../components/DeckPreview.vue';
    import ListCounter from '../components/ListCounter.vue';

    export default {
        components: {
            DeckPreview,
            ListCounter
        },
        data: function(){
            return { showDeckPreview: false}
        }, methods: {
            toggleDeckPreview() {
                this.showDeckPreview = !this.showDeckPreview;
            }
        }
    }
</script>

<style scoped>
.header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #0d222f;
    color: white;
}

.logo-container .logo {
    height: 50px;
}

.title-container h1 {
    margin: 0;
    font-size: 1.5em;
}

.navigation ul {
    list-style: none;
    display: flex;
    gap: 20px;
}

.navigation ul li {
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
}
.navigation ul li a {
    color: white;
    text-decoration: none;
}

.navigation li:hover {
    color: #4CAF50;
}
</style>