<template>
    <div class="decklist-item">
        {{ count }}x
        <div class="card-title">
            <img loading="lazy" :src="`http://drrkqgqijb8dh.cloudfront.net/${card.id}.png`"  />
            
        </div>
    </div>
    
</template>
           
<script>
import { getDeckList } from '../composables/list.js';
export default {
    setup() {
        const { decklist } = getDeckList();
        return { decklist };
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
    }
};
</script>

<style>
.decklist-item {
    display: flex;
    font-size: x-large;
}
.card-title {
    margin: 2px 5px;
    height: 39px;
    width: 250px;
    display: flex;
    overflow: hidden;
    position: relative; 
}
.card-title img {
    height: 450px;
    width: 300px;     
    position: absolute;
    top: -242px;
    left: -13px;
}
</style>