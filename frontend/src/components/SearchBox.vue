<template>
    <div>
      <SearchBar @search="searchCards" />
      <PaginatorRow @setPage="pageCards" :total="total" :limit="limit" :offset="offset" @pageCards="pageCards" />
      <ResultsGrid :cards="cards"/>
      <PaginatorRow @setPage="pageCards" :total="total" :limit="limit" :offset="offset" @pageCards="pageCards" />
    </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './SearchBar.vue';
import PaginatorRow from './PaginatorRow.vue';
import ResultsGrid from './ResultsGrid.vue';

export default {
    components: {
        SearchBar,
        PaginatorRow,
        ResultsGrid
    },
    data() {
        return {
            cards: [],
            limit: 10, 
            total: 0,
            offset: 0
        };
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.offset = urlParams.get('offset') || 0;
        // this.limit = urlParams.get('limit') || 20;
        this.q = urlParams.get('q') || "";
        this.searchCards();
    },
    methods: {
        async pageCards(offset) {
            this.offset = offset ?? this.offset;
            await this.fetchCards();         
        },

        async searchCards(q) {           
            this.q = q ?? this.q; 
            await this.fetchCards();
        },

        async fetchCards() {
            try {
                const response = await axios.get('/search', { 
                    params: { 
                        q: this.q, 
                        offset: this.offset, 
                        limit: this.limit 
                    } 
                });
                this.cards = response.data.cards;
                this.total = response.data.total;

                const url = new URL(window.location.href);
                this.q !== undefined && url.searchParams.set('q', this.q);
                this.limit !== undefined && url.searchParams.set('limit', this.limit);
                this.limit !== undefined && url.searchParams.set('offset', this.offset);
                window.history.pushState({}, '', url);
            } catch (error) {
                console.error(error);
                // TODO: Handle API Errors
            }
        },
    }
};
</script>

