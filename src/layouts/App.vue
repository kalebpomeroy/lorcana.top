<template>
    <div>
        <TopNav />
        <!-- TODO: This will eventually need to do routing stuff -->
        <SearchPage />  
    </div>
  
</template>

<script>
    import TopNav from './TopNav.vue';
    import SearchPage from '../pages/SearchPage.vue';

    export default {
        name: 'App', 
        mounted() {
            document.title = 'Lorcana Search';
        },
        components: {
            SearchPage, TopNav
        }
    }
</script>
