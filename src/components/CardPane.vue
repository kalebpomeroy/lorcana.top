<template>
    <div class="image-container card" @mouseover="showButtons = true" @mouseleave="showButtons = false">
        <img loading="lazy" :src="`http://drrkqgqijb8dh.cloudfront.net/${card.id}.png`" />
        <button v-if="showButtons" class="minus-button" @click="decreaseCount">-</button>
        
        <div v-if="count > 0" class="total-count">{{ count }}</div>
        <button v-if="showButtons" class="plus-button" @click="increaseCount">+</button>
        
        {{ card.name }}
    </div>
</template>
           
<script>
import { getDeckList } from '../composables/list.js';
export default {
    setup() {
        const { deckList, addCard, removeCard } = getDeckList();
        return { deckList, addCard, removeCard };
    },
    data() {
        return {
            showButtons: false,
            count: 0
        };
    },
    props: {
        card: Object
    },
    methods: {
        increaseCount() {
            this.count++;
            this.addCard(this.card.name);
        },
        decreaseCount() {
            if (this.count > 0) {
                this.count--;
                this.removeCard(this.card.name);
            }
        }
    }
};
</script>

<style>
.image-container {
    position: relative;
    display: inline-block;
}

/* Style for the + button */
.minus-button {
    position: absolute;
    top: 30%; 
    left: 10px; 
    transform: translateY(-50%); 
}

/* Style for the - button */
.plus-button {
    position: absolute;
    top: 30%; 
    right: 10px; 
    transform: translateY(-50%); 
}

/* Style for the - button */
.total-count {
    position: absolute;
    top: 30%; 
    left: 50%;
    transform: translate(-50%, -50%); 
    padding: 10px 20px;
    background-color: rgba(194, 194, 194, 0.7);
    font-size: 32px;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 5px;
}

.card {
    width: 200px;
}

.card img {
    width: 100%; /* Make image fill the card */
}
</style>