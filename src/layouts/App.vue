<template>
    <div>
        <TopNav />
        <router-view/> 
    </div>
  
</template>

<script>
    import TopNav from './TopNav.vue';

    export default {
        name: 'App', 
        mounted() {
            document.title = 'Lorcana Search';
        },
        components: {
            TopNav
        }
    }
</script>
