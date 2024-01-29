<template>
    <div class="deck-preview">

        <div v-if="totalUniqueCards">
            <div v-if="loading">
                Loading...
            </div>
            <CardTitlePane v-for="card in cards" :key="card.id" :card="card" />

            <button class="btn "  @click="copyAsText"><img src="/icons/copy.png" /></button>
            <button class="btn" @click="copyAsPixelborn"><img src="/icons/pixelborn.png" /></button>

            <button class='btn' @click="clearDeck"><img src="/icons/trash.png" /></button>
        </div>
        <div v-else>
            
            No cards in deck
        </div>
    </div>
</template>
<script>
import CardTitlePane from './CardTitlePane.vue';
import { getDeckList } from '../composables/list.js';
import axios from 'axios';
export default {
    setup() {
        const { decklist, clearDeck } = getDeckList();
        return { decklist, clearDeck };

    },
    components: {
        CardTitlePane
    },
    computed: {
        totalCards() {
            return Object.values(this.decklist).reduce((a, b) => a + b, 0);
        },
        
        totalUniqueCards() {
            return Object.values(this.decklist).length;
        }
    },
    data() {
        return {
            loading: false,
            cards: [],
            total: 0,
            q: undefined,
            limit: undefined,
            offset: undefined
        }
    },
    mounted() {
        this.fetchCards();
    },
    watch: {
        decklist: {
            deep: true,
            handler() {
                if(this.totalUniqueCards > this.cards.length) {
                    this.fetchCards();
                }
            }
        }
    },
    methods: {
        copyAsText() {
            const text = Object.entries(this.decklist).map(([name, quantity]) => `${quantity} ${name}`).join('\n');
            console.log(text);
            this.copyTextToClipboard(text);
        },
        copyAsPixelborn() {
            const text = Object.entries(this.decklist).map(([name, quantity]) => `${name.replace(' - ', '_')}$${quantity}`).join('|');
            console.log(btoa(text));
            this.copyTextToClipboard(btoa(text));
        },
        copyTextToClipboard(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        },
        async fetchCards() {
            if (this.totalUniqueCards == 0) {
                return;
            }
            this.loading = true;
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
            } finally {
                this.loading = false;
            }
        },
    }
}
</script>
<style>
.deck-preview {
    position: absolute;
    top: 60px;
    right: 50px;
    z-index: 1500;
    background-color: white;
    padding: 10px 10px;
    border: 1px solid #0d222f;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.deck-preview .btn {
    border: 1px solid #0d222f;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    background-color: #F5F5F5;
    color: #0d222f;
    height: 40px;
}

.deck-preview  .btn:hover {
    background-color: #dddddd; /* Lighten the button on hover */
}
.deck-preview .btn img {
    height: 20px;
}
</style>