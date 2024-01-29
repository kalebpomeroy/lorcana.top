<template>
    <div @click="showLargeImage" @mouseleave="hideLargeImage">
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
            const rect = event.target.getBoundingClientRect();
            this.showLarge = true;
            let y = rect.top;
            let x = rect.left;

            // Adjust if the image goes beyond the right edge of the viewport
            if (x + 300 > window.innerWidth) {
                x -= (x + 300) - window.innerWidth;
            }

            // Adjust if the image goes beyond the bottom edge of the viewport
            if (y + 400 > window.innerHeight) {
                y -= (y + 400) - window.innerHeight;
            }
            this.position = {
                x: x,
                y: y
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
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
    z-index: 1000; /* Ensure it's above other content */
}

.large-image {
    max-width: 90%;
    max-height: 90%;
}
</style>