<template>
    <div @mouseover="showLargeImage" @mouseleave="hideLargeImage">
        <img loading="lazy" :src="src"  />
        <div v-if="showLarge" class="large-image-container" :style="{ top: position.y + 'px', left: position.x + 'px' }">
            <img :src="src" class="large-image">
        </div>
    </div>
    
</template>
           
<script>
export default {

    data() {
        return {
            showLarge: false,
            position: {
                x: 0,
                y: 0
            }
        };
    },
    props: {
        src: String
    },
    methods: {
        showLargeImage(event) {
            // This needs work to make the overlay not janky
            // this.showLarge = true;
            this.position = {
                x: event.clientX,
                y: event.clientY
            }
        },
        hideLargeImage() {
            this.showLarge = false;
        },
    }
};
</script>

<style>
.large-image-container {

    position: fixed;
    z-index: 10;
    transform: translate(-50%, -50%);
    width: 250px;
}
</style>