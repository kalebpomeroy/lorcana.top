<template>
    <div class="search-container">
        <div class="search-bar">
            <form @submit.prevent="searchCards">
                <input 
                    v-model="q" 
                    @input="handleInput" 
                    type="text" 
                    class="search-input"
                    placeholder="Search for cards">
                <button class="btn" type="submit">Search</button>
            </form>
            &nbsp;
            <button @click="toggleHelperText" class="btn" >?</button>
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
            showingDeck: false,
        };
    },
    methods: {
        searchCards() {
            this.$emit('search', this.q);
        },
        toggleDecklist() {
            if (this.showingDeck) {
                this.$emit('search', this.q);
                this.showingDeck = false;
            } else {
                this.$emit('showDecklist');
                this.showingDeck = true;
            }
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
    mounted() {        
        const urlParams = new URLSearchParams(window.location.search);
        this.q = urlParams.get('q') || "";
        this.searchCards();
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
    display: flex;
    justify-content: space-between;
    padding: 10px 20px; /* Adjust the padding as needed */
}

.search-bar form {
    flex-grow: 1; /* Make the form take up the available space */
    display: flex;
    gap: 10px; /* Adjust the gap between input and button as needed */
}

.search-input {
    flex-grow: 1; /* Make the input take up the available space */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}


</style>