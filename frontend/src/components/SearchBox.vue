<template>
  <div>
    <form @submit.prevent="searchCards">
      <input @input="handleInput"  type="text" v-model="q" placeholder="Search for cards">
      <button type="submit">Search</button>
    </form>
    <HelperWindow />
    <br /><br />
    <div v-if="loading">Loading...</div>
    <div v-if="!loading">
      <span v-for="card in cards" :key="card.id"><img :src="`http://localhost:8080/data/images/${card.id}.png`" width="180px"/></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HelperWindow from './HelperWindow.vue'

export default {
  components: {
    HelperWindow
  },
  data() {
    return {
      q: '',
      cards: [],
      loading: false,
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        this.q = query;
        this.searchCards();
     }
  },
  methods: {
    handleInput() {
      if (this.q.endsWith(' ')) {
        this.searchCards();
      }
    },
    async searchCards() {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:8080/search`, { params: { q: this.q } });
        this.cards = response.data.cards;
        
        const url = new URL(window.location.href);
        url.searchParams.set('q', this.q);
        window.history.pushState({}, '', url);
      } catch (error) {
        console.error(error);
        // Handle the error appropriately
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>