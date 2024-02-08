
<template>
    <div v-if="loading || totalPages > 1" class="pagination-container">
        <button @click="previousPage" :disabled="offset === 0" class="btn">Previous</button>

        <div v-if="!loading" class="pagination-text">Page {{ currentPage }} of {{ totalPages }} ({{ this.total }} cards)</div>
        <div v-if="loading" class="pagination-text"> Loading...</div>
        <button @click="nextPage" :disabled="isLastPage" class="btn">Next</button>
    </div>
    <div v-if="!loading && totalPages === 1" class="pagination-container">
        {{ this.total }} cards
    </div>
</template>

<script>
export default {
    props: {
        cards: Array, // Expect an array of card objects
        offset: Number,
        limit: Number,
        total: Number,
        loading: Boolean,
    }, 

    computed: {
        currentPage() {
            return Math.floor(this.offset / this.limit) + 1;
        },
        totalPages() {
            return Math.ceil(this.total / this.limit);
        },
        isLastPage() {
            return this.offset + this.limit >= this.total;
        }
    },

    methods: {
        nextPage() {
            if (!this.isLastPage) {
                this.$emit('pageCards', this.offset + this.limit);
            }
        },
        previousPage() {
            if (this.offset > 0) {
                this.$emit('pageCards', Math.max(0, this.offset - this.limit));
            }
        },
    }
};
</script>
<style scoped>
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}
.pagination-text {
    margin: 0 20px;
}
</style>