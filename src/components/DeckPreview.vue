<template>
    <div class="deck-preview">

        
        <CardTitlePane v-for="card in cards" :key="card.id" :card="card" />
        
    </div>
</template>
<script>
import CardTitlePane from './CardTitlePane.vue';
import { getDeckList } from '../composables/list.js';
import axios from 'axios';
export default {
    setup() {
        const { decklist } = getDeckList();
        return { decklist };

    },
    components: {
        CardTitlePane
    },
    data() {
        return {
            cards: [],
            total: 0,
            q: undefined,
            limit: undefined,
            offset: undefined
        }
    },
    mounted() {
        console.log(this.decklist);
        this.fetchCards();
    },
    methods: {
        async fetchCards() {
            try {
                
                const response = await axios.get('/cards.json', { 
                    params: { 
                        q: `"${Object.keys(this.decklist).join(', ')}"`,
                        offset: 0,
                        limit: this.decklist.length || 10000
                    } 
                });
                this.cards = response.data.cards;
                this.total = response.data.total;
            } catch (error) {
                console.error(error);
                // TODO: Handle API Errors
            }
        },
    }
}
</script>
<style>
.deck-preview {
    position: absolute;
    top: 60px; /* Adjust this value based on the height of your header */
    right: 50px;
    z-index: 1500;
    background-color: white;
    padding: 10px 10px;
    border: 1px solid #0d222f;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

</style>