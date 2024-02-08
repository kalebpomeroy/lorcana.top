<template>
    <div>
        <SearchBar @search="searchCards" v-model:q="q"/>
        <PaginatorRow @setPage="pageCards" :loading="loading" :total="total" :limit="limit" :offset="offset" @pageCards="pageCards" />
        <ResultsGrid :cards="cards" />
        <PaginatorRow @setPage="pageCards" :loading="loading" :total="total" :limit="limit" :offset="offset" @pageCards="pageCards" />
    </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import PaginatorRow from '../components/PaginatorRow.vue';
import ResultsGrid from '../components/ResultsGrid.vue';
import { filter } from '../composables/cards.js';

export default {
    components: {
        SearchBar,
        PaginatorRow,
        ResultsGrid,
    },
    data() {
        return {
            cards: [],
            total: 0,
            loading: false,
            q: '',
            offset: 0,
            limit: 10,
        };
    },

    methods: {
        async pageCards(offset) {
            this.offset = offset;
            this.setQueryParams()
        },

        async searchCards(q) {
            this.q = q;
            this.offset = 0;
            this.setQueryParams()
        },

        async fetchCards() {
            this.loading = true;
            const filtered = await filter(this.q);
            this.cards = filtered.slice(this.offset, this.offset + this.limit || 10);
            this.total = filtered.length;
            this.loading = false;
        },

        async setQueryParams() {
            const queryParams = {
                q: this.q,
                offset: this.offset,
                limit: this.limit,
            };
            const url = new URL(window.location.href);
            const currentUrlParams = url.searchParams;

            let shouldPushState = false;

            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && currentUrlParams.get(key) !== value) {
                    url.searchParams.set(key, value);
                    shouldPushState = true;
                }
            });
            
            if (shouldPushState) { 
                await window.history.pushState({}, '', url); 
                this.fetchCards();

            }
        } 
    }
};
</script>

