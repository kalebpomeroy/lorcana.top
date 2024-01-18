<template>
    <div class="results-grid">
        <CardPane v-for="card in cards" :key="card.id" :card="card" />
    </div>
</template>
  
<script>
import CardPane from './CardPane.vue';

export default {
    components: {
        CardPane
    },
    props: {
        cards: Array, // Expect an array of card objects
    },
};
</script>

<style>  
/* Search results grid */
.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Adapt number of columns to screen size */
    gap: 20px; /* Space between cards */
    padding: 20px;
}



</style>