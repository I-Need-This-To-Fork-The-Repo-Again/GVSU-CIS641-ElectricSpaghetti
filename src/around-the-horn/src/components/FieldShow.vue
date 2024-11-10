<template>
    <div class="d-flex justify-center">
        <v-img v-if="getFieldStatus === 0" rel="preload" max-width="650" src="../assets/fieldPositions/000.png"></v-img>
        <v-img v-else-if="getFieldStatus === 1" rel="preload" max-width="650" src="../assets/fieldPositions/001.png"></v-img>
        <v-img v-else-if="getFieldStatus === 10" rel="preload" max-width="650" src="../assets/fieldPositions/010.png"></v-img>
        <v-img v-else-if="getFieldStatus === 100" rel="preload" max-width="650" src="../assets/fieldPositions/100.png"></v-img>
        <v-img v-else-if="getFieldStatus === 11" rel="preload" max-width="650" src="../assets/fieldPositions/011.png"></v-img>
        <v-img v-else-if="getFieldStatus === 101" rel="preload" max-width="650" src="../assets/fieldPositions/101.png"></v-img>
        <v-img v-else-if="getFieldStatus === 110" rel="preload" max-width="650" src="../assets/fieldPositions/110.png"></v-img>
        <v-img v-else-if="getFieldStatus === 111" rel="preload" max-width="650" src="../assets/fieldPositions/111.png"></v-img>

    </div>
</template>

<script>
export default {
    name: 'FieldShow',

    props: ['gameObject'],

    data() {

    },

    mounted() {

    },

    methods: {
        preloadImages() {
        const images = [
            "000.png", "001.png", "010.png", "100.png", "011.png", 
            "101.png", "110.png", "111.png"
        ];
        images.forEach(image => {
            const img = new Image();
            img.src = `../assets/fieldPositions/${image}`;
        });
    }
    },

    computed: {
        getFieldStatus: function() {
            let status = 0
            if(this.gameObject.baseStatus.first) {
                status += 1
            }

            if(this.gameObject.baseStatus.second) {
                status += 10
            }

            if(this.gameObject.baseStatus.third) {
                status += 100
            }

            return status
        }
    },
}
</script>