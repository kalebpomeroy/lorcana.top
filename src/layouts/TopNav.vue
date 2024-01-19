<template>
    <header class="header-bar">
        <div class="logo-container">
            <img src="@/assets/logo.png" alt="Logo" class="logo"> <!-- Replace with your logo path -->
        </div>
        <div class="title-container">
            <h1>lorcana.top</h1> <!-- Replace with your name -->
        </div>
        <nav class="navigation">
            <ul>
                <li><a href="/">Card Search</a></li>
                <li><a href="">Current List (<ListCounter />)</a></li>
                <li><a href="">Login</a></li>
            </ul>
        </nav>
    </header>
</template>
<script>
    import ListCounter from '../components/ListCounter.vue';

    export default {
        components: {
            ListCounter
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
    height: 50px; /* Adjust as needed */
}

.title-container h1 {
    margin: 0;
    font-size: 1.5em; /* Adjust as needed */
}

.navigation ul {
    list-style: none;
    display: flex;
    gap: 20px;
}

.navigation ul li {
    padding: 5px 10px;
}

.navigation a {
    text-decoration: none;
    color: white;
    transition: color 0.3s ease;
}

.navigation a:hover {
    color: #4CAF50;
}
</style>