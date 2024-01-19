
<template>
    <div class="pagination-container">
        <button @click="previousPage" :disabled="offset === 0" class="pagination-button">Previous</button>
        <div>Page {{ currentPage }} of {{ totalPages }} ({{ this.total }} cards)</div>
        <button @click="nextPage" :disabled="isLastPage" class="pagination-button">Next</button>
    </div>
</template>

<script>
export default {
    props: {
        cards: Array, // Expect an array of card objects
        offset: Number,
        limit: Number,
        total: Number,
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

.pagination-button {
    padding: 10px 15px;
    margin: 0 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
    background-color: #0056b3;
}
</style>