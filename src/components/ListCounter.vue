<template>
    <span>{{ total }}</span>
</template>

<script>
import { getDeckList } from '../composables/list.js';
export default {
    setup() {
        const { decklist, addCard, removeCard } = getDeckList();
        return { decklist, addCard, removeCard };

    },
    computed: {
        total() {
            if (!this.decklist) {
                return 0;
            }
            return Object.values(this.decklist).reduce((total, value) => total + value, 0);
        }
    },
}
</script>