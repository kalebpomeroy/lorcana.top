<template>
    <div>
      <SearchBar @search="searchCards" />
      <ResultsGrid :cards="cards" />
    </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './SearchBar.vue';
import ResultsGrid from './ResultsGrid.vue';

export default {
    components: {
        SearchBar,
        ResultsGrid
    },
    data() {
        return {
            cards: []
        };
    },
    methods: {
        async searchCards(q) {
            q = q || "";
            try {
                const response = await axios.get(`/search`, { params: { q: q } });
                this.cards = response.data.cards;
                
                const url = new URL(window.location.href);
                url.searchParams.set('q', q);
                window.history.pushState({}, '', url);
            } catch (error) {
                console.error(error);
                // TODO: Handle API Errors
            }
        }
    }
};
</script>

