<template>
  <div>
  <div class="navbar">
    Lorcana Card search
  </div>
  <SearchBox />  
</div>
  
</template>

<script>
import SearchBox from './components/SearchBox.vue';

export default {
  name: 'App', 
  mounted() {
    document.title = 'Lorcana Search';
  },
  components: {
    SearchBox
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* Top navigation bar */
.navbar {
  position: sticky;
  top: 0; /* Stick to the top of the viewport */
  width: 100%;
  background-color: #333; /* Dark background for the navbar */
  color: white;
  padding: 10px 20px;
  text-align: center;
}

</style>
