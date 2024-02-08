<template>
    <div v-if="quantity > 0" class="decklist-item" @mouseover="showLargeImage($event, $el)" @mouseleave="hideLargeImage">
        
        <input type="text" class="quantity" @keyup.enter="setCardQuanity" @blur="setCardQuanity" v-model="quantity" />

        <img class='ink-color' loading="lazy" :src="`/icons/${color}.png`" />
        <span :class="{bold: showLarge, ['color-' + color] : true}">{{ card.name  }}</span>
        <div class="large-image-container" v-if="showLarge"  :style="{ top: position.y + 'px', left: position.x + 'px' }">
            <img loading="lazy" :src="`http://drrkqgqijb8dh.cloudfront.net/${card.id}.png`"  />
        </div>

    </div>
    
</template>
           
<script>
import { getDeckList } from '../composables/list.js';
export default {
    setup() {
        const { decklist, setCardQuanity } = getDeckList();
        return { decklist, setCardQuanity };
    },
    data() {
        return {
            showLarge: false,
            position: {
                x: 0,
                y: 0
            }
        };
    },
    computed: {
        color() {
            return this.card.color.toLowerCase();
        },
        quantity: {
            get() {
                if (!this.decklist) {
                    return 0;
                }
                return this.decklist[this.card.name] ?? 0;
            },
            set(value) {
                let intValue = parseInt(value, 10); // Convert to integer
                if (isNaN(intValue)) {
                    intValue = 1; // Default to 0 or any other default value if not an integer
                }
                this.setCardQuanity(this.card.name, intValue);
            }
        }
    },
    props: {
        card: Object
    },
    methods: {
        showLargeImage(event, element) {
            this.showLarge = true;  
            this.position = {
                x: element.getBoundingClientRect().left - 255 ,
                y: element.getBoundingClientRect().top
            }
        },
        hideLargeImage() {
            this.showLarge = false;
        }
    }
};
</script>

<style>
.ink-color {
    height: 30px;
    padding: 0px 5px;
}
.quantity {
    width: 30px;
    text-align: center;
    height: 25px;
    font-size: x-large;
}
.decklist-item {
    display: flex;
    font-size: x-large;
    align-items: center; 
    border-bottom: 1px solid #0d222f31;
}
.decklist-item .bold {
    font-weight: bold;
}
.large-image-container {
    position: fixed;
    z-index: 10;
    width: 250px;
}
.large-image-container img {
    width: 250px;
}
</style>