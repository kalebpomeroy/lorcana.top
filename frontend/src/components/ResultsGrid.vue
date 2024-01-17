<template>
    <div class="results-grid">
        <span v-for="card in cards" class="card" :key="card.id">
            <img loading="lazy" :src="`http://drrkqgqijb8dh.cloudfront.net/${card.id}.png`" />
            {{ card.name }}
        </span>
    </div>
</template>
  
<script>
export default {
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

/* Individual card styling */
.card {
    width: 200px;
}

.card img {
    width: 100%; /* Make image fill the card */
}

</style>