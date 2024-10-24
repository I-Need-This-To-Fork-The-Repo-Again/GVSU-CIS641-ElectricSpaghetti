<template>
    <h1>Around the Horn!</h1>
    <v-btn @click="goToGame()">New Game</v-btn>
</template>
  
  <script>
    export default {
        name: 'TitleScreen',
        methods: {
            goToGame: function() {
                this.$router.push("/game")
            }
        }
    }
  </script>
  