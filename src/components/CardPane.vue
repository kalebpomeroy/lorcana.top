<template>
    <div class="image-container card">
        <CardImage :src="`http://drrkqgqijb8dh.cloudfront.net/${card.id}.png`" />
        <div v-if="count > 0" class="total-count">{{ count}}</div>
        <div class="pricer">
            <button class="btn" @click="decreaseCount">-</button>
            <div class="price"> $--.-- </div>
            <button class="btn" @click="increaseCount">+</button>
        </div>
        <div class="name">{{ card.name }}</div>
    </div>
</template>
           
<script>
import CardImage from './CardImage.vue';
import { getDeckList } from '../composables/list.js';
export default {
    setup() {
        const { decklist, addCard, removeCard } = getDeckList();
        return { decklist, addCard, removeCard };
    },
    components: {
        CardImage
    },
    computed: {
        count() {
            if (!this.decklist) {
                return 0;
            }
            return this.decklist[this.card.name] ?? 0;
        }
    },
    props: {
        card: Object
    },
    methods: {
        increaseCount() {
            this.addCard(this.card.name);
        },
        decreaseCount() {
            this.removeCard(this.card.name);
        }
    }
};
</script>

<style>
.image-container {
    position: relative;
    display: inline-block;
}

.pricer {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}

.price {
    padding: 10px 15px;
}

.name {
    text-align: center;
    font-weight: bold;
    font-size: small;
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

</style>