<template>
    <div class="search-container">
        <div class="search-bar">
            <form @submit.prevent="searchCards">
                <input @input="handleInput" class="search-input" type="text" v-model="q" placeholder="Search for cards">
                <button class="search-button" type="submit">Search</button>
            </form>

            <button @click="toggleHelperText" class="search-button" >?</button>
        </div>
        
        <div v-if="showHelperText" class="helper-popover">
            <HelperWindow />
        </div>
    </div>
    
</template>
  
<script>
import HelperWindow from './HelperWindow.vue'
  
export default {
    data() {
        return {
            q: '',
            showHelperText: false,
        };
    },
    methods: {
        searchCards() {
            this.$emit('search', this.q);
        },
        handleInput() {
            if (this.q.endsWith(' ')) {
                this.searchCards();
            }
        },
        toggleHelperText() {
            this.showHelperText = !this.showHelperText;
        },
    },
    components: {
        HelperWindow, // Ensure HelperWindow component is imported
    },
};
</script>
<style>
/* Sticky search bar */
.search-container {
    position: sticky;
    top: 0; /* Stick to the top of the viewport */
    background-color: #f8f8f8; /* Light background for the search bar */
    padding: 10px 20px;
    z-index: 1000; /* Ensure it's above other content */
}

.search-bar {
    width: 100%;
    max-width: 600px; /* Maximum width of the search bar */
    margin: 0 auto; /* Centering the search bar */
    display: flex;
    gap: 10px;
}

.search-input {
    flex-grow: 1; /* Make input take up available space */
    padding: 10px;
    font-size: 16px; /* Larger font for easy reading */
    border: 1px solid #ddd; /* Light border for the input */
    border-radius: 5px; /* Rounded corners */
}

button {
    padding: 10px 20px;
    background-color: #007bff; /* Bootstrap primary color */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

</style>