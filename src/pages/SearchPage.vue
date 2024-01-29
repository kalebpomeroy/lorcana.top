<template>
    <div>
        <SearchBar @search="searchCards" v-model:q="q"/>
        <PaginatorRow @setPage="pageCards" :loading="loading" :total="total" :limit="limit" :offset="offset" @pageCards="pageCards" />
        <ResultsGrid :cards="cards" />
        <PaginatorRow @setPage="pageCards" :loading="loading" :total="total" :limit="limit" :offset="offset" @pageCards="pageCards" />
    </div>
</template>

<script>
import axios from 'axios';
import SearchBar from '../components/SearchBar.vue';
import PaginatorRow from '../components/PaginatorRow.vue';
import ResultsGrid from '../components/ResultsGrid.vue';

export default {
    components: {
        SearchBar,
        PaginatorRow,
        ResultsGrid,
    },
    data() {
        return {
            cards: [],
            limit: 10, 
            total: 0,
            offset: 0,
            loading: false,
        };
    },
    methods: {
        async pageCards(offset) {
            await this.fetchCards(this.q, offset, this.limit);         
        },

        async searchCards(q) {
            await this.fetchCards(q, 0, this.limit);
        },

        async fetchCards(q, offset, limit) {
            try {
                this.setQueryParams(q, offset, limit);
                this.q = q; 
                this.offset = offset;
                this.limit = limit;
                this.loading = true;

                const response = await axios.get('/cards.json', { 
                    params: { 
                        q: this.q.toLowerCase(),
                        offset: this.offset, 
                        limit: this.limit 
                    } 
                });
                this.cards = response.data.cards;
                this.total = response.data.total;
                this.loading = false;
            } catch (error) {
                console.error(error);
                this.loading = false;
                // TODO: Handle API Errors
            }
        },

        setQueryParams(q, offset, limit) {
            const url = new URL(window.location.href);
            const currentUrlParams = url.searchParams;

            let shouldPushState = false;

            if (q !== undefined && currentUrlParams.get('q') !== q && (this.q === undefined ? '' : this.q) !== q) {
                url.searchParams.set('q', q);
                shouldPushState = true;
            }

            if (limit !== undefined && currentUrlParams.get('limit') !== limit.toString() && this.limit !== limit) {
                url.searchParams.set('limit', limit);
                shouldPushState = true;
            }

            if (offset !== undefined && currentUrlParams.get('offset') !== offset.toString() && this.offset !== offset) {
                url.searchParams.set('offset', offset);
                shouldPushState = true;
            }

            if (shouldPushState) {
                window.history.pushState({}, '', url);
            }
        } 
    }
};
</script>

